import axios from 'axios' ;

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async(url) => {
    const {data} = await axios.get((url) , {
        headers: {
            'X-RapidAPI-Key': '04427461dfmsh80f1f5835346b85p176d49jsne303156550d8',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
        }
    });
    return data ;
}
