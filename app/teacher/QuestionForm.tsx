import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question } from '@/app/types';

interface QuestionFormProps {
  question: Question;
  index: number;
  onChange: (updatedQuestion: Question) => void;
  onRemove: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  index,
  onChange,
  onRemove,
}) => {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...question,
      label: e.target.value,
    });
  };

  const handleAnswerChange = (
    answerIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedAnswers = [...question.answers];
    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      label: e.target.value,
    };
    onChange({
      ...question,
      answers: updatedAnswers,
    });
  };

  const handleRightAnswerChange = (answerIndex: number) => {
    const updatedAnswers = question.answers.map((answer, index) => ({
      ...answer,
      isRight: index === answerIndex,
    }));
    onChange({
      ...question,
      answers: updatedAnswers,
    });
  };

  const handleAddAnswer = () => {
    onChange({
      ...question,
      answers: [...question.answers, { label: "", isRight: false, number: 0 }],
    });
  };

  const handleRemoveAnswer = (answerIndex: number) => {
    const updatedAnswers = question.answers.filter((_, i) => i !== answerIndex);
    onChange({
      ...question,
      answers: updatedAnswers,
    });
  };

  return (
    <div className="my-4">
      <p className="inline-block px-2 py-2 bg-gray-500 mb-3 text-background rounded-lg shadow-md font-semibold">
        Otázka {index + 1}
      </p>
      <div className="flex">
        <span className="mr-1 flex items-center text-xl">{index + 1}.</span>
        <Input
          id="question"
          className="border border-gray-400"
          value={question.label}
          onChange={handleQuestionChange}
        />
      </div>
      <RadioGroup>
        {question.answers.map((answer, answerIndex) => (
          <div
            key={answerIndex}
            className="flex flex-row gap-4 align-center justify-center items-center"
          >
            <RadioGroupItem
              value={`answer-${answerIndex}`}
              checked={answer.isRight}
              onClick={() => handleRightAnswerChange(answerIndex)}
            />
            <Input
              className="border border-gray-400 mt-2"
              value={answer.label}
              onChange={(e) => handleAnswerChange(answerIndex, e)}
            />
            <Button
              className="mt-2"
              onClick={() => handleRemoveAnswer(answerIndex)}
            >
              Odstrániť
            </Button>
          </div>
        ))}
      </RadioGroup>
      <Button onClick={handleAddAnswer} className="mt-2 mr-2">
        Pridať odpoveď
      </Button>
      <Button onClick={onRemove} className="mt-2">
        Vymazať túto otázku
      </Button>
    </div>
  );
};

export default QuestionForm;
