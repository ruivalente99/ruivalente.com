import axios from 'axios'
import { User } from 'types/User'

const environment = {
    api: import.meta.env.VITE_BE
}

const api = axios.create( {
    baseURL: environment.api,
} )

const getExample = async() => {
    const response = await api.get( '/users' )
    return response.data
}

const postExample = async( data: User ) => {
    const response = await api.post( '/users', data )
    return response.data
}

export { getExample, postExample }


export default api