import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormLogin from "@/app/auth/login/page";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import '@testing-library/jest-dom';
import { useToast } from "@/hooks/use-toast";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

let mockToastFn: jest.Mock = jest.fn();

jest.mock("@/hooks/use-toast", () => {
  return {
    useToast: () => ({
      toast: mockToastFn,
    }),
  };
});

describe("FormLogin", () => {
  const pushMock = jest.fn();
  const refreshMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      refresh: refreshMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows validation errors for empty inputs", async () => {
    render(<FormLogin />);
    
    fireEvent.click(screen.getByText("Prihlásiť sa"));
  
    await waitFor(() => {
        expect(screen.getByText(/Používateľské meno musí mať aspoň 2 znaky/)).toBeInTheDocument();
        expect(screen.getByText(/Heslo musí mať aspoň 8 znakov/)).toBeInTheDocument();
      });   
  });

  it("handles wrong credentials", async () => {
    (signIn as jest.Mock).mockResolvedValue({ status: 401 });
  
    render(<FormLogin />);
    
    fireEvent.input(screen.getByPlaceholderText(/johndoe/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText(/heslo/i), {
      target: { value: "wrongpassword" },
    });
  
    fireEvent.click(screen.getByText("Prihlásiť sa"));
    await waitFor(() => {
      expect(mockToastFn).toHaveBeenCalledWith({
        title: "Neplatný e-mail alebo heslo",
        description: "Skúste to prosím znova.",
        variant: "destructive",
      });
    });
  });
  

  it("navigates on successful login", async () => {
    (signIn as jest.Mock).mockResolvedValue({ ok: true });

    render(<FormLogin />);
    fireEvent.input(screen.getByPlaceholderText(/johndoe/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText(/heslo/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Prihlásiť sa"));

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith(".././"));
  });
});
