import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormRegister from "@/app/auth/registration/page";  
import { useRouter } from "next/navigation";
import '@testing-library/jest-dom';

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("FormRegister", () => {
  const pushMock = jest.fn();
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows validation errors for empty inputs", async () => {
    render(<FormRegister />);

    fireEvent.click(screen.getByText("Zaregistrovať sa"));

    await waitFor(() => {
      expect(screen.getAllByText(/Toto pole je povinné/)).toHaveLength(3);
      expect(screen.getByText(/Je potrebné potvrdenie hesla/)).toBeInTheDocument();
    });
  });

  it("shows password mismatch error", async () => {
    render(<FormRegister />);

    fireEvent.input(screen.getByPlaceholderText("vickysmith"), {
      target: { value: "vickysmith" },
    });
    fireEvent.input(screen.getByPlaceholderText("mail@example.com"), {
      target: { value: "user@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("Zadajte heslo"), {
      target: { value: "password123" },
    });
    fireEvent.input(screen.getByPlaceholderText("Opätovné zadanie hesla"), {
      target: { value: "password124" },
    });

    fireEvent.click(screen.getByText("Zaregistrovať sa"));

    await waitFor(() => {
      expect(screen.getByText(/Heslá nie sú zhodné/)).toBeInTheDocument();
    });
  });

  it("navigates on successful registration", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    });

    render(<FormRegister />);

    fireEvent.input(screen.getByPlaceholderText("vickysmith"), {
      target: { value: "vickysmith" },
    });
    fireEvent.input(screen.getByPlaceholderText("mail@example.com"), {
      target: { value: "user@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("Zadajte heslo"), {
      target: { value: "password123" },
    });
    fireEvent.input(screen.getByPlaceholderText("Opätovné zadanie hesla"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Zaregistrovať sa"));

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/auth/login"));
  });

  it("shows error message on failed registration", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ message: "Chyba pri registrácii" }),
    });

    render(<FormRegister />);

    fireEvent.input(screen.getByPlaceholderText("vickysmith"), {
      target: { value: "vickysmith" },
    });
    fireEvent.input(screen.getByPlaceholderText("mail@example.com"), {
      target: { value: "user@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("Zadajte heslo"), {
      target: { value: "password123" },
    });
    fireEvent.input(screen.getByPlaceholderText("Opätovné zadanie hesla"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Zaregistrovať sa"));

    await waitFor(() => {
      expect(screen.getByText("Chyba pri registrácii")).toBeInTheDocument();
    });
  });
});
