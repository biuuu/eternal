(function () {
  var node = document.querySelector('.eternal-promise');
  var arr = node.querySelector('span').textContent.split('');
  var nodes = arr.map(function (char, i) {
    return '<span style="animation: loading-move 2s ease ' + (i * 0.1) + 's infinite">' + char + '</span>';
  });
  node.innerHTML = nodes.join('');
})()
