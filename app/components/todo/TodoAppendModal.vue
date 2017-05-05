<template>
  <div id="todo-modal" class="ui modal">
    <i class="close icon"></i>
    <div class="header">
      Add a new todo
    </div>
    <div class="content">
      <form class="ui form">
        <div class="field">
          <label>Todo Title</label>
          <input v-model="todoTitle" type="text" placeholder="Enter a title for your todo...">
        </div>
        <div class="field">
          <label>Todo Contents</label>
          <textarea v-model="todoContents" placeholder="Enter a Contents for your todo..."></textarea>
        </div>
        <div class="field">
          <label>Todo category</label>
          <select v-model="todoCategory" class="ui simple dropdown">
            <option value="">Select a category</option>
            <template v-for="todo in todoCategoryList">
              <option :value="todo['.key']" :selected="todoCategory === todo['name']? 'selected': ''">{{ todo['name'] }}</option>
            </template>
          </select>
        </div>
      </form>
    </div>
    <div class="actions">
      <div @click="addTodo" class="ui inverted orange button">Add</div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { db } from '../../firebase'

  export default {
    props: ['postInfo'],
    firebase: {
      todoCategoryList: db.ref('todolist/sidebar/')
    },
    data: () => {
      return {
        todoListRef: db.ref('todolist/todo/'),
        todoTitle: '',
        todoContents: '',
        todoCategory: '',
        todoKey: ''
      }
    },
    watch: {
      postInfo: {
        handler: 'updatePostInfo'
      }
    },
    methods: {
      addTodo () {
        if (!this.todoTitle || !this.todoContents || !this.todoCategory) {
          return alert('Please insert all fileds')
        }
        const key = this.todoKey? this.todoKey: this.todoListRef.push().key
        let updates = {}
        updates[key] = {
          title: this.todoTitle,
          contents: this.todoContents,
          category: this.todoCategory
        }
        this.todoListRef.update(updates)

        this.todoKey = ''
        this.todoTitle = ''
        this.todoContents = ''
        this.todoCategory = ''
        $('#todo-modal').modal('hide')
      },
      updatePostInfo(val) {
        this.todoKey = val.key
        this.todoTitle = val.title
        this.todoContents = val.contents
        this.todoCategory = val.category
      }
    }
  }
</script>
