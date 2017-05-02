<template>
  <div id="sidebar-container">
    <header class="ui inline dropdown">
      <h2><i class="list layout icon"></i>TODO LIST</h2>
      <div class="menu">
        <router-link class="item todo-list active" tag="div" :to="`/`">TODO LIST</router-link>
        <router-link class="item message" tag="div" :to="`/message`">MESSAGE</router-link>
      </div>
    </header>
    <div class="container">
      <ul>
        <li v-for="sidebar of sidebarList">
          {{ sidebar['.value'] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'

export default {
  data: () => {
    return {
      sidebarList: null
    }
  },
  firebase: {
    todoSidebar: db.ref('todolist/sidebar/'),
    messageSidebar: db.ref('messagelist/sidebar/')
  },
  methods: {
  },
  mounted() {
    $('.ui.dropdown').dropdown({
      onChange: function (val, text) {
        $('#sidebar-container h2').html(`<i class="list layout icon"></i>${text}`)
      }
    })

    if ($('.menu > .item.todo-list').hasClass('active')) {
      this.sidebarList = this.todoSidebar
    } else {
      this.sidebarList = this.messageSidebar
    }
  }
}
</script>

<style lang="css">
</style>
