<script setup lang="ts">
import { useTopicStore} from '@/stores/topic.ts'
import type { ITopic, IComment } from '@/stores/topic.ts'
import Header from '@/components/Header.vue'
import Paginate from '@/components/Paginate.vue';
import PostCard from '@/components/PostCard.vue';
import { ref, onMounted, unref } from 'vue'
import { storeToRefs } from 'pinia';
import Helper from '@/helpers'
import moment from 'moment'

const topic = ref<ITopic>({
  name: '',
  guid: '',
  comments: [],
})

const isLoading = ref<boolean>(false)
const page = ref<number>(1)
const topicStore = useTopicStore()
const { topics } = storeToRefs(topicStore)

onMounted(() => fetchTopics())

const fetchTopics = () => {
  isLoading.value = true
  topicStore.getTopics(page.value)
  setTimeout(() => {
    isLoading.value = false
  }, 500);
}

const add = (e: KeyboardEvent):void => {
  if(!e.shiftKey) {
    e.preventDefault();
    topic.value.guid = Helper.generateRandomString(8)
    topicStore.addTopic(unref(topic))
    page.value = 1
    topicStore.getTopics(page.value)
    topic.value.name = ''
    return
  }
}

const next = () => {
  if(unref(page) === unref(topics).lastPage) return
  page.value = page.value + 1;
  fetchTopics()
}

const prev = () => {
  if(unref(page) > 1) {
    page.value = unref(page) - 1;
    fetchTopics()
  }
}

const removeTopic = (id: string) => {
  topicStore.deleteTopic(id)
  topicStore.getTopics(page.value)
}

const updateTopic = (content: string, item: ITopic) => {
  item.name = content
  topicStore.updateTopic(item)
  topicStore.getTopics(page.value)
}

const submitComment = (comment: string, item: ITopic) => {
  const post: IComment = {
    comment: comment,
    date: new Date().toISOString(),
    by: Helper.generateRandomString(2), //
  }
  topicStore.addComment(item, post)
  topicStore.getTopics(page.value)
  // fetchTopics()
}

const removeComment = (index: number, topic: ITopic) => {
  topicStore.deleteComment(index, topic)
  topicStore.getTopics(page.value)
}

const updateComment = (comment:string, index: number, topic: ITopic) => {
  topicStore.updateComment(comment, index, topic)
  topicStore.getTopics(page.value)
}

</script>

<template>
  <main class=" tw-h-screen tw-flex tw-p-5 tw-mb-10 tw-justify-center">
    <div class=" tw-container tw-p-5" >
      <div class=" tw-text-sm tw-text-gray-400">Post a topic</div>
      <textarea rows="2" v-model="topic.name" type="text" @keydown.enter="add" class=" tw-rounded tw-px-3 tw-py-2 tw-bg-gray-100 tw-text-gray-600 tw-w-full focus:tw-outline-none focus:tw-border-gray-300 focus:tw-border"/>
      <div class=" tw-text-right tw-text-sm tw-text-gray-500">Press enter to save</div>

      <div class="" v-if="!isLoading">
        <Paginate 
          @prev="prev" 
          @next="next" 
          :data="topics.data"
          :total="topics.total"
          :currentPage="topics.currentPage"
          :lastPage="topics.lastPage"
        />

        <div class=" tw-p-5 tw-border tw-rounded tw-shadow-sm tw-border-gray-100 tw-my-5" v-for="item in topics.data" :key="item.guid">
          <PostCard @remove="removeTopic" :commentable="true" @comment="submitComment($event, item)" @update="updateTopic($event, item)" :name="item.name" :comments="item.comments" :guid="item.guid">
            <template v-slot:body>
              <div class=" tw-w-full tw-h-[2px] tw-my-7 tw-bg-gray-100"></div>
              <div class=" tw-my-5" v-for="(comment, i) in item.comments" :key="i">
                <PostCard :name="comment.comment" :comments=[] @remove="removeComment(i, item)" @update="updateComment($event, i, item)" :guid="comment.by">
                  <template v-slot:body>
                    <div class=" tw-text-sm tw-text-gray-400">{{ moment(comment.date).fromNow() }}</div>
                  </template>
                </PostCard>
              </div>
            </template>
          </PostCard>
        </div>

        <Paginate 
          @prev="prev" 
          @next="next" 
          :data="topics.data"
          :total="topics.total"
          :currentPage="topics.currentPage"
          :lastPage="topics.lastPage"
        />
      </div>
      <div class="" v-else>Loading data...</div>
    </div>
    
  </main>
</template>
