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
          <select v-model="catColor" class="ui selection dropdown">
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
    props: ['panel', 'postPath', 'categoryPath'],
    data () {
      return {
        categoryRef: null,
        catName: '',
        catColor: '',
        categoryColors: ['red', 'orange', 'yellow', 'olive', 'green',
          'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']
      }
    },
    methods: {
      addCategory () {
        const key = this.categoryRef.push().key
        let updates = {}
        updates[key] = {
          color: this.catColor,
          name: this.catName
        }
        this.categoryRef.update(updates)

        this.catColor = ''
        this.catName = ''
        $('#cat-modal').modal('hide')
      }
    },
    created() {
      this.categoryRef = db.ref(this.categoryPath)
    },
    mounted() {
      $('#cat-modal .ui.selection.dropdown').dropdown()
    }
  }
</script>
