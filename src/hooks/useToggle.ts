import { useCallback, useState } from 'react'

// Parameter is the boolean, with default "false" value
const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  // Initialize the state
  const [state, setState] = useState(initialState)

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => {
    setState((currentState) => !currentState)
  }, [])

  return [state, toggle]
}

export default useToggle
