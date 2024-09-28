import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignIn } from "./sign-in";
import { vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

// Mocking useAuth
vi.mock("../../contexts/auth", () => ({
  useAuth: () => ({
    signIn: vi.fn(),
  }),
}));

describe("SignIn Page", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <ChakraProvider>
          <SignIn />
        </ChakraProvider>
      </BrowserRouter>
    );

  it("should render the SignIn component", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should show error for empty email", async () => {
    renderComponent();
    fireEvent.click(screen.getByText("Login"));
    await waitFor(() =>
      expect(screen.getByText("E-mail inválido.")).toBeInTheDocument()
    );
  });

  it("should show error for invalid email format", async () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByText("Login"));
    await waitFor(() =>
      expect(screen.getByText("Formato de email inválido.")).toBeInTheDocument()
    );
  });

  it("should show error for invalid password", async () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText("Login"));
    await waitFor(() =>
      expect(screen.getByText("Senha inválida.")).toBeInTheDocument()
    );
  });

  it("should call signIn with valid email and password", async () => {
    const { signIn } = useAuth();
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "Valid@123" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith(
        { email: "test@example.com", password: "Valid@123" },
        true
      );
    });
  });
});
