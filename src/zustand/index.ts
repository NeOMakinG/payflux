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
  addChild: (blockId: BlockId, childrenId: BlockId) => void;
  removeBlock: (blockId: BlockId) => void;
  selectedBlockModal: SelectedBlockModal;
  setBlockModal: (blockModal: SelectedBlockModal) => void;
};

export const usePayfluxStore = create<UsePayfluxStoreType>()((set) => ({
  blockIdToProps: { start: { type: BlockType.START,  } },
  setBlockIdToProps: (blockId: BlockId, props: BlockProps) =>
    set((state) => ({
      blockIdToProps: { ...state.blockIdToProps, [blockId]: props },
    })),
  blockStructure: { id: "start" },
  addChild: (blockId: BlockId, childrenId: BlockId) => {
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
    }));
  },
  removeBlock: (blockId: BlockId) => {
		// recusively search for the blockId and remove it
		const searchAndRemove = (block: BlocksStruct, parent?: BlocksStruct) => {
			if (block.id === blockId) {
				if (parent?.children) {
					if (parent?.children?.length === 1) {
						delete parent.children;
					} else {
						parent.children = parent.children.filter(
							(child) => child.id !== blockId
						);
					}
				}
			}
			if (block.children) {
				block.children.forEach((child) => searchAndRemove(child, block));
			}
			return block;
		};
		set((state) => ({
			blockStructure: JSON.parse(
				JSON.stringify(searchAndRemove(state.blockStructure))
			),
		}));
	},
  selectedBlockModal: null,
  setBlockModal: (selectedBlockModal: SelectedBlockModal) => {
    set(() => ({
      selectedBlockModal,
    }));
  },
}));
