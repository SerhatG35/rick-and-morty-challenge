import '@testing-library/jest-dom/extend-expect'
import { cleanup, render, waitFor } from '@testing-library/react'
import App from 'src/App'
import { mockData } from 'src/fixtures'

afterEach(cleanup)

// jest.mock('axios');
jest.mock('../service/axios')

test('renders components without an error', async () => {
    const wrapper = render(<App />)
    await waitFor(() => wrapper)

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
})

test('episode loaded correctly', async () => {
    const wrapper = render(<App />)
    await waitFor(() => wrapper)

    expect(wrapper.getByTestId('episode-wrapper')).toHaveTextContent(mockData.name)

    wrapper.unmount()
})
