<template>
  <div id="app">
    <conversation></conversation>
  </div>
</template>

<script>
import Conversation from './components/Conversation'

export default {
  name: 'app',
  components: {
    Conversation
  }
}
</script>

<style>
#app {
  padding-top: 100px;
  position: relative;
  color: #575757;
}
</style>
