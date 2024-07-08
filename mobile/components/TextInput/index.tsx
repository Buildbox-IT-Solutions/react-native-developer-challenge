import { TextInput } from 'react-native';
import { useTheme } from 'styled-components';

type CustomTextInputProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
};

export const CustomTextInput = ({
  placeholder,
  onChangeText,
}: CustomTextInputProps) => {
  const theme = useTheme();
  return (
    <TextInput
      placeholderTextColor={theme.text}
      style={{ flex: 1, color: theme.text, backgroundColor: 'transparent' }}
      placeholder={placeholder}
      onChangeText={onChangeText}
    />
  );
};
