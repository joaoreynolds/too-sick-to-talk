<template>
  <div id="app">
    <div class="container-fluid">
      <conversation></conversation>
    </div>
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
  margin-top: 30px;
}
</style>
