import React, { createContext, useContext } from 'react'
import { rootStore, type RootStore } from './rootStore'

const StoresContext = createContext<RootStore>(rootStore)

export const StoresProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <StoresContext.Provider value={rootStore}>{children}</StoresContext.Provider>
)

export const useStores = () => useContext(StoresContext)
