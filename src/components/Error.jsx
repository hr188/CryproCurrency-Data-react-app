import { Alert, AlertIcon ,Text} from '@chakra-ui/react'
import React from 'react'

const Error = () => {
  return (
    <Alert status='error' position={'fixed'} bottom={'4'} left={'50%'} transform={'translateX(-50%)'} w={'container.lg'}>
        <AlertIcon alignContent={'center'}/>
        <Text alignSelf={'center'} > something went wrong</Text>
    </Alert>
  )
}

export default Error