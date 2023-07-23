import { useMemo } from "react";
import { BlockType, Functions } from "../../shared/functions";
import { BlocksStruct } from "../../shared/structure";
import { spacer } from "../../utils/spacer";
import { usePayfluxStore } from "../../zustand";
import { CodeEditor, Snippet } from "../CodeEditor";
import { ContractFnToCode, FnDefinition } from "./types";
import { getBaseContractStructure } from "../../utils/baseContractStructure";
import { useMetadata } from "../../zustand/metadata";


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
  const { blockIdToProps, blockStructure, hoveringMode } = usePayfluxStore(
    (state) => ({
      blockStructure: state.blockStructure,
      blockIdToProps: state.blockIdToProps,
      hoveringMode: state.hoveringMode,
    })
  );

  const contractName = useMetadata((state) => state.contractName);

	const getPopulatedContractStructure = (
		contractStructure: Record<string, Snippet[]>,
		struct?: BlocksStruct
	): Record<string, Snippet[]> => {
		if (!struct) return contractStructure;

		const props = blockIdToProps[struct.id];
		const mode = props?.mode || null;
		const type = props?.type;

		if (type === BlockType.FUNCTION) {
			const fn = contractFnToCode[(mode as Functions) || ""] as FnDefinition;
			const resultFn = fn && fn();

			// add function use
			contractStructure.validatePaymasterUsOpBody.push({
				id:
					"validate-paymaster-usop-body-" +
					contractStructure.validatePaymasterUsOpBody.length +
					1,
          mode,
				value: (resultFn && spacer(6) + resultFn.use) || "",
			});

			// add function definition
			if (
				!contractStructure.functions.find(
					(fn) => fn.value === "\n" + resultFn?.def
				)
			) {
				contractStructure.functions.push({
					id: "function-" + contractStructure.functions.length + 1,
          mode,
					value: resultFn?.def ? "\n" + resultFn?.def : "",
				});
			}
		}

		if (struct.children && struct.children.length > 0) {
			struct.children.forEach((child) => {
				console.log("Add child", child);
				getPopulatedContractStructure(contractStructure, child);
			});
		}
		return contractStructure;
	};

	const populatedContractStructure = useMemo(
		() =>
			getPopulatedContractStructure(
				JSON.parse(JSON.stringify(getBaseContractStructure(contractName || "XXX_XXX"))),
				blockStructure
			),
		[blockStructure, contractName]
	);

	return (
		<CodeEditor
			highlightedMode={hoveringMode}
			snippets={Object.values(populatedContractStructure).flat()}
		/>
	);
}
