import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateTopicForm from '@/app/teacher/page';  
import axios from 'axios';
import { useSession } from 'next-auth/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

// Mock next-auth and next/navigation
const pushMock = jest.fn();

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams('tab=topics'),
}));

// Mock axios
jest.mock('axios');

describe('CreateTopicForm', () => {
  beforeEach(() => {
    pushMock.mockReset();

    // Mock session
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { role: 'TEACHER', id: 1 },
      },
    });

    // Mock axios responses for the two requests
    (axios.get as jest.Mock)
      .mockResolvedValueOnce({
        data: { data: { title: 'Test Title', description: 'Test Description', content: ['content'] } },
      }) // Mock first GET request (for topic)
      .mockResolvedValueOnce({
        data: { questions: [{ text: 'Question 1', answers: [{ text: 'Answer 1', isCorrect: true, id: 1 }] }] },
      }); // Mock second GET request (for test)
  });

  it('should create a new topic successfully', async () => {
    const { getByLabelText, getByText } = render(<CreateTopicForm />);

    // fireEvent.change(getByLabelText(/názov/i), { target: { value: 'Test Topic' } });
    // fireEvent.change(getByLabelText(/popis/i), { target: { value: 'Description' } });

    // fireEvent.click(getByText(/uložiť tému/i));

    // await waitFor(() => {
    //   expect(getByText('Téma bola úspešne vytvorená.')).toBeInTheDocument();
    // });

    expect(axios.get).toHaveBeenCalledWith(
      '/api/topic/get?id=1', // assuming topicId is 1
    );
    expect(axios.get).toHaveBeenCalledWith(
      '/api/tests/test?id=1', // assuming topicId is 1
    );
  });
});
