import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import App from 'src/App'
import EpisodeBoxs from 'src/components/EpisodeBox'
import { mockData } from 'src/fixtures'

test('renders components without an error', async () => {
    const wrapper = render(<App />)
    await waitFor(() => wrapper)

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
})

test('load more character', async () => {
    const wrapper = render(<App />)
    await waitFor(() => wrapper)

    const mock = new MockAdapter(axios)
    mock.onGet('/episodes').reply(200, mockData)

    const spy = jest.spyOn(EpisodeBoxs.prototype, 'getCharacters')

    const { data } = await axios.get('/episodes')

    wrapper.unmount()
})
