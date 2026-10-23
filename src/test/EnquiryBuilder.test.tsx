/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from '@testing-library/react';
import EnquiryBuilder from '../components/sections/EnquiryBuilder';

describe('EnquiryBuilder', () => {
  it('rejects empty description', () => {
    render(<EnquiryBuilder initialService="Generator repairs" />);
    fireEvent.click(screen.getByRole('button', { name: /create enquiry summary/i }));
    expect(screen.getByRole('status').textContent).toMatch(/please describe/i);
  });
  it('generates summary', () => {
    render(<EnquiryBuilder initialService="Generator repairs" />);
    fireEvent.change(screen.getByLabelText(/tell us/i), { target: { value: 'Won’t start' } });
    fireEvent.click(screen.getByRole('button', { name: /create enquiry summary/i }));
    expect(screen.getAllByText(/won/i).length).toBeGreaterThan(1);
  });
});
