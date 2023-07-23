export const getBaseContractStructure = (contractName: string) => ({
	import: [
		{
			id: "import-1",
			value: `// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

/* solhint-disable reason-string */
/* solhint-disable no-inline-assembly */

import "../core/BasePaymaster.sol";
`,
		},
	],
	contractName: [
		{
			id: "contract-name-1",
			value: `contract ${contractName} is BasePaymaster {
    using UserOperationLib for UserOperation;`,
		},
	],
	receive: [
		{
			id: "receive-1",
			value: `  receive() external payable {
    // accept all incoming payments
  }\n\n`,
		},
	],
	vars: [],
	constructorParamsStart: [
		{
			id: "constructor-params-start-1",
			value: `  constructor(
      IEntryPoint _entryPoint,`,
		},
	],
	constructorParamsEnd: [
		{
			id: "constructor-params-end-1",
			value: `  ) BasePaymaster(_entryPoint) {`,
		},
	],
	constructorBody: [],
	constructorEnd: [{ id: "constructor-end-1", value: `  }\n` }],
	validatePaymasterUsOpParamsStart: [
		{
			id: "validate-paymaster-usop-params-start-1",
			value: `\n  function _validatePaymasterUserOp(
        UserOperation calldata userOp,
        bytes32 /*userOpHash*/,
        uint256 requiredPreFund`,
		},
	],
	validatePaymasterUsOpParamsEnd: [
		{
			id: "validate-paymaster-usop-params-end-1",
			value: `  ) internal override returns (bytes memory context, uint256 validationData) {`,
		},
	],
	validatePaymasterUsOpBody: [
		{
			id: "validate-paymaster-usop-body-1",
			value: `      // Check that the user operation is a valid operation`,
		},
	],
	validatePaymasterUsOpEnd: [
		{
			id: "validate-paymaster-usop-end-1",
			value: `      return ("", 1);
  }`,
		},
	],
	functions: [],
	contractEnd: [
		{
			id: "contract-end-1",
			value: `}`,
		},
	],
});
