// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

interface IReferralRegistry {
    function isReferred(address user) external view returns (bool);
}

import "../core/BasePaymaster.sol";

/**
 * Paymaster contract that only pays gas for referred users.
 */
contract ReferredUserPaymaster is BasePaymaster {
    // The contract tracking referred users
    IReferralRegistry public referralRegistry;

    constructor(
        IEntryPoint _entryPoint,
        IReferralRegistry _referralRegistry
    ) BasePaymaster(_entryPoint) {
        referralRegistry = _referralRegistry;
    }

    function _validatePaymasterUserOp(
        UserOperation calldata userOp,
        bytes32 /*userOpHash*/,
        uint256 /*requiredPreFund*/
    )
        internal
        view
        override
        returns (bytes memory context, uint256 validationData)
    {
        // Check if the user is a referred user
        bool isReferred = referralRegistry.isReferred(userOp.sender);
        require(isReferred, "Sender is not a referred user");

        // No special context or validation data required for this paymaster
        return ("", 0);
    }

    function _postOp(
        PostOpMode /*mode*/,
        bytes calldata /*context*/,
        uint256 /*actualGasCost*/
    ) internal override {}
}
