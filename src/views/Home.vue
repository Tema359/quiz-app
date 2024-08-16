<template>
  <div class="flex justify-center items-center h-screen">
    <QuizButton
      size="lg"
      @click="startQuiz"
    >
      Start Quiz
    </QuizButton>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useQuizStore } from '../store/useQuizStore';
import QuizButton from '../components/ui/buttons/QuizButton.vue';

const router = useRouter();
const quizStore = useQuizStore();

const startQuiz = async () => {
  await quizStore.fetchQuestions();
  quizStore.startTimer();
  router.push({ name: 'Quiz' });
};
</script>
