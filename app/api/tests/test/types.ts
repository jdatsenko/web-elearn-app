export interface TestRequest {
    topicId: number;
    topicNumber: number;
    questions: Question[];
  }
  
  export interface Question {
    label: string;
    answers: Answer[];
  }
  
  export interface Answer {
    label: string;
    isRight: boolean;
    number: number;
  }
  