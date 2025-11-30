import { useContext } from "react"
import { StoreContext } from "./StoreContext"

export const useStores = () => {
  return useContext(StoreContext)
}
