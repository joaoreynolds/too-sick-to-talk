<template>
  <div class="statements">
    <statements-header :onClearAll="handleClearAll" :statementCount="statements.length" :voice="voice" :onChangeVoice="handleChangeVoice"></statements-header>
    <div class="container-fluid">
      <ul>
        <single-statement v-for="statement in statements" :statement="statement"></single-statement>
        <new-statement :onRead="handleNewStatement" :voice="voice"></new-statement>
      </ul>
    </div>
  </div>
</template>

<script>
import SingleStatement from './SingleStatement'
import NewStatement from './NewStatement'
import StatementsHeader from './StatementsHeader'
import moment from 'moment'

export default {
  name: 'statements',
  data () {
    return {
      // statements: [{date: moment(), msg: 'first statement', audioUrl: xxx}, {date: moment(), msg: 'Second one'}]
      statements: [],
      voice: 'Brian'
    }
  },
  components: {
    SingleStatement,
    NewStatement,
    StatementsHeader
  },
  methods: {
    /**
     * Adds this new message to our array of messages
     * @param  {string} message
     * @param  {string} url     Url generated for our audio file for this message.
     */
    handleNewStatement: function (message, url) {
      const newStatement = {date: moment(), msg: message, audioUrl: url}
      this.statements = [...this.statements, newStatement]
    },
    handleClearAll: function () {
      this.statements = []
    },
    handleChangeVoice: function (voice) {
      this.voice = voice
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.statements{
  font-size: 1.5em;
}
.clear-btn{
  margin-bottom: 10px;
}
ul {
  list-style: none;
  padding: 0;
}

li {
  border-top: 1px solid #EEEADE;
  padding: 6px 12px;
}

.new-statement{
  display: flex;
  padding: 6px 12px;
  border: 2px solid #D7D7D7;
  border-radius: 3px;
  margin-top: 10px;
}
.new-statement.isWorking{
  border-color: #00AE12;
  background-color: #F4FFF6;
}
.new-statement .message-input{
  flex: 1 0 auto;
  border: 0px;
  background: transparent;
}
.new-statement .message-input:focus{
  outline: 0px;
  border: 0px;
}
</style>
