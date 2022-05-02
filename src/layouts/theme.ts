import { useColorModeValue } from '@chakra-ui/react';

type Variant = 'globalBackground' | 'background' | 'primary' | 'primaryText' | 'border' | 'positive' | 'negative';

export const getThemeColor = (variant: Variant) => {
  const themeColor: Record<Variant, string> = {
    globalBackground: useColorModeValue('white', 'gray.800'),
    background: useColorModeValue('white', 'gray.700'),
    primary: useColorModeValue('teal.200', 'teal.600'),
    primaryText: useColorModeValue('gray.200', 'gray.700'),
    border: useColorModeValue('gray.200', 'gray.600'),
    positive: useColorModeValue('green.400', 'green.600'),
    negative: useColorModeValue('red.300', 'red.600'),
  };
  return themeColor[variant];
};
