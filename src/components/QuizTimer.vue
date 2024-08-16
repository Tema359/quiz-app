<template>
  <p class="text-lg font-semibold">Total time: {{ formattedTime }}</p>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useQuizStore } from '../store/useQuizStore';

const quizStore = useQuizStore();

const formattedTime = computed(() => quizStore.formattedTime);
</script>
