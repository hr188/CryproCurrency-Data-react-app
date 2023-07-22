import React from 'react'
import { Container, HStack, VStack ,Image, Heading ,Text} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Coincard = ({name, img , symbol ,id,price ,currencySymbol="₹"})=>{
    return(
    <Link to={`/coin/${id}`} > 
        <VStack width={'52'} shadow={'lg'} p={'8'} border-borderRadius={'lg'} transition={"all 0.3s "} m={'4'} _hover={{ transform: "scale(1.1)" }}>
            <Image src={img} h={'10'} w={'10'} objectFit={'contain'} alt={'exchange'}/>
            <Heading size={'md'} noOfLines={'1'} >{symbol}</Heading>
            <Text noOfLines={'1'} >{name}</Text>
            <Text noOfLines={'1'} >{price?`${currencySymbol} ${price}`:"NA"}</Text>
        </VStack>
    </Link>
    );
}


export default Coincard