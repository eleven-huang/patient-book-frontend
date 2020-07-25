import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from '@testing-library/svelte'
import Home from '../src/Home.svelte'

test('shows proper text when rendered', () => {
  const { getByText } = render(Home)

  expect(getByText('Welcome')).toBeInTheDocument();
  expect(getByText('Welcome').hidden).toBe(false);
})

// Note: This is as an async test as we are using `fireEvent`
test('click register to show input fields', async () => {
  const { getByText } = render(Home);
  const button = getByText('REGISTER');

  await fireEvent.click(button);

  expect(getByText('Submit')).toBeInTheDocument(true);
  expect(getByText('Name')).toBeInTheDocument(true);
  expect(getByText('Submit').hidden).toBe(false);
  expect(getByText('Welcome')).toBeInTheDocument(false);
})
