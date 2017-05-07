<template>
  <article id="main-container">
    <app-sidebar
      :panel="`album`"
      :postPath="'albumlist/album/'"
      :categoryPath="'albumlist/sidebar/'"></app-sidebar>
    <app-album></app-album>
  </article>
</template>

<script>
import AlbumPanel from './AlbumPanel.vue'
import SidebarPanel from '../sidebar/SidebarPanel.vue'

export default {
  components: {
    'appAlbum': AlbumPanel,
    'appSidebar': SidebarPanel
  }
}
</script>

<style scoped>
</style>
