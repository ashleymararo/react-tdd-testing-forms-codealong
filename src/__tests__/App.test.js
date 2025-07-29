import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from "../App";

// Pepperoni checkbox
test("checkbox is initially unchecked", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  expect(addPepperoni).not.toBeChecked();
});

test("checkbox appears as checked when user clicks it", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  userEvent.click(addPepperoni);
  expect(addPepperoni).toBeChecked();
});

test("checkbox appears as unchecked when user clicks a second time", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  userEvent.click(addPepperoni);
  expect(addPepperoni).toBeChecked();
  userEvent.click(addPepperoni);
  expect(addPepperoni).not.toBeChecked();
});

// Size select element
test("select dropdown for size defaults to 'Medium'", () => {
  render(<App />);
  const select = screen.getByRole("combobox");
  expect(select.value).toBe("Medium");
});

// "Your Selection" text
test("displays selected toppings and size", () => {
  render(<App />);
  const selectionText = screen.getByText(/your selection/i);
  expect(selectionText).toBeInTheDocument();
});

// "Contact Info" text box
test("has a contact info input field", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/enter your contact info/i);
  expect(input).toBeInTheDocument();
});

// Submit Order button
test("submit button exists and submits order", async () => {
  render(<App />);
  const submitButton = screen.getByRole("button", { name: /submit order/i });
  expect(submitButton).toBeInTheDocument();

  const input = screen.getByPlaceholderText(/enter your contact info/i);
  const checkbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
  const select = screen.getByRole("combobox");

  userEvent.type(input, "benson@example.com");
  userEvent.selectOptions(select, "Large");
  userEvent.click(checkbox);
  userEvent.click(submitButton);

  const confirmation = await screen.findByText(/order submitted/i);
  expect(confirmation).toBeInTheDocument();
});