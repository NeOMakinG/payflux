// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "../core/BasePaymaster.sol";

contract RateLimitPaymaster is BasePaymaster {
    using UserOperationLib for UserOperation;

    uint256 public constant MAX_TRANSACTIONS_PER_DAY = 100;
    uint256 public constant SECONDS_IN_A_DAY = 24 * 60 * 60;

    struct RateLimit {
        uint256 count;
        uint256 lastResetTime;
    }

    mapping(address => RateLimit) public rateLimits;

    constructor(IEntryPoint _entryPoint) BasePaymaster(_entryPoint) {}

    function isUnderRateLimit(address user) public view returns (bool) {
        RateLimit storage rateLimit = rateLimits[user];
        if (block.timestamp > rateLimit.lastResetTime + SECONDS_IN_A_DAY) {
            return true;
        }
        return rateLimit.count < MAX_TRANSACTIONS_PER_DAY;
    }

    function _validatePaymasterUserOp(
        UserOperation calldata userOp,
        bytes32 /*userOpHash*/,
        uint256 /*maxCost*/
    )
        internal
        view
        override
        returns (bytes memory context, uint256 validationData)
    {
        // Ensure the user is under the rate limit
        require(
            isUnderRateLimit(userOp.getSender()),
            "RateLimitPaymaster: rate limit exceeded"
        );

        return ("", 0);
    }

    function _postOp(
        PostOpMode mode,
        bytes calldata context,
        uint256 /*actualGasCost*/
    ) internal override {
        if (mode != PostOpMode.postOpReverted) {
            address user = abi.decode(context, (address));
            RateLimit storage rateLimit = rateLimits[user];

            // Reset the counter if a day has passed since last reset
            if (block.timestamp > rateLimit.lastResetTime + SECONDS_IN_A_DAY) {
                rateLimit.count = 0;
                rateLimit.lastResetTime = block.timestamp;
            }

            // Increment the counter
            rateLimit.count += 1;
        }
    }
}
