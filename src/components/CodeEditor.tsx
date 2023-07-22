import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";

const codeSample = `
//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import {console} from 'hardhat/console.sol';
import {IGreeter} from '../interfaces/IGreeter.sol';

/// @title A contract for boilerplating
/// @author Hardhat (and DeFi Wonderland)
/// @notice You can use this contract for only the most basic tests
/// @dev This is just a try out
/// @custom:experimental This is an experimental contract.

contract Greeter is IGreeter {`;

const secondCodeSample = `  string public override greeting;

  constructor(string memory _greeting) {
    console.log('Deploying a Greeter with greeting:', _greeting);
    greeting = _greeting;
  }
  function greet() external view override returns (string memory _greet) {
    return greeting;
  }

  /// @notice Sets greeting that will be used during greet
  /// @dev Some explanation only defined for devs
  /// @param _greeting The greeting to be used
  /// @return _changedGreet Was greeting changed or nah
  function setGreeting(string memory _greeting) external override returns (bool _changedGreet) {
    if (bytes(_greeting).length == 0) revert EmptyGreeting();
    console.log('Changing greeting from', greeting, 'to', _greeting);
    greeting = _greeting;
    _changedGreet = true;
    emit GreetingSet(_greeting);
  }
}
`;

export const CodeEditor = () => {
  return (
    <>
      <SyntaxHighlighter
        customStyle={{ margin: 0, paddingTop: 0, paddingBottom: 0 }}
        style={vscDarkPlus}
        language="solidity"
      >
        {String(codeSample)}
      </SyntaxHighlighter>
      <SyntaxHighlighter
        customStyle={{
          margin: 0,
          paddingTop: 0,
          paddingBottom: 0,
          boxShadow: "#ffde007d 0px 1px 13px 4px",
          zoom: "1.1",
        }}
        style={vscDarkPlus}
        language="solidity"
      >
        {String(secondCodeSample)}
      </SyntaxHighlighter>
      <SyntaxHighlighter
        customStyle={{ margin: 0, paddingTop: 0, paddingBottom: 0 }}
        style={vscDarkPlus}
        language="solidity"
      >
        {String(secondCodeSample)}
      </SyntaxHighlighter>
    </>
  );
};
