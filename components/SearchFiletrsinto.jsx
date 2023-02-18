import { useState, useEffect } from "react";
import { Flex, Box, Text, Input, Spinner, Select, Icon, Button } from '@chakra-ui/react'
import { useRouter } from "next/router";
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';

import { filterData, getFilterData, getFilterValues } from '../utils/filterData'

const SearchFiltersinto = () => {

    const router = useRouter();
    const [filters, setfilters] = useState(filterData);

    const searchProperties = (filterData) => {
        const path = router.pathname ;
        const { query } = router ; 


        const values = getFilterValues(filterData) ;

        values.forEach ((item) => {
            if(item.value && filterData?.[item.name]) {
            query[item.name] = item.value ;
         }
        })

        router.push({ pathname: path, query })

    };

    return (
        <Flex flexWrap="wrap" bg="gray.100" p="4" justifyContent="center">
            {
                filters.map((filter) => (
                    <Box key={filter.queryName}>
                        <Select
                            placeholder={filter.placeholder}
                            w="fit-content"
                            p="2"
                            onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}
                        >
                            {filter?.items?.map((item) => (
                                <option
                                    value={item.value}
                                    key={item.value}
                                >
                                    {item.value}
                                </option>
                            ))}
                        </Select>
                    </Box>

                ))
            }

        </Flex>
    )
}

export default SearchFiltersinto;

