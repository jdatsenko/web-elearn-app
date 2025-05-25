import { render, fireEvent, waitFor} from '@testing-library/react';
import CreateTopicForm from '@/app/createTopic/page';  
import axios from 'axios';
import { useSession } from 'next-auth/react';
import '@testing-library/jest-dom';
import { act } from 'react';
import { useToast } from "@/hooks/use-toast";

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(''),
}));

jest.mock('axios');

let mockToastFn: jest.Mock = jest.fn();

jest.mock("@/hooks/use-toast", () => {
  return {
    useToast: () => ({
      toast: mockToastFn,
    }),
  };
});

// @ts-ignore
jest.mock('next/dynamic', () => () => (props) => <div {...props} />);

describe('CreateTopicForm', () => {
  beforeEach(() => {
    mockPush.mockReset();

    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { role: 'TEACHER', id: 1 },
      },
    });

    (axios.post as jest.Mock).mockResolvedValueOnce({
        data: { 
          topic: {
            id: 1,
            topicNumber: 1,
          }
        },
      }) 
      .mockResolvedValueOnce({
        data: { questions: [{ text: 'Question 1', answers: [{ text: 'Answer 1', isCorrect: true, id: 1 }] }] },
      }); 
  });

  it('should create a new topic successfully', async () => {
    const { getByLabelText, getByText, getAllByRole } = render(<CreateTopicForm />);

    await waitFor(() => {
      expect(getByLabelText(/Názov/i)).toBeInTheDocument();
    });    

    await act(async () => {
      fireEvent.change(getByLabelText(/Názov/i), { target: { value: 'Test Title' } });
      fireEvent.change(getByLabelText(/Popis/i), { target: { value: 'Test Description' } });
    });

    await act(async () => fireEvent.click(getByText(/Pridať otázku/i)));
    await act(async () => fireEvent.click(getByText(/Pridať odpoveď/i)));
    
    await act(async () => {
      const inputs = getAllByRole('textbox');
      fireEvent.change(inputs[inputs.length - 3], { target: { value: 'Question 1' } });
      fireEvent.change(inputs[inputs.length - 2], { target: { value: 'Answer 1' } });
      fireEvent.change(inputs[inputs.length - 1], { target: { value: 'Answer 2' } });
    
      const radioButtons = getAllByRole('radio');
      fireEvent.click(radioButtons[0]);
    });
    await act(async () => fireEvent.click(getByText(/Uložiť tému/i)));

    await waitFor(() => {
      expect(mockToastFn).toHaveBeenCalledWith({
        title: "Téma bola úspešne vytvorená.",
        description: "Zmeny sú uložené.",
        variant: "default",
      });
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/api/topic/create',
      {
        content: [''],
        createdBy: 1,
        title: 'Test Title',
        description: 'Test Description',
      },
    );
    expect(axios.post).toHaveBeenCalledWith(
      '/api/tests/post', 
      {
        topicId: 1,
        topicNumber: 1,
        questions: [{
          label: 'Question 1',
          answers: [
            { label: 'Answer 1', isRight: true, number: 0 },
            { label: 'Answer 2', isRight: false, number: 0 },
          ],
        }]
      }
    );
  });
});

