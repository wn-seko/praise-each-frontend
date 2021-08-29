import { useState, useEffect } from 'react'

interface Option {
  key: string
  value: string
  text: string
}

const convertOption = (option: Option | string, index: number) =>
  typeof option === 'string' ? { key: index, value: option, text: option } : option

export const useDropdown = (options: (string | Option)[], onSelected?: (value: string) => void) => {
  const [hover, setHover] = useState(false)
  const [selected, setSelected] = useState(-1)
  const sanitizedOptions = options.map(convertOption)

  const handleMouseEnter = () => {
    setHover(true)
  }

  const handleMouseLeave = () => {
    setHover(false)
  }

  const handleClick = (value: string) => () => {
    if (onSelected) {
      onSelected(value)
    }
  }

  useEffect(() => {
    const handleKeydown: any = (event: KeyboardEvent) => {
      event.stopPropagation()

      if (event.key === 'ArrowDown') {
        setSelected((prev) => Math.min(prev + 1, sanitizedOptions.length - 1))
      }
      if (event.key === 'ArrowUp') {
        setSelected((prev) => Math.max(prev - 1, 0))
      }
      if (event.key === 'Enter' && onSelected) {
        onSelected(sanitizedOptions[selected].value)
      }
    }

    document.onkeydown = handleKeydown

    return () => {
      document.onkeydown = null
    }
  }, [selected])

  return { selected, options: sanitizedOptions, hover, handleMouseEnter, handleMouseLeave, handleClick }
}
