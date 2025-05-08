import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import TestPage from '@/app/test/[id]/page'; 
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import "@testing-library/jest-dom";

jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
  }));
  

const mockRouterPush = jest.fn();
const mockRouterBack = jest.fn();

describe('TestPage', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
        data: { user: { id: '123' } },
        status: 'authenticated',
        update: jest.fn(), 
      }),
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
      back: mockRouterBack,
    });
  });

  it('renders test, handles answer selection, and processes correct result', async () => {
    const mockTestData = {
      topic: { id: 1, title: 'Test Topic' },
      questions: [
        {
          id: 101,
          text: 'What is 2 + 2?',
          answers: [
            { id: 1, text: '3' },
            { id: 2, text: '4' },
          ],
        },
      ],
    };

    const mockResultData = {
      results: [{ id: 101, correct: true }],
      score: "100%",
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockTestData });
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockResultData });

    render(<TestPage params={{ id: '1' }} />);

    await waitFor(() => {
      expect(screen.getByText('Test Topic')).toBeInTheDocument();
    });

    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[1]); 

    const submitButton = screen.getByText('Odoslať test');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/api/user/test/submit", {
        answers: [{ questionId: 101, answer: 2, answerId: 2}],
        topicNumber: 1,
      });

      expect(mockRouterPush).toHaveBeenCalledWith('/topics/2');

      expect(useSession().update).toHaveBeenCalledWith({
        topicsCompleted: 1,
      });
    });
  });
});
