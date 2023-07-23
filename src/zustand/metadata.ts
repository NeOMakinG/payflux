import { create } from "zustand";

type UseMetadataType = {
  contractName: string;
  setContractName: (contractName: string) => void;
}

export const useMetadata = create<UseMetadataType>((set) => ({
  contractName: "",
  setContractName: (contractName: string) => set({ contractName }),
}));