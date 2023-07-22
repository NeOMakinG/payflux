// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "../core/BasePaymaster.sol";
import "@openzeppelin/contracts/utils/Address.sol";

/**
 * A sample paymaster that pays for the UserOp only if it is executed in the morning or day
 * This paymaster does not care about the identity of the user or the details of the transaction, it only
 * checks the timestamp of the current block.
 */
contract DaytimePaymaster is BasePaymaster {
    using Address for address payable;
    uint256 private constant DAY_START = 6;   // 6am
    uint256 private constant DAY_END = 18;    // 6pm

    constructor(IEntryPoint _entryPoint) BasePaymaster(_entryPoint) {}

    function _validatePaymasterUserOp(UserOperation calldata userOp, bytes32 /*userOpHash*/, uint256 /*maxcost*/)
        internal view override returns (bytes memory /*context*/, uint256 /*validationData*/)
    {
        // Note: This paymaster is very loose in its checks. For a more complex paymaster, you would
        // probably want to check the details of the UserOp and possibly use the userOpHash.

        uint256 hour = (block.timestamp / 60 / 60) % 24;  // Get the current hour in UTC
        require(hour >= DAY_START && hour < DAY_END, "DaytimePaymaster: transactions are only covered during daytime");

        // No need to return any context or validationData since we don't do anything in _postOp
        return ("",0);
    }

    function _postOp(PostOpMode /*mode*/, bytes calldata /*context*/, uint256 /*actualGasCost*/) internal override {
        // This paymaster does not need to do anything in postOp since it does not have any state to update
    }
}