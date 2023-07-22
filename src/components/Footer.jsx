import {
    Box,
    Button,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    VStack,
  } from '@chakra-ui/react';
  import React from 'react';
  import { AiOutlineSend } from 'react-icons/ai';
  import { FaGithub, FaInstagram ,FaLinkedin} from 'react-icons/fa';
  const Footer = () => {
    return (
      <Box bgColor={'blackAlpha.900'} minH={'40'} p="16" color={'white'} >
        <Stack direction={['column', 'row']}>
          <VStack
            w={'full'}
            borderLeft={['none', '1px solid white']}
            borderRight={['none', '1px solid white']}
          >
            <Heading textTransform={'uppercase'}  textAlign={['center','left']}>
              CryptoRun
            </Heading>

            <Text fontSize={'xs'} >All rights reserved</Text>
            <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"] }
            m={2}
            p={2}
            
          >
            We are the best crypto trading app in India, we provide accurate and real time data 
          </Text >
          </VStack>
  
          <VStack w={'full'}>
            <Heading size={'md'} textTransform={'uppercase'} p={1}>
              Developer Connect
            </Heading>
            <Button variant={'link'} colorScheme={'white'}>
              <a target={'blank'} href="https://www.linkedin.com/in/himanshu-ray-60ab02243/">
                <FaLinkedin size={'30'}/>                 
              </a>
            </Button>
            <Button variant={'link'} colorScheme={'white'}>
              <a target={'blank'} href="https://www.instagram.com/hr_liftts/">
                <FaInstagram size={'30'}/>
                
              </a>
            </Button>
  
            <Button variant={'link'} colorScheme={'white'}>
              <a target={'blank'} href="https://github.com/hr188">
                <FaGithub size={'30'}/>
              
              </a>
            </Button>
          </VStack>
        </Stack>
      </Box>
    );
  };
  
  export default Footer;