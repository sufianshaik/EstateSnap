import Link from 'next/link' ;
import Image from 'next/image' ; 
import { Flex, Box, Text, Button} from '@chakra-ui/react';
import styles from '../styles/Home.module.css'
import Property from '../components/Property';

import { baseUrl,fetchApi } from '../utils/fetchApi';


// banner component which can be reused for various contents
const Banner = ({purpose,imageurl,desc1,desc2,title1,title2,LinkName,buttonText}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
     <Image src={imageurl} alt="banner" width={500}  height={300} priority/>
     <Box p="5"> 
      <Text color='gray.500' fontSize="sm" fontWeight="medium" >{purpose}</Text>
      <Text fontSize="3xl" fontWeight="bold" >{title1}<br/>{title2}</Text>
      <Text color='gray.700' paddingTop="3" paddingBottom="3" fontSize="lg" fontWeight="medium" >{desc1}<br />{desc2}</Text>
      <Button fontSize="xl" bg="blue.300" color="white"  > 
        <Link href={LinkName}>{buttonText}</Link>
      </Button>
     </Box>
  </Flex>
)


export default function Home({propertyForRent , propertyForSale }) { 
  return (
    <Box >
      <Banner 
        purpose = "RENT A HOME" 
        title1 = "Rental Homes for"
        title2 = "Everyone"
        desc1 = "Explore Apartments,Villas,Homes"
        desc2 = "and more"
        buttonText = "Explore Renting"
        LinkName = "/search?purpose=for-rent"
        imageurl = "https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />

      <Flex flexWrap="wrap">
      {/* flex the properties and map over here for rent*/}
      {propertyForRent.map((property) => <Property property={property} key={property.id}/> )}
      </Flex>

      <Banner 
        purpose = "BUY A HOME" 
        title1 = "Find Buy & own Your"
        title2 = "Dream House"
        desc1 = "Explore Apartments,Villas,Homes"
        desc2 = "and more"
        buttonText = "Explore Buying"
        LinkName = "/search?purpose=for-sale"
        imageurl = "https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
     {/* properties for buy a home */}

     <Flex flexWrap="wrap">
     {propertyForSale.map((property) => <Property property={property} key={property.id}/> )}
     </Flex>
     
    </Box>
   
  )
}


export async function getStaticProps() {
  // nextjs allows to api calls here in function block
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    // nextjs adds automatically as props at top 
    props : {
      propertyForSale : propertyForSale?.hits,
      propertyForRent : propertyForRent?.hits,
    }
  }
}
