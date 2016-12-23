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
  padding-top: 120px;
  position: relative;
  color: #575757;
}

@media screen and (min-width: 576px) {
  #app {
    padding-top: 110px;
  }
}
</style>
