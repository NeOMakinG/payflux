import { create } from "zustand";
import {
  BlockId,
  BlockIdToProps,
  BlocksStruct,
  SelectedBlockModal,
} from "../shared/structure";
import { BlockProps } from "../components/Block/types";
import { BlockType } from "../shared/functions";

type UsePayfluxStoreType = {
  blockIdToProps: BlockIdToProps;
  setBlockIdToProps: (blockId: BlockId, props: BlockProps) => void;
  blockStructure: BlocksStruct;
  addPlus: (blockId: BlockId, childrenId: BlockId) => void;
  removeBlock: (blockId: BlockId) => void;
  selectedBlockModal: SelectedBlockModal;
  setBlockModal: (blockModal: SelectedBlockModal) => void;
};

export const usePayfluxStore = create<UsePayfluxStoreType>()((set) => ({
  blockIdToProps: { start: { type: BlockType.START  }, "0": { type: BlockType.PLUS }},
  setBlockIdToProps: (blockId: BlockId, props: BlockProps) =>
    set((state) => ({
      blockIdToProps: { ...state.blockIdToProps, [blockId]: props },
    })),
  blockStructure: { id: "start", children: [{ id: "0" }] },
  addPlus: (blockId: BlockId, childrenId: BlockId) => {
    // recusively search for the blockId and add the childrenId to it
    const searchAndAdd = (block: BlocksStruct): BlocksStruct => {
      if (block.id === blockId) {
        if (block.children) {
          block.children = [...block.children, { id: childrenId }];
        } else {
          block.children = [{ id: childrenId }];
        }
        return block;
      }
      if (block.children) {
        block.children = block.children.map(searchAndAdd);
      }
      return block;
    };
    set((state) => ({
      blockStructure: JSON.parse(
        JSON.stringify(searchAndAdd(state.blockStructure))
      ),
      blockIdToProps: { ...state.blockIdToProps, [childrenId]: { type: BlockType.PLUS } }
    }));
  },
  removeBlock: (blockId: BlockId) => {
		// recusively search for the blockId and remove it
		const searchAndRemove = (block: BlocksStruct) => {
			if (block.id === blockId) {
				return { id: block.id, children: undefined };
			}
			if (block.children) {
				block.children = block.children.map((child) => searchAndRemove(child));
			}
			return block;
		};
		set((state) => ({
			blockStructure: JSON.parse(
				JSON.stringify(searchAndRemove(state.blockStructure))
			),
      blockIdToProps: { ...state.blockIdToProps, [blockId]: { type: BlockType.PLUS } }
		}));
	},
  selectedBlockModal: null,
  setBlockModal: (selectedBlockModal: SelectedBlockModal) => {
    set(() => ({
      selectedBlockModal,
    }));
  },
}));
