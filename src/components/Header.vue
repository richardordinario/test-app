<script setup lang="ts">

defineProps({
  title: {
    type: String,
    default: ""
  }
})
</script>
<template>
   <div class=" tw-text-lg tw-font-bold tw-text-center tw-text-gray-600">
      {{ title }}
   </div>
</template>