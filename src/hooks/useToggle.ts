import { useCallback, useState } from 'react'

// Parameter is the boolean, with default "false" value
const useToggle = (initialState: boolean = false): [boolean, (vail?: any) => void] => {
  // Initialize the state
  const [state, setState] = useState(initialState)

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback((data?: any) => {
    data = data === true ? true : false
    if (data) {
      setState(!!data)
    } else {
      setState((currentState) => !currentState)
    }
  }, [state])

  return [state, toggle]
}

export default useToggle
