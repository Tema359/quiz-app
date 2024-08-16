<template>
  <div>
    <Bar
      :data="data"
      :options="chartOptions"
    />
  </div>
</template>

<script lang="ts" setup>
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'vue-chartjs';
import { chartOptions } from '../../utils/chartOptions';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

defineProps<{
  data: any;
}>();
</script>
