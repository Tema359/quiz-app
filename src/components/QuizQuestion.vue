<template>
  <h2
    class="text-2xl font-bold mt-8 mb-4"
    v-html="question.question"
  ></h2>
  <div class="grid gap-2">
    <QuizButton
      v-for="(answer, index) in question.all_answers"
      :key="index"
      variant="question"
      :class="getButtonClass(answer)"
      @click="selectAnswer(answer)"
    >
      {{ answer }}
    </QuizButton>
  </div>
  <div class="flex justify-between mt-4">
    <QuizButton
      @click="goToPreviousQuestion"
      :disabled="isFirstQuestion"
      variant="ghost"
    >
      Previous
    </QuizButton>
    <QuizButton
      @click="goToNextQuestion"
      :disabled="!isAnswerSelected"
    >
      {{ isLastQuestion ? 'Finish' : 'Next' }}
    </QuizButton>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useQuizStore } from '../store/useQuizStore';
import QuizButton from './ui/buttons/QuizButton.vue';

const quizStore = useQuizStore();
const question = computed(() => quizStore.currentQuestion);
const currentQuestionIndex = computed(() => quizStore.currentQuestionIndex);
const totalQuestions = computed(() => quizStore.questions.length);
const selectedAnswer = computed(() => quizStore.selectedAnswers[currentQuestionIndex.value]);
const isFirstQuestion = computed(() => currentQuestionIndex.value === 0);
const isLastQuestion = computed(() => currentQuestionIndex.value === totalQuestions.value - 1);
const isAnswerSelected = computed(() => !!selectedAnswer.value);

const selectAnswer = (answer: string) => {
  quizStore.selectAnswer(answer);
};

const goToPreviousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    quizStore.navigateToQuestion(currentQuestionIndex.value - 1);
  }
};

const goToNextQuestion = () => {
  if (isLastQuestion.value) {
    quizStore.finishQuiz();
  } else {
    quizStore.navigateToQuestion(currentQuestionIndex.value + 1);
  }
};

const getButtonClass = (answer: string) => {
  return {
    'bg-amber-600 border-yellow-300 text-black': answer === selectedAnswer.value,
    'border-sky-400': answer !== selectedAnswer.value,
    'hover:border-yellow-300': answer !== selectedAnswer.value,
  };
};
</script>
