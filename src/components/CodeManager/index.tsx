import { useMemo } from "react";
import { BlockType, Conditions, Functions } from "../../shared/functions";
import { BlocksStruct } from "../../shared/structure";
import { spacer } from "../../utils/spacer";
import { usePayfluxStore } from "../../zustand";
import { CodeEditor, Snippet } from "../CodeEditor";
import {
  ConditionDefinition,
  ContractConditionsToCode,
  ContractFnToCode,
  FnDefinition,
} from "./types";
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

const contractConditionsToCode: ContractConditionsToCode = {
  [Conditions.WHITELIST]: () => ({
    use: ` require(
            whilelist[sender],
            "WhitelistPaymaster: sender not whitelisted"
        );`,
    var: `mapping(address => bool) public whitelist`,
    construct: `		for (uint256 i = 0; i < whitelist.length; i++) {
            whilelist[whitelist[i]] = true;
        }`,
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

  const { contractName, setDownloadSource } = useMetadata((state) => ({
    contractName: state.contractName,
    setDownloadSource: state.setDownloadSource,
  }));

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

    if (type === BlockType.CONDITION) {
      const cond = contractConditionsToCode[
        (mode as Conditions) || ""
      ] as ConditionDefinition;
      const resultCond = cond && cond();

      // add condition use
      contractStructure.validatePaymasterUsOpBody.push({
        id:
          "validate-paymaster-usop-body-" +
          contractStructure.validatePaymasterUsOpBody.length +
          1,
        mode,
        value: (resultCond && spacer(6) + resultCond.use) || "",
      });

      // add condition var
      if (resultCond.var) {
        contractStructure.vars.push({
          id:
            "validate-paymaster-usop-vars-" + contractStructure.vars.length + 1,
          mode,
          value: resultCond.var,
        });
      }

      // add construct statements
      if (resultCond.construct) {
        contractStructure.constructorBody.push({
          id:
            "validate-paymaster-usop-construct-" +
            contractStructure.constructorBody.length +
            1,
          mode,
          value: resultCond.construct,
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
    () => {
      const contractSource = getPopulatedContractStructure(
        JSON.parse(
          JSON.stringify(getBaseContractStructure(contractName || "XXX_XXX"))
        ),
        blockStructure
      );

      setDownloadSource(
        Object.values(contractSource)
          .flat()
          .map((e) => e.value)
          .join("\n")
      );

      return contractSource;
    },
    // eslint-disable-next-line
    [blockStructure, contractName]
  );

  return (
    <CodeEditor
      highlightedMode={hoveringMode}
      snippets={Object.values(populatedContractStructure).flat()}
    />
  );
}
