import { BlockType, Functions } from "../../shared/functions";
import { BlocksStruct } from "../../shared/structure";
import { spacer } from "../../utils/spacer";
import { usePayfluxStore } from "../../zustand";
import { CodeEditor, Snippet } from "../CodeEditor";
import { ContractFnToCode, FnDefinition } from "./types";

const baseContractStructure = {
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
			value: `contract WhitelistCustomPaymaster is BasePaymaster {
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
	constructorEnd: [{ id: "constructor-end-1", value: () => `  }\n\n` }],
	validatePaymasterUsOpParamsStart: [
		{
			id: "validate-paymaster-usop-params-start-1",
			value: `  function _validatePaymasterUserOp(
        UserOperation calldata userOp,
        bytes32 /*userOpHash*/,
        uint256 requiredPreFund`,
		},
	],
	validatePaymasterUsOpParamsEnd: [
		{
			id: "validate-paymaster-usop-params-end-1",
			value: `   ) internal override returns (bytes memory context, uint256 validationData) {`,
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
};

const contractFnToCode: ContractFnToCode = {
	[Functions.MULTIPLY]: () => ({
		def: `  function multiply(uint256 a, uint256 b) public pure returns (uint256) {
    return a * b;
  }`,
		use: `multiply(a, b)`,
	}),
	[Functions.DIVIDE]: () => ({
		def: `  function divide(uint256 a, uint256 b) public pure returns (uint256) {
    return a / b;
  }`,
		use: `divide(a, b)`,
	}),
	[Functions.ADD]: () => ({
		def: `  function add(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
  }`,
		use: `add(a, b)`,
	}),
	[Functions.SUBTRACT]: () => ({
		def: `  function subtract(uint256 a, uint256 b) public pure returns (uint256) {
    return a - b;
  }`,
		use: `subtract(a, b)`,
	}),
	[Functions.PAYMENT]: () => ({
		def: `  function pay(address payable to, uint256 amount) public payable {
    to.transfer(amount);
  }`,
		use: `pay(to, amount)`,
	}),
};

export function CodeManager() {
	const { blockIdToProps, blockStructure } = usePayfluxStore((state) => ({
		blockStructure: state.blockStructure,
		blockIdToProps: state.blockIdToProps,
	}));

	console.log({ blockIdToProps });

	const populatedContractStructure = (
		contractStructure: Record<string, Snippet[]>,
		struct?: BlocksStruct
	): Record<string, Snippet[]> => {
		if (!struct) return contractStructure;

		const props = blockIdToProps[struct.id];
		const mode = props?.mode;
		const type = props?.type;
		console.log({ props, id: struct.id });

		if (type === BlockType.FUNCTION) {
			const fn = contractFnToCode[(mode as Functions) || ""] as FnDefinition;
			const resultFn = fn && fn();
      
			// add function use
			contractStructure.validatePaymasterUsOpBody.push({
				id:
					"validate-paymaster-usop-body-" +
					contractStructure.validatePaymasterUsOpBody.length +
					1,
				value: (resultFn && spacer(6) + resultFn.use) || "",
			});

			// add function definition
			if (
				!contractStructure.functions.find((fn) => fn.value === resultFn?.def)
			) {
				contractStructure.functions.push({
					id: "function-" + contractStructure.functions.length + 1,
					value: resultFn?.def ? "\n" + resultFn?.def : "",
				});
			}
		}

		if (struct.children && struct.children.length > 0) {
			struct.children.forEach((child) => {
				console.log("Add child", child);
				populatedContractStructure(contractStructure, child);
			});
		}
		return contractStructure;
	};

	return (
		<CodeEditor
			highlightedIndex={1}
			snippets={Object.values(
				populatedContractStructure(
					JSON.parse(JSON.stringify(baseContractStructure)),
					blockStructure
				)
			).flat()}
		/>
	);
}
