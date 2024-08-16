import { setActivePinia, createPinia } from 'pinia';
import { useQuizStore } from '../store/useQuizStore';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

describe('useQuizStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes with default values', () => {
    const quizStore = useQuizStore();
    expect(quizStore.questions).toEqual([]);
    expect(quizStore.currentQuestionIndex).toBe(0);
    expect(quizStore.score).toBe(0);
    expect(quizStore.selectedAnswers).toEqual({});
    expect(quizStore.timeSpent).toEqual([]);
    expect(quizStore.previousResults).toEqual([]);
  });

  it('fetches questions from API', async () => {
    const mockQuestions = [
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What is the capital of France?',
        correct_answer: 'Paris',
        incorrect_answers: ['Madrid', 'Berlin', 'Rome'],
      },
      {
        type: 'multiple',
        difficulty: 'easy',
        category: 'Entertainment: Comics',
        question: 'This Marvel superhero is often called &quot;The man without fear&quot;.',
        correct_answer: 'Daredevil',
        incorrect_answers: ['Thor', 'Wolverine', 'Hulk'],
      },
    ];

    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        results: mockQuestions,
      },
    });

    const quizStore = useQuizStore();
    await quizStore.fetchQuestions(2);

    expect(axios.get).toHaveBeenCalledWith('https://opentdb.com/api.php?amount=2');
    expect(quizStore.questions.length).toBe(2);
    expect(quizStore.questions[0].question).toBe('What is the capital of France?');
  });

  it('selects an answer and updates selectedAnswers', () => {
    const quizStore = useQuizStore();
    quizStore.currentQuestionIndex = 0;
    quizStore.selectAnswer('Paris');
    expect(quizStore.selectedAnswers[0]).toBe('Paris');
  });

  it('calculates the score correctly', () => {
    const quizStore = useQuizStore();
    quizStore.questions = [
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What is the capital of France?',
        correct_answer: 'Paris',
        incorrect_answers: ['Madrid', 'Berlin', 'Rome'],
        all_answers: ['Paris', 'Madrid', 'Berlin', 'Rome'],
      },
      {
        type: 'multiple',
        difficulty: 'easy',
        category: 'Entertainment: Comics',
        question: 'This Marvel superhero is often called &quot;The man without fear&quot;.',
        correct_answer: 'Daredevil',
        incorrect_answers: ['Thor', 'Wolverine', 'Hulk'],
        all_answers: ['Daredevil', 'Thor', 'Wolverine', 'Hulk'],
      },
    ];
    quizStore.selectedAnswers = {
      0: 'Paris',
      1: 'Thor',
    };

    quizStore.calculateScore();
    expect(quizStore.score).toBe(1);
  });

  it('resets the quiz properly', () => {
    const quizStore = useQuizStore();
    quizStore.questions = [
      {
        type: 'multiple',
        difficulty: 'easy',
        category: 'Entertainment: Comics',
        question: 'This Marvel superhero is often called &quot;The man without fear&quot;.',
        correct_answer: 'Daredevil',
        incorrect_answers: ['Thor', 'Wolverine', 'Hulk'],
        all_answers: ['Daredevil', 'Thor', 'Wolverine', 'Hulk'],
      },
    ];
    quizStore.currentQuestionIndex = 1;
    quizStore.score = 1;
    quizStore.selectedAnswers = { 0: 'Daredevil' };
    quizStore.timeSpent = [5000];
    quizStore.previousResults = [{ score: 1, timeSpent: [5000] }];

    quizStore.resetQuiz();

    expect(quizStore.questions).toEqual([]);
    expect(quizStore.currentQuestionIndex).toBe(0);
    expect(quizStore.score).toBe(0);
    expect(quizStore.selectedAnswers).toEqual({});
    expect(quizStore.timeSpent).toEqual([]);
    expect(quizStore.previousResults).toEqual([{ score: 1, timeSpent: [5000] }]);
  });
});
