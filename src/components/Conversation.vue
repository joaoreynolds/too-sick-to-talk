<template>
  <div class="conversation">
    <h4>Lost your tonsils? Find your voice by typing below. Hit enter to speak.</h4>
    <statements></statements>
  </div>
</template>

<script>
import Statements from './Statements'

export default {
  name: 'conversation',
  components: {
    Statements
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
</style>
