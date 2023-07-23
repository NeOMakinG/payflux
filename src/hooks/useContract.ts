import React from "react";

const worker = new Worker('dist/bundle.js')

export function useCompileContract(contract: string) {
  const [compiledContract, setCompiledContract] = React.useState(null)
  const [compiling, setCompiling] = React.useState(false)


  worker.addEventListener('message', function (e) {
      console.log("compiled")
      const output = e.data.output
			setCompiledContract(output)
      setCompiling(false)
  }, false)

  const compile = () => {
    console.log("compiling")
    setCompiling(true)
    worker.postMessage({
      contractCode: contract,
    })
  }

  return { compiledContract, compiling, compile }
}

export enum PaymasterContractType {
  DepositPaymaster = "DepositPaymaster",
  TokenPaymaster = "TokenPaymaster",
  VerifyingPaymaster = "VerifyingPaymaster",
}

export function useContract(type: PaymasterContractType) {
  const [contract, setContract] = React.useState("")

  fetch(`templates/${PaymasterContractType[type]}.sol`)
        .then((r) => r.text())
        .then(text  => {
          setContract(text)
        });

  return contract
}