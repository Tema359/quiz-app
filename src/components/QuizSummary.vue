<template>
  <h2 class="text-2xl text-center font-bold mb-8">Quiz Summary: {{ score }}/{{ totalQuestions }}</h2>

  <div class="xl:flex justify-between items-center mb-8">
    <div>
      <h3 class="text-xl font-semibold mb-4">Correct vs Incorrect Answers</h3>
      <BarChart :data="correctIncorrectChartData" />
    </div>

    <div>
      <h3 class="text-xl font-semibold mb-4">Time Spent on Each Question</h3>
      <BarChart :data="timeSpentChartData" />
    </div>

    <div>
      <h3 class="text-xl font-semibold mb-4">Previous Quiz Results</h3>
      <LineChart :data="previousResultsChartData" />
    </div>
  </div>
  <QuizButton
    variant="success"
    class="w-fit flex m-auto"
    @click="restartQuiz"
  >
    Restart Quiz
  </QuizButton>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '../store/useQuizStore';
import BarChart from '../components/chart/BarChart.vue';
import LineChart from '../components/chart/LineChart.vue';
import QuizButton from './ui/buttons/QuizButton.vue';

const router = useRouter();
const quizStore = useQuizStore();

const score = quizStore.score;
const totalQuestions = quizStore.questions.length;

const correctIncorrectChartData = computed(() => {
  const correct = Object.values(quizStore.selectedAnswers).filter(
    (answer, index) => answer === quizStore.questions[index].correct_answer
  ).length;
  const incorrect = quizStore.questions.length - correct;

  return {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        label: 'Answers',
        data: [correct, incorrect],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };
});

const timeSpentChartData = computed(() => {
  return {
    labels: quizStore.questions.map((_, index) => `Q${index + 1}`),
    datasets: [
      {
        label: 'Time Spent (s)',
        data: quizStore.timeSpent,
        backgroundColor: '#2196F3',
      },
    ],
  };
});

const previousResultsChartData = computed(() => {
  return {
    labels: quizStore.previousResults.map((_, index) => `Quiz ${index + 1}`),
    datasets: [
      {
        label: 'Scores',
        data: quizStore.previousResults.map((result) => result.score),
        borderColor: '#4CAF50',
        fill: false,
      },
      {
        label: 'Time Spent (ms)',
        data: quizStore.previousResults.map((result) => result.timeSpent.reduce((a, b) => a + b, 0)),
        borderColor: '#2196F3',
        fill: false,
      },
    ],
  };
});

const restartQuiz = () => {
  quizStore.resetQuiz();
  router.push({ name: 'Home' });
};
</script>
