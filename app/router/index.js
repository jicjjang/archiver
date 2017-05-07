import VueRouter from 'vue-router'

import TodoFrame from '../components/todo/TodoFrame.vue'
import MessageFrame from '../components/message/MessageFrame.vue'
import AlbumFrame from '../components/album/AlbumFrame.vue'

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
      path: '/album',
      name: 'album',
      components: {
        default: AlbumFrame
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
