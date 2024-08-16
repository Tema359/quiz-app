import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import QuizQuestion from '../components/QuizQuestion.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useQuizStore } from '../store/useQuizStore';

describe('QuizQuestion component', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders question and answers', async () => {
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
    ];
    quizStore.currentQuestionIndex = 0;

    const wrapper = mount(QuizQuestion);

    expect(wrapper.find('h2').text()).toBe('What is the capital of France?');
    const answerButtons = wrapper.findAll('.border-sky-400');

    expect(answerButtons.length).toBe(4);
    expect(answerButtons[0].text()).toBe('Paris');
    expect(answerButtons[1].text()).toBe('Madrid');
    expect(answerButtons[2].text()).toBe('Berlin');
    expect(answerButtons[3].text()).toBe('Rome');
  });

  it('selects an answer when a button is clicked', async () => {
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
    ];
    quizStore.currentQuestionIndex = 0;

    const wrapper = mount(QuizQuestion);

    const parisButton = wrapper.find('button');

    await parisButton.trigger('click');

    expect(quizStore.selectedAnswers[0]).toBe('Paris');
  });

  it('navigates to the next question when Next is clicked', async () => {
    const quizStore = useQuizStore();
    quizStore.questions = [
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question: 'Q1?',
        correct_answer: 'A1',
        incorrect_answers: ['B1', 'C1', 'D1'],
        all_answers: ['A1', 'B1', 'C1', 'D1'],
      },
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question: 'Q2?',
        correct_answer: 'A2',
        incorrect_answers: ['B2', 'C2', 'D2'],
        all_answers: ['A2', 'B2', 'C2', 'D2'],
      },
    ];
    quizStore.currentQuestionIndex = 0;

    const wrapper = mount(QuizQuestion);

    const firstAnswerButton = wrapper.find('.border-sky-400');
    await firstAnswerButton.trigger('click');

    const nextButton = wrapper.find('.bg-blue-500');
    
    await nextButton.trigger('click');

    expect(quizStore.currentQuestionIndex).toBe(1);
  });

  it('disables Next button if no answer is selected', async () => {
    const quizStore = useQuizStore();
    quizStore.questions = [
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question: 'Q1?',
        correct_answer: 'A1',
        incorrect_answers: ['B1', 'C1', 'D1'],
        all_answers: ['A1', 'B1', 'C1', 'D1'],
      },
    ];
    quizStore.currentQuestionIndex = 0;

    const wrapper = mount(QuizQuestion);

    const nextButton = wrapper.find('.bg-blue-500');

    expect(nextButton.attributes('disabled')).toBe('');
  });
});
