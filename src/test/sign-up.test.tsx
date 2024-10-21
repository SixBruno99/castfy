import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignUp } from "../pages/sign/sign-up";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";


// Mock da função signUp
const mockSignUp = vi.fn();

vi.mock("../contexts/auth", () => ({
  useAuth: () => ({
    signUp: mockSignUp,
  }),
}));

describe("SignUp Page", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <ChakraProvider>
          <SignUp />
        </ChakraProvider>
      </BrowserRouter>
    );

  it("Deve renderizar o componente SignUp", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Data de Nascimento")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirmar Senha")).toBeInTheDocument();
    expect(screen.getByText("Cadastre-se")).toBeInTheDocument();
  });

  it("Deve mostrar erros para os campos vazios", async () => {
    renderComponent();
    fireEvent.click(screen.getByText("Cadastre-se"));

    await waitFor(() => {
      expect(screen.getByText("Email inválido.")).toBeInTheDocument();
      expect(screen.getByText("Nome inválido.")).toBeInTheDocument();
      expect(screen.getByText("Data inválida.")).toBeInTheDocument();
      const errorMessages = screen.getAllByText("Senha inválida.");
      expect(errorMessages).toHaveLength(2);
    });
  });

  it("Deve mostrar o erro para email inválido", async () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByText("Cadastre-se"));

    await waitFor(() =>
      expect(screen.getByText("Formato de email inválido.")).toBeInTheDocument()
    );
  });

  it("Deve mostrar o erro para senha fraca", async () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nome"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Data de Nascimento"), {
      target: { value: "2000-01-01" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "weak12345" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirmar Senha"), {
      target: { value: "weak12345" },
    });
    fireEvent.click(screen.getByText("Cadastre-se"));

    await waitFor(() =>
      expect(
        screen.getByText(
          "Senha inválida. Deve conter pelo menos um caractere especial, uma letra maiúscula e um digito numérico."
        )
      ).toBeInTheDocument()
    );
  });

  it("Deve mostrar os erros para quando as senhas não forem iguais", async () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nome"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Data de Nascimento"), {
      target: { value: "2000-01-01" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "Valid@123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirmar Senha"), {
      target: { value: "DifferentPassword" },
    });
    fireEvent.click(screen.getByText("Cadastre-se"));

    const errorMessages = screen.getAllByText("As senhas não coincidem.");
    expect(errorMessages).toHaveLength(2);
  });

  it("Deve chamar a função signUp com os dados os corretos quando o formulário for válido", async () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nome"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Data de Nascimento"), {
      target: { value: "2000-01-01" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "Valid@123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirmar Senha"), {
      target: { value: "Valid@123" },
    });
    fireEvent.click(screen.getByText("Cadastre-se"));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalled();
      const [callArgs] = mockSignUp.mock.calls;

      expect(callArgs[0]).toEqual({
        name: "John Doe",
        email: "test@example.com",
        password: "Valid@123",
        gender: "MALE", // valor padrão usado no código
        birthDate: new Date("2000-01-01"),
      });
    });
  });
});
