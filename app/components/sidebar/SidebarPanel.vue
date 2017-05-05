<template>
  <div id="sidebar-container">
    <header class="ui inline dropdown">
      <h2><i class="list layout icon"></i>TODO LIST</h2>
      <div class="menu">
        <router-link class="item todo" tag="div" :to="`/`">TODO LIST</router-link>
        <router-link class="item msg" tag="div" :to="`/message`">MESSAGE</router-link>
      </div>
    </header>
    <div class="container">
      <ul>
        <li><a class="ui empty circular label white"></a><span @click="setCategory('All')" class="all">All</span></li>
        <li v-for="sidebar of sidebarList"><a :class="`ui empty circular label ${sidebar['color']}`"></a>
          <span @click="setCategory(sidebar['.key'])">{{ sidebar['name'] }}</span><i class="remove icon" @click="deleteCategory(sidebar['.key'])"></i></li>
      </ul>
      <div class="button-area">
        <button @click="showSliderAppendModal" class="ui grey inverted basic icon circular button">
          <i class="icon add"></i>
        </button>
      </div>
    </div>
    <app-sidebar-append-modal :panel="panel"></app-sidebar-append-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { db } from '../../firebase'
  import SidebarAppendModal from './SidebarAppendModal.vue'

  export default {
    props: ['panel'],
    components: {
      'appSidebarAppendModal': SidebarAppendModal
    },
    data: () => {
      return {
        sidebarList: null
      }
    },
    firebase: {
      todoCategoryList: db.ref('todolist/sidebar/'),
      messageCategoryList: db.ref('messagelist/sidebar/'),
    },
    methods: {
      ...mapActions([
        'setCategory'
      ]),
      showSliderAppendModal() {
        $('#cat-modal').modal('show')
      },
      deleteCategory(key) {
        db.ref('todolist/sidebar/' + key).remove()
      }
    },
    created() {
      if (this.panel === 'todo') {
        this.sidebarList = this.todoCategoryList
      } else if (this.panel === 'msg') {
        this.sidebarList = this.messageCategoryList
      }
    },
    mounted() {
      $('#sidebar-container .ui.inline.dropdown').dropdown({
        onChange: function (val, text) {
          $('#sidebar-container h2').html(`<i class="list layout icon"></i>${text}`)
        }
      })
    }
  }
</script>

<style lang="css">
</style>
