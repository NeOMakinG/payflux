import { create } from "zustand";

type UseMetadataType = {
  contractName: string;
  setContractName: (contractName: string) => void;
  setDownloadSource: (source: string) => void;
  downloadSource: string;
};

export const useMetadata = create<UseMetadataType>((set) => ({
  contractName: "",
  setContractName: (contractName: string) => set({ contractName }),
  setDownloadSource: (downloadSource: string) => set({ downloadSource }),
  downloadSource: "",
}));
