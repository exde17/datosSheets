import axios from 'axios'
// import { API_BASE_PATH } from '@env'

import { useQuery, useMutation, QueryClientProvider } from 'react-query'

const url = 'https://script.google.com/macros/s/AKfycbwpsB_oIzxvJVhNZXXD6A67auZaiBar--5jsExLFTXhZFNSTsZuD9_QXjt-jB3W6YkBrw/exec'
const fetchDatos = async () =>{
    const {data} = await axios.get(`${url}?collection = datos`)
    return data
}

const createDatos = async (data) =>{
    const reques = await axios.post({API_BASE_PATH}, data)
    return reques.data;
}

// const updateDatos = async (datos) =>{
//     const {data} = await axios.put({API_BASE_PATH}, datos)
//     return data
// }

// const deleteDatos = async (id) =>{
//     const {data} = await axios.delete({API_BASE_PATH}, id)
//     return data
// }

export const usePostData = () => { 
    const queryClient = QueryClientProvider();
    return useMutation(createDatos, { 
        onSuccess: () => queryClient.invalidateQueries('datos')
    })
}

export const useFetchDatos = () => {
    return useQuery(['datos'], fetchDatos, { refetchOnWindowFocus: true })
}