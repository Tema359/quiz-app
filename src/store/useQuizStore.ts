import { defineStore } from 'pinia';
import apiClient from "../services/api";
import { Question, QuestionResponse } from '../interfaces/question';

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  selectedAnswers: Record<number, string>;
  timeSpent: number[];
  previousResults: QuizResult[];
  timer: number;
  timerInterval: number | null | ReturnType<typeof setInterval>;
  errorMessage: string | null;
  isCorrectAnswerShown: boolean;
}

interface QuizResult {
  score: number;
  timeSpent: number[];
}

export const useQuizStore = defineStore('quiz', {
  state: (): QuizState => ({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswers: {},
    timeSpent: [],
    previousResults: [],
    timer: 0,
    timerInterval: null,
    errorMessage: null,
    isCorrectAnswerShown: false,
  }),
  actions: {
    async fetchQuestions(amount: number = 10) {
      this.errorMessage = null;
      try {
        const response = await apiClient.get<QuestionResponse>(`?amount=${amount}`);

        if (response.data.results.length === 0) {
          throw new Error('No questions were found. Please try again.');
        }

        const questions = response.data.results.map((q: any) => ({
          ...q,
          all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        }));

        this.questions = questions;
        this.timeSpent = new Array(questions.length).fill(0);
      } catch (error: any) {
        this.errorMessage = error.response?.data?.message || error.message || 'Failed to fetch questions.';
        console.error('Error fetching questions:', error);
      }
    },
    setTime(time: number) {
      this.timeSpent[this.currentQuestionIndex] = time;
    },
    startTimer() {
      this.timer = 0;
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      this.timerInterval = setInterval(() => {
        this.timer += 100;
      }, 100);
    },
    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      this.timeSpent[this.currentQuestionIndex] = this.timer / 1000;
    },
    selectAnswer(answer: string) {
      this.selectedAnswers[this.currentQuestionIndex] = answer;
    },
    setVisibilityCorrectAnswer() {
      this.isCorrectAnswerShown = !this.isCorrectAnswerShown;
    },
    navigateToQuestion(index: number) {
      this.stopTimer();
      this.currentQuestionIndex = index;
      this.startTimer();
      this.isCorrectAnswerShown = false;
    },
    calculateScore() {
      this.score = Object.entries(this.selectedAnswers).reduce((score, [index, answer]) => {
        const question = this.questions[Number(index)];
        return score + (answer === question.correct_answer ? 1 : 0);
      }, 0);
    },
    finishQuiz() {
      this.stopTimer();
      this.currentQuestionIndex++;
      this.calculateScore();
      this.previousResults.push({ score: this.score, timeSpent: [...this.timeSpent] });
    },
    resetQuiz() {
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.questions = [];
      this.selectedAnswers = {};
      this.timeSpent = [];
      this.timer = 0;
      this.isCorrectAnswerShown = false;
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
    },
  },
  getters: {
    currentQuestion: (state) => state.questions[state.currentQuestionIndex],
    isQuizFinished: (state) => state.currentQuestionIndex >= state.questions.length,
    formattedTime: (state) => {
      const totalSeconds = Math.floor(state.timer / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
  },
});
