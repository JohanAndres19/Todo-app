import React, { createContext, useContext } from 'react'
import type { PropsWithChildren } from 'react'
import { RootStore } from '../../shared/store/rootStore.ts'


const store = new RootStore()
const StoreContext = createContext<RootStore>(store)


export const StoreProvider = ({ children }: PropsWithChildren) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
)


export const useStores = () => useContext(StoreContext)

