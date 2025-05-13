import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CreateTopicForm from '@/app/teacher/page';  
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import "@testing-library/jest-dom";

jest.mock("axios");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

beforeAll(() => {
    global.ResizeObserver = class {
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
    };
  });
  

describe("CreateTopicForm - Update Topic", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          id: "teacher1",
          role: "TEACHER",
        },
      },
    });

    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "123", 
    });

    (axios.get as jest.Mock).mockImplementation((url: string) => {
      if (url.includes("/api/topic/get")) {
        return Promise.resolve({
          data: {
            data: {
              title: "Old Title",
              description: "Old Description",
              content: ["Old content"],
            },
          },
        });
      }
      if (url.includes("/api/tests/get")) {
        return Promise.resolve({
          data: {
            questions: [
              {
                text: "Old question?",
                answers: [
                  { text: "Answer 1", isCorrect: false, id: 1 },
                  { text: "Answer 2", isCorrect: true, id: 2 },
                ],
              },
            ],
          },
        });
      }
      return Promise.reject("Unknown GET");
    });

    (axios.put as jest.Mock).mockResolvedValue({});
  });

  it("should update existing topic and test successfully", async () => {
    render(<CreateTopicForm />);

    await waitFor(() =>
      expect(screen.getByLabelText(/Názov/i)).toHaveValue("Old Title")
    );

    fireEvent.change(screen.getByLabelText(/Názov/i), {
      target: { value: "Updated Title" },
    });

    fireEvent.change(screen.getByLabelText(/Popis/i), {
      target: { value: "Updated Description" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Uložiť tému/i }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith("/api/topic/update", {
        topicNumber: 123,
        title: "Updated Title",
        description: "Updated Description",
        content: ["Old content"], 
        createdBy: "teacher1",
      });

      expect(axios.put).toHaveBeenCalledWith("/api/tests/put", {
        topicNumber: 123,
        questions: [
          {
            label: "Old question?",
            answers: [
              { label: "Answer 1", isRight: false, number: 1 },
              { label: "Answer 2", isRight: true, number: 2 },
            ],
          },
        ],
      });
    });

    expect(await screen.findByText(/Téma bola úspešne upravená/i)).toBeInTheDocument();
  });
});
