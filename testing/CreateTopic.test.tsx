import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateTopicForm from '@/app/teacher/page';  
import axios from 'axios';
import { useSession } from 'next-auth/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { act } from 'react';

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
  useSearchParams: () => new URLSearchParams(''),
}));

// Mock axios
jest.mock('axios');

// jest.mock('@ckeditor/ckeditor5-react', () => ({
//   CKEditor: () => <div data-testid="ckeditor" />,
// }));

jest.mock('next/dynamic', () => () => (props) => <div {...props} />);

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
    (axios.post as jest.Mock).mockResolvedValueOnce({
        data: { 
          topic: {
            id: 1,
            topicNumber: 1,
          }
        },
      }) // Mock first GET request (for topic)
      .mockResolvedValueOnce({
        data: { questions: [{ text: 'Question 1', answers: [{ text: 'Answer 1', isCorrect: true, id: 1 }] }] },
      }); // Mock second GET request (for test)
  });

  it('should create a new topic successfully', async () => {
    const { getByLabelText, getByText, getByRole, getAllByRole, debug, container } = render(<CreateTopicForm />);

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
      expect(getByText('Téma bola úspešne vytvorená.')).toBeInTheDocument();
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
      '/api/tests/test', 
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
