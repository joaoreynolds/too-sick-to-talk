
import Vue from 'vue'
import AWS from 'aws-sdk/global'
import Polly from 'aws-sdk/clients/polly'

export default Vue.component('new-statement', {
  props: ['onRead'],
  data () {
    return {
      message: '',
      talking: false
    }
  },
  methods: {
    submit: function (e) {
      e.preventDefault()

      const audioElement = document.getElementById('audio-elem')
      this.talking = true

      // call aws polly to read the message out loud
      // aws documentation is fragmented with this. The only instructions that seemed to work were:
      // https://aws.amazon.com/blogs/developer/authentication-with-amazon-cognito-in-the-browser/
      //
      // After some thought, the cognito version (instead of the IAM accessKey and secretAccessKey) is
      // really only beneficial if these credentials go in multiple installations of, say, an app. Which
      // is why most example code is for iOS or Android. If it's an SPA web app, we could use the accessKeyId
      // and secret just as well - revoking or refreshing it regularly.
      //
      // the cognito version is also beneficial if each app was logging in with something like facebook, etc.
      var creds = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-west-2:b83715e3-c38a-4ec8-80ff-3243a4e40bb0',
        RoleArn: 'arn:aws:iam::028657641871:role/PollyTest-CognitoUnauthenticated',
        AccountId: '028657641871', // your AWS account ID
      })

      AWS.config.update({
        region: 'us-west-2',
        // accessKeyId: "xxxx",
        // secretAccessKey: "xxxxx",
        credentials: creds,
      })

      // see http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Polly.html#synthesizeSpeech-property
      var polly = new Polly()

      var params = {
        OutputFormat: 'mp3', /* required */
        Text: this.message, /* required */
        VoiceId: 'Joey', /* required */
        // LexiconNames: [
        //   'STRING_VALUE',
        //   /* more items */
        // ],
        // SampleRate: 'STRING_VALUE',
        TextType: 'text'
      }
      polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
          console.error(err, err.stack)// an error occurred
        }
        else {
          var uInt8Array = new Uint8Array(data.AudioStream)
          var arrayBuffer = uInt8Array.buffer
          var blob = new Blob([arrayBuffer])
          var url = URL.createObjectURL(blob)

          audioElement.src = url
          console.log(audioElement)
          audioElement.play()

          // call onRead (callback)
          this.onRead(this.message, url)
          this.talking = false
          this.message = ''
        }
      })
    }
  },
  template: `<li class="new-statement">
    <input type="text" class="message-input" v-model="message" v-on:keyup.enter="submit" placeholder="What do you want to say?" />
    <span v-if="talking"><i class="fi-volume text-muted"></i></span>
    <audio id="audio-elem"></audio>
  </li>`
})
