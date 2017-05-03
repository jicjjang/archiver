<template>
  <div id="cat-modal" class="ui modal">
    <i class="close icon"></i>
    <div class="header">
      Add a new category
    </div>
    <div class="content">
      <form class="ui form">
        <div class="field">
          <label>Category name</label>
          <input v-model="catName" type="text" placeholder="Enter a category name">
        </div>
        <div class="field">
          <label>Category color</label>
          <select v-model="catColor" class="ui simple dropdown">
            <option value="">Select a color</option>
            <option v-for="color in categoryColors"
              :value="color">
              {{ color }}
            </option>
          </select>
        </div>
      </form>
    </div>
    <div class="actions">
      <div class="ui orange inverted button" @click="addCategory">Save</div>
    </div>
  </div>
</template>

<script>
  import { db } from '../../firebase'

  export default {
    props: ["panel"],
    data () {
      return {
        sidebarRef: null,
        catName: '',
        catColor: '',
        categoryColors: ['red', 'orange', 'yellow', 'olive', 'green',
          'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']
      }
    },
    methods: {
      addCategory () {
        const key = this.sidebarRef.push().key
        let updates = {}
        updates[key + '/'] = {
          color: this.catColor,
          name: this.catName
        }
        this.sidebarRef.update(updates)

        this.catColor = ''
        this.catName = ''
        $('#cat-modal').modal('hide')
      }
    },
    created() {
      if (this.panel === 'todo') {
        this.sidebarRef = db.ref('todolist/sidebar/')
      } else if (this.panel === 'msg') {
        this.sidebarRef = db.ref('messagelist/sidebar/')
      }
    },
    mounted() {
      $('#cat-modal .ui.selection.dropdown').dropdown()
    }
  }
</script>
