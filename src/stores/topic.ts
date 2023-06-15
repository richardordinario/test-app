import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface ITopic {
  name: string;
  guid: string;
  comments: IComment[]
} 

export interface IComment {
  comment: string;
  date: string;
  by: string;
}

export interface IDataPaginate {
  data: ITopic[],
  total: number;
  currentPage: number | 0;
  lastPage: number | 0;
}

export const useTopicStore = defineStore('topic', () => {
  const topics = ref<IDataPaginate>({
    data: [],
    total: 0,
    currentPage: 0,
    lastPage: 0,
  })

  const localData = () => JSON.parse(localStorage.getItem('test-data')!);

  const getTopics = (page=1, perPage=20) => {
    const data = localData()
    const start  =  (page - 1) * perPage;
    const end  =  start + perPage;

    const paginated = data.slice(start, end)
    topics.value.data = paginated;
    topics.value.total = data.length
    topics.value.currentPage = page
    topics.value.lastPage = Math.ceil(data.length / perPage)
  }

  const addTopic = (topic: ITopic) => {
    const data = localData()
    data.unshift(topic)
    localStorage.setItem('test-data', JSON.stringify(data))
  }

  const deleteTopic = (guid: string) => {
    const data = localData()
    const filtered = data.filter((item: ITopic) => item.guid !== guid)
    localStorage.setItem('test-data', JSON.stringify(filtered))
  }

  const updateTopic = (item: ITopic) => {
    const data = localData()
    data.forEach((element: ITopic) => {
      if(element.guid === item.guid) {
        element.name = item.name
        console.log(element);
      }
    });
    localStorage.setItem('test-data', JSON.stringify(data))
  }

  const addComment = (item: ITopic, comment: IComment) => {
    const data = localData()
    data.forEach((element: ITopic) => {
      if(element.guid === item.guid) {
        element.comments.unshift(comment)
      }
    });
    localStorage.setItem('test-data', JSON.stringify(data))
  }

  const deleteComment = (index: number, topic: ITopic) => {
    const data = localData()
    data.forEach((element: ITopic) => {
      if(element.guid === topic.guid) {
        element.comments.splice(index, 1)
      }
    });
    localStorage.setItem('test-data', JSON.stringify(data))
  }

  const updateComment = (comment:string, index: number, topic: ITopic) => {
    const data = localData()
    data.forEach((element: ITopic) => {
      if(element.guid === topic.guid) {
        element.comments[index].comment = comment
      }
    });
    localStorage.setItem('test-data', JSON.stringify(data))
  }

  return { 
    topics, 
    getTopics,
    addTopic,
    deleteTopic,
    updateTopic,
    addComment,
    deleteComment,
    updateComment
  }
})
