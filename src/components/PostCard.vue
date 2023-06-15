<script lang="ts" setup>
import type { ITopic } from '@/stores/topic.ts';
import { ref, unref } from 'vue';
const props = defineProps<ITopic & {
  commentable?: Boolean,
}>()
const emit = defineEmits()
const update = ref<boolean>(false)
const content = ref<string>(props.name)
const comment = ref<string>('')

const submit = () => {
  emit('update', unref(content))
  update.value = false
}

const submitComment = () => {
  emit('comment', unref(comment))
  comment.value = ''
}

</script>
<template>
  <div class=" tw-mb-3 tw-flex tw-items-start tw-gap-4">
    <div class=" tw-rounded-full tw-h-[40px] tw-flex tw-items-center tw-justify-center tw-w-[40px] tw-bg-gray-100"> 
      {{ props.guid.substring(0,2) }}
    </div>
    <div class=" tw-flex-1">
      <div class=" tw-mb-3" v-if="!update">{{ props.name }}</div>
      <textarea rows="1" v-else v-model="content" type="text" @keydown.enter="submit" class=" tw-rounded tw-px-3 tw-py-2 tw-bg-gray-100 tw-text-gray-600 tw-w-full focus:tw-outline-none focus:tw-border-gray-300 focus:tw-border"/>
      <div class=" tw-flex tw-items-center tw-justify-between tw-mb-5">
        <div class=" tw-flex tw-items-center tw-gap-4">
          <button @click="update=!update" class=" tw-text-sm tw-text-gray-400">{{ update ? 'Cancel' : 'Edit'  }}</button>
          <button :disabled="update" @click="emit('remove', props.guid)" class=" tw-text-sm tw-text-gray-400">Delete</button>
        </div>
        <div class=" tw-text-sm tw-text-gray-400">{{ props.comments.length > 0 ? `${props.comments.length} comments` : 'no comment'  }}</div>
      </div>
      <div class="" v-if="props.commentable">
        <div class=" tw-text-sm tw-text-gray-400 -tw-mb-2">Write comment</div>
        <textarea rows="1" type="text" @keydown.enter.prevent="submitComment" v-model="comment" class=" tw-my-2 tw-rounded tw-px-3 tw-py-2 tw-bg-gray-100 tw-text-gray-600 tw-w-full focus:tw-outline-none focus:tw-border-gray-300 focus:tw-border"/>
        <div class=" tw-text-right tw-text-sm tw-text-gray-500">Press enter to save</div>
      </div>
      <slot name="body"/>
    </div>
  </div>
</template>