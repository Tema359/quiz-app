<template>
  <div class="w-full bg-gray-200 rounded-full h-4">
    <div
      :style="{ width: progress + '%' }"
      class="bg-sky-500 h-4 rounded-full"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  progress: number;
}>();
</script>
