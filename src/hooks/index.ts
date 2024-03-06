import { useDispatch, useSelector } from 'react-redux'
import useToggle from './useToggle'

// Type
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
  useAppDispatch,
  useAppSelector,
  useToggle,
}
