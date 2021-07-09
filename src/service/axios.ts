import axios from 'axios'
import { CharacterTypes, EpisodeFethAxiosType, LocationFethAxiosType } from 'global'

const API = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
})

export const Episodes = {
    GET: async (page: number) => {
        const { data } = await API.get<EpisodeFethAxiosType>(`/episode?page=${page}`)
        return data
    },
}

export const Locations = {
    GET: async (page: number) => {
        const { data } = await API.get<LocationFethAxiosType>(`/location?page=${page}`)
        return data
    },
}

export const Characters = {
    GET: async (characterInfo: string) => {
        const { data } = await API.get<CharacterTypes>(characterInfo)
        return data
    },
}

export default API
