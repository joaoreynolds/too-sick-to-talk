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
  padding: 10px 0;
}
ul {
  list-style: none;
  padding: 0;
}

li {
  border-top: 1px solid #EEEADE;
  padding: 6px 12px;
}
li:first-child:not(.new-statement){
  border-top: 0px;
}

li .date{
  color: #CBCBCB;
  font-size: .7em;
  line-height: 1em;
  margin-bottom: 5px;
}

li .msg{
  line-height: 1em;
}

.playback-btn{
  color: #D4EED7;
}
.playback-btn:hover, .playback-btn:focus{
  color: #00AE12;
}

.new-statement{
  display: flex;
  padding: 6px 12px;
  border: 2px solid #AAA9A8;
  border-radius: 3px;
  margin-top: 5px;
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
.new-statement .processing-label{
  font-size: .7em;
  line-height: 36px;
}

@media screen and (min-width: 576px) {
  .statements {
    font-size: 1.5em;
  }
}
</style>
