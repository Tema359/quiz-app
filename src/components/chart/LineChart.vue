<template>
  <div>
    <Line
      :data="data"
      :options="chartOptions"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Line } from 'vue-chartjs';
import { chartOptions } from '../../utils/chartOptions';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

defineProps<{
  data: any;
}>();
</script>
