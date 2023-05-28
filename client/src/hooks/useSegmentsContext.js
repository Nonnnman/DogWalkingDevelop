import { SegmentsContext } from '../context/SegmentsContext'
import { useContext } from 'react'

export const useSegmentsContext = () => {
  const context = useContext(SegmentsContext)

  if (!context) {
    throw Error('useSegmentsContext must be used inside an SegmentsContextProvider')
  }

  return context
}