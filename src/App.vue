<script setup lang="ts">
import data from '@/db/data.json'
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
localStorage.theme = 'light'

onMounted(() => {
  if(localStorage.getItem('test-data') !== null) return
  localStorage.setItem('test-data', JSON.stringify(data.topics))
})

</script>

<template>
  <RouterView />
</template>
