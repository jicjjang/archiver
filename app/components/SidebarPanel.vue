<template>
  <div id="sidebar-container">
    <header class="ui inline dropdown">
      <h2><i class="list layout icon"></i>TODO LIST</h2>
      <div class="menu">
        <router-link class="item" tag="div" :to="`/`">TODO LIST</router-link>
        <router-link class="item" tag="div" :to="`/message`">MESSAGE</router-link>
      </div>
    </header>
    <div class="container">

    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
    }
  },
  methods: {
  },
  mounted() {
    $('.ui.dropdown').dropdown({
      onChange: function (val, text) {
        $('#sidebar-container h2').html(`<i class="list layout icon"></i>${text}`)
      }
    })
  }
}
</script>

<style lang="css">
</style>
