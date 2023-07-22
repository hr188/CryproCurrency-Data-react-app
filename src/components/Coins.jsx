import React, { useEffect, useState } from 'react'
import axios from 'axios'
import server from '../index'
import { Container, HStack, VStack ,Image, Heading ,Text, Button, RadioGroup, Radio} from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';
import Coincard from './Coincard';



const Coins = () => {

  const [Coins,setcoins] = useState([]);   
  const [loading,setLoading] = useState(true);  
  const [erroR ,catcherror] = useState(false);
  const [page ,Setpage] = useState(1);
  const [currency , setCurrency] = useState("inr");

  const currencySymbol = currency==="inr"?"₹":currency==="eur"?"€":"$";
  const changePage = (page) =>{
    Setpage(page);
    setLoading(true);
    };

   const btns = new Array(132).fill(1); 

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        console.log('Response data:', response.data);
        setcoins(response.data); // Assuming the data is an array of objects
        setLoading(false);
      } catch (error) {
        catcherror(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency,page]);
    if(erroR){
        return(
        <Error/>
        );
    }

  return (
    <Container maxW={'container.xl'} >
        {
            loading?<Loader/> : <>
            <RadioGroup value={currency} onChange={setCurrency}  p={8}>
                <HStack spacing={'4'}>
                    <Radio value={'inr'} >INR</Radio>
                    <Radio value={'usd'} >USD</Radio>
                    <Radio value={'eur'} >EUR</Radio>
                </HStack>
            </RadioGroup>
        
            <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {Coins.map((i) => (
            <Coincard id={i.id} key={i.id} name={i.name} price={i.current_price} img={i.image} symbol={i.symbol} currencySymbol={currencySymbol}/>
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




export default Coins