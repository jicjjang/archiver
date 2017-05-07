<template>
  <div id="sidebar-container" :class="panel">
    <header class="ui inline dropdown">
      <h2 :class="panel"><i class="list layout icon"></i>TODO LIST</h2>
      <div class="menu" :class="panel">
        <router-link class="item todo" tag="div" :to="`/`">TODO LIST</router-link>
        <router-link class="item msg" tag="div" :to="`/album`">PHOTO ALBUM</router-link>
        <!-- <router-link class="item msg" tag="div" :to="`/message`">MESSAGE</router-link> -->
      </div>
    </header>
    <div class="container">
      <ul>
        <li><a class="ui empty circular label white"></a><span @click="setCategory({key: 'All', color: 'white', name: 'All'})" class="all">All</span></li>
        <li v-for="(sidebar, key) of sidebarList"><a :class="`ui empty circular label ${sidebar['color']}`"></a>
          <span @click="setCategory({key, color: sidebar['color'], name: sidebar['name']})">{{ sidebar['name'] }}</span><i class="remove icon" @click="deleteCategory(key)"></i></li>
      </ul>
      <div class="button-area">
        <button @click="showSliderAppendModal" class="ui grey inverted basic icon circular button">
          <i class="icon add"></i>
        </button>
      </div>
    </div>
    <app-sidebar-append-modal :panel="panel" :postPath="postPath" :categoryPath="categoryPath"></app-sidebar-append-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { db } from '../../firebase'
  import SidebarAppendModal from './SidebarAppendModal.vue'

  export default {
    props: ['panel', 'postPath', 'categoryPath'],
    components: {
      'appSidebarAppendModal': SidebarAppendModal
    },
    data: () => {
      return {
        sidebarList: null,
        postRef: null,
        categoryRef: null
      }
    },
    methods: {
      ...mapActions([
        'setCategory'
      ]),
      showSliderAppendModal() {
        $('#cat-modal').modal('show')
      },
      deleteCategory(key) {
        if (confirm('Are you sure? all posts will be removed!')) {
          const postRef = this.postRef
          postRef.orderByChild('category').equalTo(key).on('value', (snapshot) => {
            if (snapshot.val() !== null) {
              Object.keys(snapshot.val()).map((v) => {
                postRef.child(v).remove()
              })
            }
          })
          this.categoryRef.child(key).remove()
          this.setCategory({key: 'All', color: 'white', name: 'All'})
        }
      }
    },
    created() {
      this.postRef = db.ref(this.postPath)
      this.categoryRef = db.ref(this.categoryPath)
      this.categoryRef.on('value', (snapshot) => {
        this.sidebarList = snapshot.val()
      })
    },
    mounted() {
      $('#sidebar-container .ui.inline.dropdown').dropdown({
        transition: 'drop',
        onChange: function (val, text) {
          $('#sidebar-container h2').html(`<i class="list layout icon"></i>${text}`)
        }
      })
    }
  }
</script>

<style lang="css">
</style>
