import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { updateStartPrice} from './actions'


export function useConditionOfOrders():[any, (ss:any) => void]  {
  const dispatch = useDispatch<AppDispatch>()
  const ConditionOfOrders1 = useSelector<AppState, AppState['conditionOfOrders']>(state => {
    return state.conditionOfOrders
  })

  const setconditionOfOrders = useCallback(
    (a:any) => {
     
     dispatch(updateStartPrice(a))
    },
    [dispatch]
  )
  return [ConditionOfOrders1.conditionOfOrders,setconditionOfOrders]
}
