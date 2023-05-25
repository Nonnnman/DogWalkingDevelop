import { ListingsContext } from '../context/ListingsContext'
import { useContext } from 'react'

export const useListingsContext = () => {
  const context = useContext(ListingsContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}