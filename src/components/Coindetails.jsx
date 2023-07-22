import { Box, Container, HStack, Radio, RadioGroup, VStack ,Text ,Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress ,Button} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import server from '..';
import axios from 'axios';
import Error from './Error';
import Chart from './Chart';


const Coindetails = () => {
    const params = useParams();
    const [Coin,setcoin] = useState([]);   
    const [loading,setLoading] = useState(true);  
    const [erroR ,catcherror] = useState(false);
    const [currency , setCurrency] = useState("inr");
    const [days , setdays] = useState('24h');
    const [chartArr , setChartArr] = useState([]);

    const btns = ['24h' , '7d' ,'14d' , '30d' , '60d' ,'200d' ,'1y' , 'max'];

    const currencySymbol = currency==="inr"?"₹":currency==="eur"?"€":"$";

    const switchChartStats = (key) => {
        switch (key) {
          case "24h":
            setdays("24h");
            setLoading(true);
            break;
          case "7d":
            setdays("7d");
            setLoading(true);
            break;
          case "14d":
            setdays("14d");
            setLoading(true);
            break;
          case "30d":
            setdays("30d");
            setLoading(true);
            break;
          case "60d":
            setdays("60d");
            setLoading(true);
            break;
          case "200d":
            setdays("200d");
            setLoading(true);
            break;
          case "1y":
            setdays("365d");
            setLoading(true);
            break;
          case "max":
            setdays("max");
            setLoading(true);
            break;
    
          default:
            setdays("24h");
            setLoading(true);
            break;
        }
      };
    
    

    useEffect(() => {
        const fetchCoin = async () => {
          try {
            const response = await axios.get(`${server}/coins/${params.id}`);
            const {data:ChartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
            
            setcoin(response.data); // Assuming the data is an array of objects
            setChartArr(ChartData.prices);
            
            setLoading(false);
          } catch (error) {
            catcherror(true);
            setLoading(false);
            
          }
        };
        fetchCoin();
      }, [params.id,currency,days]);
        if(erroR){
            return(
            <Error/>
            );
        }
  
  return (
    <Container maxW={'container.xl'}>
        {
            loading?<Loader/>:(<>
            <Box borderWidth={'1'} width={'full'}>
                <Chart arr={chartArr} currency={currencySymbol} days={days}/>
            </Box>
            <HStack p="4" overflowX={"auto"}>
            {btns.map((i) => (
              <Button
                disabled={days === i}
                key={i}
                onClick={() => switchChartStats(i)}
              >
                {i}
              </Button>
            ))}
          </HStack>
            <RadioGroup value={currency} onChange={setCurrency} >
                <HStack spacing={'4'}>
                    <Radio value={'inr'} >INR</Radio>
                    <Radio value={'usd'} >USD</Radio>
                    <Radio value={'eur'} >EUR</Radio>
                </HStack>
            </RadioGroup>
            <VStack spacing={'4'} padding={'16'} alignItems={'flex-start'}>
                <Text alignSelf={'center'} opacity={'0.7'} fontSize={'small'}> Last Updated on {Date(Coin.market_data.last_updated).split("G")[0]}</Text>
                <Image src={Coin.image.large} w={'16'} h={'16'} objectFit={'contain'}></Image>
                <Stat>
                    <StatLabel>{Coin.name}</StatLabel>
                    <StatNumber>{currencySymbol}{Coin.market_data.current_price[currency]}</StatNumber>
                    <StatHelpText>
                        <StatArrow type={Coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"}/>
                        {Coin.market_data.price_change_percentage_24h}%
                    </StatHelpText>
                </Stat>
                <Badge fontSize={"2xl"} bgColor={'blackAlpha.900'} color={'whiteAlpha.700'}>
                    {`# ${Coin.market_cap_rank}`}
                </Badge>
               
                <CustomBar high={`${currencySymbol}${Coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${Coin.market_data.low_24h[currency]}`} />
                <CustomBarr high={`${currencySymbol}${Coin.market_data.ath[currency]}`} low={`${currencySymbol}${Coin.market_data.current_price[currency]}`} />
                <Box w={"full"} p={'4'}> 
                    <Item title={'Max Supply'} value={Coin.market_data.max_supply} />
                    <Item title={'Circulating Supply'} value={Coin.market_data.circulating_supply} />
                    <Item title={'Market Cap'} value={`${currencySymbol} ${Coin.market_data.market_cap[currency]}`} />
                    <Item title={'All Time High'} value={`${currencySymbol}${Coin.market_data.ath[currency]}`}/>
                    <Item title={'All Time Low'} value={`${currencySymbol}${Coin.market_data.atl[currency]}`} />
                </Box>
            </VStack>
            </>)
        }
    </Container>
  )
}

    const  CustomBar =({high,low})=>(
        <VStack w={'full'}>
            <Progress  value={50} colorScheme={'teal'} w={'full'}/>
            <HStack justifyContent={'space-between'} w={'full'}> 
                <Badge children={low} colorScheme='red' />
                <Text fontSize={'sm'}>  24H range </Text>
                <Badge children={high} colorScheme='green'/>
            </HStack>
        </VStack>
    );
    const CustomBarr =({high,low})=>(
        <VStack w={'full'}>
            <Progress  value={50} colorScheme={'teal'} w={'full'}/>
             {/*fix this percentage part*/}
            <HStack justifyContent={'space-between'} w={'full'}> 
                <Badge children={low} colorScheme='red' />
                <Text fontSize={'sm'}>  All time High Vs Current value </Text>
                <Badge children={high} colorScheme='green'/>
            </HStack>
        </VStack>
    );

    const Item =({title,value})=>(
        <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
            <Text fontFamily={'bebas neue'}  letterSpacing={'widset'}>{title} </Text>
            <Text >{value}</Text>
        </HStack>
    )

export default Coindetails