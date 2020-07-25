import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from '@testing-library/svelte'
import Admin from '../src/Admin.svelte'

test('shows proper text when rendered', () => {
  const { getByText } = render(Admin)

  expect(getByText('PatientBook-Admin')).toBeInTheDocument();
  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('Patients')).toBeInTheDocument();
  expect(getByText('Name')).toBeInTheDocument();
  expect(getByText('Number')).toBeInTheDocument();
  expect(getByText('Appointment')).toBeInTheDocument();
  expect(getByText('Address')).toBeInTheDocument();
  expect(getByText('Email')).toBeInTheDocument();
})
