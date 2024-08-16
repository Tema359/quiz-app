interface QuestionResponse {
  response_code: number;
  results: Question[];
}

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
}

export type { Question, QuestionResponse };
