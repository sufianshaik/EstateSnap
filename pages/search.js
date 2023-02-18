import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {Box,Flex,Text,Icon} from '@chakra-ui/react' ;
import {BsFilter} from 'react-icons/bs' ;
import { set } from "nprogress";
import SearchFiltersinto from "../components/SearchFiletrsinto";
import Property from "../components/Property";
import noresult from '../assets/images/noresult.svg'
import { fetchApi,baseUrl } from "../utils/fetchApi";

const search = ({properties}) => {
    const [searchFilter,setsearchFilter] = useState(false) ;
    const router = useRouter() ;

    return (
        <Box>
            <Flex
                cursor="pointer"
                bg="gray.100"
                borderBottom="1px"
                borderColor="gray.200"
                p="2"
                fontWeight="black"
                fontSize="lg"
                justifyContent="center"
                alignItems="center"
                onClick={()=> setsearchFilter((prevFilters) => !prevFilters)}
            >
            <Text>Search Property by filters</Text>
            <Icon paddingLeft="2" w="7" as={BsFilter} />
            </Flex>
            {
                searchFilter && <SearchFiltersinto/>
            }
            <Text p="4" fontSize="2xl" fontWeight="bold">Properties {router.query.purpose}</Text>
            <Flex flexWrap="wrap">
            {
                properties.map((property) => <Property property={property} key={property.id}/>)
            }
            </Flex>
            {
                properties.length === 0 && (
                    <Flex justifyContent="center" alignItems="center" flexDir="column" marginTop="5" marginBottom="5">
                        <Image alt ="no image" src={noresult} width={150} height={80}/>
                        <Text fontSize="2xl" marginTop="3">No Results Found</Text>
                    </Flex>
                )
            }
        </Box>
    )


}

export default search;

export async function getServerSideProps({query}) {
  // nextjs allows to api calls here in function block
  const purpose = query.purpose || 'for-rent' ;
  const rentFrequency = query.rentFrequency || 'yearly' ;
  const minPrice = query.minPrice || '0' ;
  const maxPrice = query.maxPrice || '1000000' ;
  const roomsMin = query.maxPrice || '0' ;
  const bathsMin = query.bathsMin || '0' ;
  const sort = query.sort || 'price-desc' ;
  const areamax = query.areamax || '35000' ;
  const locationExternalIDs = query.locationExternalIDs || '5002' ;
  const categoryExternalID = query.categoryExternalID || '4' ;

  const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&minPrice=${minPrice}&maxPrice=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areamax=${areamax}`);

  return {
    // nextjs adds automatically as props at top 
    props : {
        properties : data?.hits 
      
    }
  }
}
