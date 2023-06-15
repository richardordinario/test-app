<script setup lang="ts">
import type { IDataPaginate } from '@/stores/topic.ts';
const props = defineProps<IDataPaginate>()
const emit = defineEmits(['prev', 'next'])

</script>
<template>
  <div class=" tw-flex tw-items-center tw-justify-between tw-my-7 tw-mx-2">
    <div class="">{{ `Page ${props.currentPage} of ${props.lastPage}` }}</div>
    <div class=" tw-flex tw-items-center tw-gap-4">
      <button @click="emit('prev')" class="" :disabled="props.currentPage === 1">Prev</button>
      <div class="">{{ props.currentPage }}</div>
      <button @click="emit('next')" class="" :disabled="props.currentPage === props.lastPage">Next</button>
    </div>
  </div>
</template>