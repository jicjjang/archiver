<template>
  <div id="todo-container">
    <div class="category">
      <a :class="`ui empty circular label ${getCategory.color}`"></a><span>{{ getCategory.name }}</span>
    </div>
    <div class="ul">
      <div class="li" v-for="todo of filteredTodoList" @click="addChoice">
        <div class="icons">
          <i class="write icon" @click.stop.prevent="modifyPost(todo['.key'], todo['title'], todo['contents'], todo['category'])"></i>
          <i class="remove icon" @click.stop.prevent="deletePost(todo['.key'])"></i>
        </div>
        <div class="title">{{ todo['title'] }}</div>
        <div class="contents">- {{ todo['contents'] }}</div>
      </div>
    </div>
    <div class="button-area">
      <button @click="showTodoAppendModal" class="ui grey inverted basic icon circular button">
        <i class="icon add"></i>
      </button>
    </div>
    <app-todo-append-modal :postInfo="postInfo"></app-todo-append-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '../../firebase'
import TodoAppendModal from './TodoAppendModal.vue'

export default {
  firebase: {
    todoList: db.ref('todolist/todo/')
  },
  components: {
    'appTodoAppendModal': TodoAppendModal
  },
  data: () => {
    return {
      postInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'getCategory'
    ]),
    filteredTodoList() {
      return this.todoList.filter((todo) => {
        return (this.getCategory.key === 'All' || (this.getCategory.key === todo.category))? true: false
      })
    }
  },
  methods: {
    addChoice(e) {
      const target = $(e.target).hasClass('li')? $(e.target): $(e.target).parents('.li')

      if ($('div.li.choice').length > 0 && (target[0] === $('div.li.choice')[0])) {
        $('div.li').removeClass('choice')
      } else {
        $('div.li').removeClass('choice')
        target.addClass('choice')
      }
    },
    showTodoAppendModal() {
      $('#todo-modal').modal('show')
    },
    modifyPost(key, title, contents, category) {
      this.postInfo = {
        key,
        title,
        contents,
        category
      }
      $('#todo-modal').modal('show')
    },
    deletePost(key) {
      if (confirm('Are you sure?')) {
        db.ref('todolist/todo/' + key).remove()
      }
    }
  }
}
</script>

<style lang="css">
</style>
