;(function () {
  if (widnow.v2gifscript_jf8ejtf3gxm) {
    return
  }
  const script = document.createElement('script')
  script.src = 'https://www.danmu9.com/light/gifshot.min.js'
  document.head.appendChild(script)
  widnow.v2gifscript_jf8ejtf3gxm = new Promise(rev => {
    script.onload = rev
    return (params) => {
      const video = document.querySelector('video')
      if (!video) return
      window.gifshot.createGIF(Object.assign({
        'video': [video.src]
      }, params),function(obj) {
        if(!obj.error) {
          var image = obj.image,
          animatedImage = document.createElement('img');
          animatedImage.src = image;
          document.body.appendChild(animatedImage);
        }
      });
    }
  })
})()
