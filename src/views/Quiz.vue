<template>
  <div class="flex flex-col justify-center items-center h-screen p-4">
    <div
      v-if="errorMessage"
      class="flex flex-col items-center"
    >
      <h2 class="text-red-500 mb-4">{{ errorMessage }}</h2>
      <QuizButton @click="$router.back()">Go back</QuizButton>
    </div>

    <div
      v-else-if="!isQuizFinished"
      class="w-full max-w-screen-md 2xl:max-w-screen-lg"
    >
      <div class="mb-6">
        <div class="md:flex justify-between">
          <QuizTimer />
          <QuizButton
            @click="showCorrectAnswer"
            variant="question"
            class="my-4 md:my-0"
          >
            Show Correct Answer
          </QuizButton>
        </div>
        <div
          v-if="isCorrectAnswerShown"
          class="my-4 text-green-600 font-bold"
        >
          Correct Answer: {{ correctAnswer }}
        </div>
      </div>
      <p class="text-right mb-4">Question {{ currentQuestionIndex + 1 }} of {{ totalQuestions }}</p>
      <ProgressBar :progress="progressPercentage" />
      <QuizQuestion />
    </div>

    <div
      v-else
      class="w-full max-w-screen-xl"
    >
      <QuizSummary />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useQuizStore } from '../store/useQuizStore';
import ProgressBar from '../components/ui/ProgressBar.vue';
import QuizQuestion from '../components/QuizQuestion.vue';
import QuizSummary from '../components/QuizSummary.vue';
import QuizTimer from '../components/QuizTimer.vue';
import QuizButton from '../components/ui/buttons/QuizButton.vue';

const quizStore = useQuizStore();
const isQuizFinished = computed(() => quizStore.isQuizFinished);
const currentQuestionIndex = computed(() => quizStore.currentQuestionIndex);
const totalQuestions = computed(() => quizStore.questions.length);
const progressPercentage = computed(() => (currentQuestionIndex.value / totalQuestions.value) * 100);
const errorMessage = computed(() => quizStore.errorMessage);

const isCorrectAnswerShown = computed(() => quizStore.isCorrectAnswerShown);
const correctAnswer = computed(() => quizStore.currentQuestion.correct_answer);

const showCorrectAnswer = () => {
  quizStore.setVisibilityCorrectAnswer();
};
</script>
