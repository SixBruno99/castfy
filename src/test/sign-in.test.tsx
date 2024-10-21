import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignIn } from "../pages/sign/sign-in";
import { vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";


// Mock useAuth to return a spy for signIn
const mockSignIn = vi.fn();

vi.mock("../contexts/auth", () => ({
  useAuth: () => ({
    signIn: mockSignIn,
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

  it("Deve renderizar o componente SignIn", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("Deve mostrar o error para emails não informados", async () => {
    renderComponent();
    fireEvent.click(screen.getByText("Login"));
    await waitFor(() =>
      expect(screen.getByText("E-mail inválido.")).toBeInTheDocument()
    );
  });

  it("Deve mostrar o error para emails no formato inválido", async () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "email-invalido" },
    });
    fireEvent.click(screen.getByText("Login"));
    await waitFor(() =>
      expect(screen.getByText("Formato de email inválido.")).toBeInTheDocument()
    );
  });

  it("Deve mostrar o error para senhas inválidas", async () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "teste@exemplo.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText("Login"));
    await waitFor(() =>
      expect(screen.getByText("Senha inválida.")).toBeInTheDocument()
    );
  });

  it("Deve chamar o SignIn com email e senha válidos", async () => {
    // Renderiza o componente
    renderComponent();

    //Dispara os eventos para simular o usuário
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "teste@exemplo.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "Senha@123" },
    });
    fireEvent.click(screen.getByText("Login"));

    // Aguarda o mock signIn ser chamado com os argumentos corretos
    await waitFor(() => {
      // Captura o que foi passado para a função mockada
      expect(mockSignIn).toHaveBeenCalled();
      const [callArgs] = mockSignIn.mock.calls;

      // Verifica se os argumentos estão corretos
      expect(callArgs[0]).toEqual({
        email: "teste@exemplo.com",
        password: "Senha@123",
      });
      expect(callArgs[1]).toBe(true); // Verifica se o segundo argumento é true
    });
  });
});
