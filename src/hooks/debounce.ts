import { useState, useEffect } from 'react'

// eslint-disable-next-line import/no-anonymous-default-export
export default function <T>(value: T, delayInMilliseconds: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const debounceHandler = setTimeout(() => setDebouncedValue(value), delayInMilliseconds)

    return () => clearTimeout(debounceHandler)
  }, [value, delayInMilliseconds])

  return debouncedValue
}
