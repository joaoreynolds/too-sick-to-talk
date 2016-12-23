<template>
  <header class="statements-header">
    <div class="container-fluid">
      <h3>Too sick to talk? Find your voice by typing below. Hit enter to speak.</h3>
      <div class="form-inline">
        <label for="voice" class="voice-label">Voice:</label>
        <select class="form-control form-control-sm" name="voice" v-model="myVoice">
          <option v-for="voiceOption in voiceOptions" v-bind:value="voiceOption">{{voiceOption}}</option>
        </select>
        <button type="button" class="btn btn-sm btn-danger clear-btn" v-on:click="onClearAll" v-if="statementCount > 0">
          Clear All Messages
          <span>({{statementCount}})</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'statements-header',
  props: ['onClearAll', 'statementCount', 'voice', 'onChangeVoice'],
  data () {
    return {
      myVoice: this.voice,
      voiceOptions: [
        'Geraint',
        'Nicole',
        'Russell',
        'Amy',
        'Brian',
        'Emma',
        'Ivy',
        'Joanna',
        'Joey',
        'Justin',
        'Kendra',
        'Kimberly',
        'Salli'
      ]
    }
  },
  watch: {
    myVoice: function(val, oldVal){
      this.onChangeVoice(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .statements-header{
    position: fixed;
    padding: 15px 0;
    top: 0px;
    left: 0px;
    right: 0px;
    background: #564C30;
    color: #ffffff;
  }

  .voice-label{
    font-size: .8em;
  }

  h3{
    font-weight: normal;
    display: none;
  }

  @media screen and (min-width: 576px) {
    .statements-header {
      height: 110px;
    }
  }

  @media screen and (min-width: 768px) {
    h3{
      display: block;
    }
  }
</style>
