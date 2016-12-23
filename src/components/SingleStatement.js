import Vue from 'vue'
import {Howl} from 'howler'

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

      var sound = new Howl({
        src: [statement.audioUrl],
        format: ['mp3'],
        volume: 1
      })
      sound.play()
    }
  }
})
