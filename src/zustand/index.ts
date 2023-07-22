import { create } from 'zustand'
import { BlockId, BlockIdToProps, BlocksStruct } from '../shared/structure'
import { BlockProps } from '../components/Block/types'
import { persist } from 'zustand/middleware'
import { BlockType } from '../shared/functions'

type UsePayfluxStoreType = {
  blockIdToProps: BlockIdToProps;
  setBlockIdToProps: (blockId: BlockId, props: BlockProps) => void;
  blockStructure: BlocksStruct;
  addChild: (blockId: BlockId, childrenId: BlockId) => void;
  removeBlock: (blockId: BlockId) => void;
}

export const usePayfluxStore = create<UsePayfluxStoreType>()(
  persist(
    (set) => ({
      blockIdToProps: { "start": { type: BlockType.START} },
      setBlockIdToProps: (blockId: BlockId, props: BlockProps) => set((state) => ({ blockIdToProps: { ...state.blockIdToProps, [blockId]: props } })),
      blockStructure: { id: "start" },
      addChild: (blockId: BlockId, childrenId: BlockId) => {
        console.log("add")
        // recusively search for the blockId and add the childrenId to it
        const searchAndAdd = (block: BlocksStruct): BlocksStruct => {
          if (block.id === blockId) {
            if (block.children) {
              block.children = [...block.children, { id: childrenId }]
            } else {
              block.children = [{ id: childrenId }]
            }
            return block
          }
          if (block.children) {
            block.children = block.children.map(searchAndAdd)
          }
          return block
        }
        set((state) => ({ blockStructure: searchAndAdd(state.blockStructure) }))
      },
      removeBlock: (blockId: BlockId) => {
        // recusively search for the blockId and remove it
        const searchAndRemove = (block: BlocksStruct) => {
          if (block.id === blockId) {
            return undefined
          }
          if (block.children) {
            block.children = block.children.map(searchAndRemove).filter((block) => block !== undefined) as BlocksStruct[]
          }
          return block
        }
        set((state) => ({ blockStructure: searchAndRemove(state.blockStructure) }))
      }
    }),
    {
      name: "payflux"
    }
  )
)