import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { ForgotPassword } from "../pages/sign/forgot-password";
import { useAuth } from "../contexts/auth";

// Mock do contexto useAuth
vi.mock("../contexts/auth", () => ({
  useAuth: vi.fn(),
}));

// Mock do useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(), // Sobrescreve o useNavigate
  };
});

describe("ForgotPassword Component", () => {
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

  const mockNavigate = vi.fn(); // Mock de useNavigate

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock do useAuth para retornar o mockUseAuth
    vi.mocked(useAuth).mockReturnValue(mockUseAuth);

    // Mock do useNavigate para capturar navegações
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("deve renderizar corretamente a página de esqueci minha senha", () => {
    render(
      <ChakraProvider>
        <MemoryRouter>
          <ForgotPassword />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(/Por favor, insira o endereço de e-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByText("Voltar")).toBeInTheDocument();
    expect(screen.getByText("Enviar E-mail")).toBeInTheDocument();
  });

  it("deve exibir um toast de erro ao falhar no envio do e-mail", async () => {
    // Mockando o comportamento do sendEmail para falhar
    mockUseAuth.sendEmail.mockResolvedValueOnce(false);

    render(
      <ChakraProvider>
        <MemoryRouter>
          <ForgotPassword />
        </MemoryRouter>
      </ChakraProvider>
    );

    const emailInput = screen.getByPlaceholderText("E-mail");
    const sendButton = screen.getByText("Enviar E-mail");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("Erro ao enviar e-mail")).toBeInTheDocument();
    });
  });

  it("deve navegar para a página de validação de código ao enviar o e-mail com sucesso", async () => {
    // Mockando o comportamento do sendEmail para ser bem-sucedido
    mockUseAuth.sendEmail.mockResolvedValueOnce(true);

    render(
      <ChakraProvider>
        <MemoryRouter>
          <ForgotPassword />
        </MemoryRouter>
      </ChakraProvider>
    );

    const emailInput = screen.getByPlaceholderText("E-mail");
    const sendButton = screen.getByText("Enviar E-mail");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      // Verificar se o mockNavigate foi chamado com o valor correto
      expect(mockNavigate).toHaveBeenCalledWith("/codeValidation");
    });
  });
});
