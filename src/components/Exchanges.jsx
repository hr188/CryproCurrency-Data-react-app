import React, { useEffect, useState } from 'react'
import axios from 'axios'
import server from '../index'
import { Container, HStack, VStack ,Image, Heading ,Text ,Button} from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';


const Exchanges = () => {

  const [exchanges,setExchanges] = useState([]);   
  const [loading,setLoading] = useState(true);  
  const [erroR ,catcherror] = useState(false);
  const [pages,setpages] =useState(1);

  const btns = new Array(50).fill(1); 

  const changePage = (pages) =>{
    setpages(pages);
    setLoading(true);
    };

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const response = await axios.get(`${server}/exchanges?page=${pages}`);
        setExchanges(response.data); // Assuming the data is an array of objects
        setLoading(false);
      } catch (error) {
        catcherror(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, [pages]);
    if(erroR){
        return(
        <Error/>
        );
    }

  return (
    <Container maxW={'container.xl'} >
        {
            loading?<Loader/> : <>
            <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {exchanges.map((i) => (
            <Exchangecard  key={i.id} name={i.name} url={i.url} img={i.image} rank ={i.trust_score_rank} />
            ))}
                
            </HStack>
            <HStack w={'full'} overflowX={'auto'} p={'8'}>
                    {
                        btns.map((item,index)=>(
                            <Button key={index} bgColor={'blackAlpha.900'} color={'white'} onClick={()=>changePage(index+1)}>
                                {index+1}
                            </Button>
                        ))
                    }
                </HStack>
            </>
        }
    </Container>
  )
}

const Exchangecard = ({name, url , img , rank})=>{
    return(
    <a href={url} target={'_blank'}> 
        <VStack width={'52'} shadow={'lg'} p={'8'} border-borderRadius={'lg'} transition={"all 0.3s "} m={'4'} _hover={{ transform: "scale(1.1)" }}>
            <Image src={img} h={'10'} w={'10'} objectFit={'contain'} alt={'exchange'}/>
            <Heading size={'md'} noOfLines={'1'} >{rank}</Heading>
            <Text noOfLines={'1'} >{name}</Text>
        </VStack>
    </a>
    );
}

export default Exchanges;