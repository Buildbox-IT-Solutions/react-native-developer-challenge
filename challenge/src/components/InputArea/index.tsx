import { styled } from 'nativewind'
import React from 'react'
import { Text, TextInput, View } from 'react-native'

const ViewStyled = styled(View)
const TextStyled = styled(Text)
const InputStyled = styled(TextInput)

interface Props {
    setQueryString: (event: string) => void;
}

function InputArea( { setQueryString } : Props) {
  return (
    <ViewStyled className='bg-red-800 h-56 w-full flex p-10  rounded-b-3xl'>
        <TextStyled className='text-2xl text-white font-bold mb-6'>Trending</TextStyled>
        <InputStyled  onChangeText={(text) => setQueryString(text)} placeholder='Buscar' className='p-5 pl-10 border-2 rounded border-gray-300 bg-red-900 text-white'
        placeholderTextColor={"white"}></InputStyled>
    </ViewStyled>
  )
}

export default InputArea