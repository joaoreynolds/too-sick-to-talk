import Vue from 'vue'

export default Vue.component('single-statement', {
  props: ['statement'],
  template: `<li>
    <div v-if="statement.date" class="date small text-muted">{{statement.date ? statement.date.format('LTS') : ''}}</div>
    <div class="msg">
      {{statement.msg}}
      <a href="#" v-on:click="replayAudio(statement, $event)"><i class="fi-play-circle"></i></a>\
    </div>
  </li>`,
  methods: {
    replayAudio: (statement, e) => {
      e.preventDefault()
      const audioElement = document.getElementById('audio-elem')
      audioElement.src = statement.audioUrl
      audioElement.play()
    }
  }
})
