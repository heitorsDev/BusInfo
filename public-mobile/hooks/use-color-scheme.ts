import { useColorScheme as useSystemColorScheme } from 'react-native';
import { useAppTheme } from './app-theme';

export function useColorScheme() {
  try {
    const { colorScheme } = useAppTheme();
    return colorScheme;
  } catch {
    return useSystemColorScheme();
  }
}
