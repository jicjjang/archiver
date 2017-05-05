import VueRouter from 'vue-router'

import TodoFrame from '../components/todo/TodoFrame.vue'
import MessageFrame from '../components/message/MessageFrame.vue'

export default new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '',
      name: 'todo',
      components: {
        default: TodoFrame
      }
    },
    {
      path: '/message',
      name: 'message',
      components: {
        default: MessageFrame
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
