<template>
  <article id="main-container">
    <app-sidebar></app-sidebar>
    <app-todo></app-todo>
  </article>
</template>

<script>
import TodoPanel from './TodoPanel.vue'
import SidebarPanel from '../SidebarPanel.vue'

export default {
  components: {
    'appTodo': TodoPanel,
    'appSidebar': SidebarPanel
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
