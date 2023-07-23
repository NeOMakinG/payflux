// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "../core/BasePaymaster.sol";

contract WhitelistPaymaster is BasePaymaster {
    mapping(address => bool) public whitelist;

    constructor(IEntryPoint _entryPoint) BasePaymaster(_entryPoint) {}

    function addToWhitelist(address user) external {
        // Only the paymaster itself can add users to the whitelist.
        require(
            msg.sender == address(this),
            "Only paymaster can add to whitelist"
        );

        whitelist[user] = true;
    }

    function removeFromWhitelist(address user) external {
        // Only the paymaster itself can remove users from the whitelist.
        require(
            msg.sender == address(this),
            "Only paymaster can remove from whitelist"
        );

        whitelist[user] = false;
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
        require(whitelist[userOp.sender], "Sender is not whitelisted");

        // No special context or validation data required for this paymaster
        return ("", 0);
    }

    function _postOp(
        PostOpMode /*mode*/,
        bytes calldata /*context*/,
        uint256 /*actualGasCost*/
    ) internal override {}
}
