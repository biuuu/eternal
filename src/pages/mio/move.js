const config = {
  sequence: [
    { velocity: 1, type: 'even', duration: 3000 },
    { velocity: 1, type: 'acc', velocity2: 20, duration: 2000 },
    { velocity: 20, type: 'even', duration: 3000 },
    { velocity: 20, type: 'dec', velocity2: 1, duration: 3000 },
    { velocity: 1, type: 'dec', velocity2: 0, duration: 1000 },
    { velocity: 0, type: 'even', velocity2: 0, duration: 1000 },
    { velocity: 0, type: 'acc', velocity2: 1, duration: 1000 }
  ]
}

const getDistance = ({ time: t, type, velocity: v, acceleration: a }) => {
  if (type === 'even') {
    return v * t
  } else if (type === 'acc') {
    return v * t + 0.5 * a * Math.pow(t, 2)
  } else if (type === 'dec') {
    return v * t + 0.5 * a * Math.pow(t, 2)
  }
  throw new Error('wrong type, should be "even" or "acc" or "dec"')
}

const getParams = (config) => {
  const { sequence } = config
  const durations = sequence.map(item => item.duration)
  let totalLength = 0
  const seq = sequence.map(item => {
    if (item.type === 'even') {
      item.a = 0
    } else {
      item.a = (item.velocity2 - item.velocity) / item.duration
    }
    item.partLength = getDistance({
      time: item.duration,
      type: item.type,
      velocity: item.velocity,
      acceleration: item.a
    })
    totalLength += item.partLength
    return item
  })
  const addedTime = durations.slice(0, 1)
  const seqTime = durations.reduce((previous, current) => {
    const result = previous + current
    addedTime.push(result)
    return result
  })

  return { seqTime, seq, addedTime, totalLength }
}

const getPosition = (addedTime, time) => {
  let index = 0
  let len = addedTime.length
  while(addedTime[index] < time && index < len) {
    index++
  }
  return index
}

const getLength = () => {
  let startTime = null
  const { seqTime, addedTime, seq, totalLength } = getParams(config)
  return (time) => {
    if (Number.isNaN(startTime)) {
      startTime = time
      return 0
    }
    const leftTime = time - startTime
    const timeOnSeq = leftTime % seqTime
    const pos = getPosition(addedTime, timeOnSeq)
    const count = Math.floor(leftTime / seqTime)
    let _time = timeOnSeq
    let distance = 0
    for (let i = 0; i < pos; i++) {
      _time -= seq[i].duration
      distance += seq[i].partLength
    }
    distance += getDistance({
      time: _time,
      type: seq[pos].type,
      velocity: seq[pos].velocity,
      acceleration: seq[pos].a
    })
    const speed = seq[pos].velocity + seq[pos].a * _time
    return {
      len: distance + count * totalLength,
      speed
    }
  }
}

const moved = getLength()

const move = () => {
  let lastLength = 0
  return (time) => {
    const { len, speed } = moved(time)
    const result = len - lastLength
    lastLength = len
    return { len: result, speed }
  }
}

const computePos = (len, { width, height, x, y, rotation, direction }) => {
  const rx = Math.cos(-rotation) * len
  const ry = Math.sin(-rotation) * len
  let _x = x - rx
  let _y = y + ry
  let _rotation = -rotation
  const num = Number((0.4 - Math.random() * 0.2 - 0.3).toFixed(2))

  if (_x < 0) {
    _x = -_x % width
    _rotation = Math.PI - _rotation + num
  } else if (_x > width) {
    _x = width - _x % width
    _rotation = Math.PI - _rotation + num
  }
  if (_y > height) {
    _y = height - _y % height
    _rotation = -_rotation + num
  } else if (_y < 0) {
    _y = -_y % height
    _rotation = -_rotation + num
  }

  return { x: _x, y: _y, rotation: -_rotation }
}

export default move()
export { computePos }
