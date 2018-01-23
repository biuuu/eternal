;(function () {
  if (window.v2gifscript_jf8ejtf3gxm) {
    return
  }
  const script = document.createElement('script')
  script.src = 'https://www.danmu9.com/light/gifshot.min.js'
  document.head.appendChild(script)
  window.v2gifscript_jf8ejtf3gxm = new Promise(rev => {
    script.onload = () => {
      rev((params) => {
        const video = document.querySelector('video')
        if (!video) return
        const width = video.videoWidth
        const height = video.videoHeight
        const duration = video.duration
        params.gifWidth = Math.floor(params.size * width)
        params.gifHeight = Math.floor(params.size * height)
        params.numFrames = Math.floor(duration / params.interval)
        if (params.time) {
          params.offset = params.time[0]
          params.numFrames = Math.floor((params.time[1] - params.time[0]) / params.interval)
        }
        const div = document.createElement('div')
        div.style.color = '#fff'
        div.innerHTML = 'Loading...'
        document.body.appendChild(div)
        window.gifshot.createGIF(Object.assign({
          'video': [video.currentSrc],
          numWorkers: 4
        }, params),function(obj) {
          if(!obj.error) {
            var image = obj.image,
            animatedImage = document.createElement('img');
            animatedImage.src = image;
            div.innerHTML = ''
            div.appendChild(animatedImage);
          } else {
            div.innerHTML = 'failed' + JSON.stringify(obj.error)
          }
        });
      })
    }
  })
})()
