import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { mockData } from 'src/fixtures'

export const Episodes = async () => {
    const mock = new MockAdapter(axios)
    mock.onGet('https://rickandmortyapi.com/api/episode?page=1').reply(200, mockData)
}

// export const axios = async () => {
//     return await new Promise(resolve => resolve(mockData))
// }
// export const axios = async () => {
//     const mock = new MockAdapter(axios)
//     return await new Promise(() => mock.onGet('https://rickandmortyapi.com/api/episode?page=1').reply(200, mockData))
// }
