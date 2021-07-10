import { act, render, waitFor } from '@testing-library/react';
import Episodes from 'src/pages/Episodes';
import { useInView } from 'react-intersection-observer';

const useInViewMock = useInView as jest.Mock;

describe('Episode page tests', () => {
  test('generates a snapshot', async () => {
    useInViewMock.mockImplementation(() => [null, true]);

    const wrapper = render(<Episodes />);
    await waitFor(() => wrapper);

    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
