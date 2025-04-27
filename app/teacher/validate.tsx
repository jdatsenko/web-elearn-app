export interface Question {
    label: string;
    answers: Answer[];
  }
  
  export interface Answer {
    label: string;
    isRight: boolean;
    number: number;
  }
  
  export interface Topic {
    title?: string;
    description?: string;
    content?: string[];
  }
  
  export const validate = (
    topicData: Topic,
    questions: Question[]
  ) => {
    if (!topicData.title || topicData.title.trim() === "") {
      return "Názov témy nemôže byť prázdny";
    } else if (!topicData.description || topicData.description.trim() === "") {
      return "Popis témy nemôže byť prázdny";
    } else if (!topicData.content || topicData.content.length === 0 || topicData.content.every((c) => c.trim() === "")) {
      return "Obsah témy nemôže byť prázdny";
    }
  
    if (questions.length === 0) {
      return "Zadajte aspoň jednu otázku";
    } else if (questions.some((q) => q.label.trim() === "")) {
      return "Otázky nemôžu byť prázdne";
    } else if (questions.some((q) => !q.answers.some((a) => a.isRight))) {
      return "Každá otázka musí obsahovať aspoň jednu správnu odpoveď";
    } else if (questions.some((q) => q.answers.some((a) => a.label.trim() === ""))) {
      return "Odpovede nemôžu byť prázdne";
    } else if (questions.some((q) => q.answers.length < 2)) {
      return `Otázka musí mať aspoň 2 odpovede`;
    }
  
    return null;  // No errors
  };
  