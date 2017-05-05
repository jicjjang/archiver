<template>
  <article id="main-container">
    <app-sidebar :panel="`todo`"></app-sidebar>
    <app-todo></app-todo>
  </article>
</template>

<script>
import TodoPanel from './TodoPanel.vue'
import SidebarPanel from '../sidebar/SidebarPanel.vue'

export default {
  components: {
    'appTodo': TodoPanel,
    'appSidebar': SidebarPanel
  }
}
</script>

<style scoped>
</style>
