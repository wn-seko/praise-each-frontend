import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { InputOnChangeData } from 'semantic-ui-react'

const addressList = ['@aaa', '@abc', '@bbb', '@bb8']

const hashtagList = ['#test1', '#test2', '#test3']

const diffInput = (prev: string = '', current: string) => {
  const prevValues = prev.split(' ')
  const currentValues = current.split(' ')

  if (Math.abs(prevValues.length - currentValues.length) >= 2) {
    return ''
  }

  return currentValues.find((input, index) => input !== prevValues[index]) || ''
}

const replaceInput = (prev: string = '', current: string, word: string) => {
  const prevValues = prev.split(' ')
  const currentValues = current.split(' ')
  const index = currentValues.findIndex((input, index) => input !== prevValues[index])
  currentValues.splice(index, 1, word)
  return currentValues.join(' ')
}

const filterWords = (inputText: string, words: string[]) => words.filter((word) => new RegExp(inputText).test(word))

export const useDropdownInput = (onChange?: (text: string) => void) => {
  const [input, setInput] = useState({ prev: '', current: '' })
  const [dropdown, setDropdown] = useState<string[]>([])

  const handleChangeInput = (_: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setInput({ prev: input.current, current: data.value })
  }

  const ref = useRef<HTMLDivElement>(null)

  const handleSelectedWord = (value: string) => {
    if (ref.current) {
      const inputElement = ref.current.querySelector('input')
      if (inputElement) {
        const newText = replaceInput(input.prev, input.current, value)
        inputElement.value = newText + ' '
        inputElement.focus()
        setInput({ prev: newText, current: newText + ' ' })
      }
    }
    setDropdown([])
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    console.log(event.metaKey, event.key)
  }

  useEffect(() => {
    const inputWord = diffInput(input.prev, input.current)

    if (/^\@.+/.test(inputWord)) {
      setDropdown(filterWords(inputWord, addressList))
    } else if (/^\#.+/.test(inputWord)) {
      setDropdown(filterWords(inputWord, hashtagList))
    } else {
      setDropdown([])
    }

    if (onChange) {
      onChange(input.current)
    }
  }, [input])

  return { ref, dropdown, handleChangeInput, handleSelectedWord, handleKeyPress }
}
