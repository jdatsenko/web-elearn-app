export interface TestResponse {
    id: number
    createdAt: string
    topicId: number
    questions: Question[]
  }
  
  export interface Question {
    id: number
    text: string
    testId: number
    answers: Answer[]
  }
  
  export interface Answer {
    id: number
    text: string
    isCorrect: boolean
    questionId: number
  }
  