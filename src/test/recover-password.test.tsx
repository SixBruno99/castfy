import { render, fireEvent, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { RecoverPassword } from "../pages/sign/recover-password";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { useAuth } from "../contexts/auth";

// Mock do contexto de autenticação
vi.mock("../contexts/auth", () => ({
  useAuth: vi.fn(),
}));

// Teste da página de Recuperar Senha
describe("RecoverPassword", () => {
  const mockUseAuth = {
    signed: false,
    user: undefined,
    signIn: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    sendEmail: vi.fn(),
    sendCode: vi.fn(),
    sendPassword: vi.fn(),
    userHasPodcast: false,
    updateUserHasPodcast: vi.fn(),
    loadCredentials: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Simula a implementação do hook useAuth
    vi.mocked(useAuth).mockReturnValue(mockUseAuth);
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ChakraProvider>
          <RecoverPassword />
        </ChakraProvider>
      </MemoryRouter>
    );

  it("deve mostrar erro quando a senha for inválida", async () => {
    renderComponent();

    // Simula o clique no botão para redefinir senha sem preencher os campos
    fireEvent.click(screen.getByText("Redefinir Senha"));

    // Verifica se o erro de senha é exibido
    expect(screen.getByText("Senha inválida.")).toBeInTheDocument();
  });

  it("deve mostrar erro quando as senhas não coincidem", async () => {
    renderComponent();

    // Preenche o campo de senha e confirmar senha com valores diferentes
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "Valid@123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirmar Senha"), {
      target: { value: "DifferentPassword" },
    });

    // Simula o clique no botão para redefinir senha
    fireEvent.click(screen.getByText("Redefinir Senha"));

    // Verifica se o erro "As senhas não coincidem" é exibido
    expect(screen.getByText("As senhas não coincidem.")).toBeInTheDocument();
  });

  it("deve chamar sendPassword com a senha correta quando os campos forem válidos", async () => {
    renderComponent();

    // Preenche os campos de senha corretamente
    await act(async () => {
      // Preenche os campos de senha corretamente
      fireEvent.change(screen.getByPlaceholderText("Senha"), {
        target: { value: "Valid@123" },
      });
      fireEvent.change(screen.getByPlaceholderText("Confirmar Senha"), {
        target: { value: "Valid@123" },
      });

      // Simula o clique no botão para redefinir senha
      fireEvent.click(screen.getByText("Redefinir Senha"));
    });

    // Verifica se a função sendPassword foi chamada com a senha correta
    expect(mockUseAuth.sendPassword).toHaveBeenCalledWith("Valid@123");
  });

  it("deve exibir toast de sucesso ao redefinir senha corretamente", async () => {
    mockUseAuth.sendPassword.mockResolvedValueOnce(true); // Simula o sucesso do envio da senha

    renderComponent();

    // Preenche os campos de senha corretamente
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "Valid@123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirmar Senha"), {
      target: { value: "Valid@123" },
    });

    // Simula o clique no botão para redefinir senha
    fireEvent.click(screen.getByText("Redefinir Senha"));

    // Espera que o toast de sucesso tenha sido exibido
    expect(await screen.findByText("Sucesso ao alterar senha!")).toBeInTheDocument();
  });

  it("deve exibir toast de erro ao falhar na redefinição de senha", async () => {
    mockUseAuth.sendPassword.mockRejectedValueOnce(new Error("Erro ao redefinir senha")); // Simula erro no envio da senha

    renderComponent();

    // Preenche os campos de senha corretamente
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "Valid@123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirmar Senha"), {
      target: { value: "Valid@123" },
    });

    // Simula o clique no botão para redefinir senha
    fireEvent.click(screen.getByText("Redefinir Senha"));

    // Espera que o toast de erro tenha sido exibido
    expect(await screen.findByText("Erro ao alterar senha!")).toBeInTheDocument();
  });
});
