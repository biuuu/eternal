import morse from './morse.json'
import Jaco from 'jaco'

const data = {
  l3Code: [],
  l2Code: [],
  l2Mora: [],
  code: {},
  mora: {}
}

const getLength = str => {
  const len = str.length
  let i = 0
  let count = 1
  while (len > i) {
    i++
    if (str[i] === ' ') count++
  }
  return count
}

const formatCode = (text) => {
  return text.replace(/1/g, '-').replace(/0/g, '•').replace(/[,.]/g, ' ').trim()
}

const codeStyle1 = (text) => {
  return text.replace(/\s/g, '/')
}

const codeStyle2 = (text) => {
  return text.replace(/-/g, '1').replace(/•/g, '0').replace(/\s/g, ',')
}

morse.forEach(item => {
  const mora = item[0]
  const romaji = item[1]
  const code = item[2]
  const codeLen = getLength(code)
  if (codeLen === 3) {
    data.l3Code.push(code)
  } else if (codeLen === 2) {
    data.l2Code.push(code)
  }
  if (mora.length === 2) {
    data.l2Mora.push(mora)
  }
  data.code[code] = [mora, romaji]
  data.mora[mora] = [code, romaji]
})

const mora2Code = (text, style = 2) => {
  const kata = new Jaco(text).toKatakana().toString()
  let codeStr = kata
  let romajiStr = kata
  data.l2Mora.forEach(item => {
    let index = codeStr.indexOf(item)
    while (index !== -1) {
      codeStr = codeStr.replace(item, ` ${data.mora[item][0]}`)
      romajiStr = romajiStr.replace(item, ` ${data.mora[item][1]}`)
      index = codeStr.indexOf(item)
    }
  })
  codeStr = codeStr.replace(/./g, (char) => {
    const item = data.mora[char]
    if (item) {
      return ` ${item[0]}`
    }
    return char
  })
  romajiStr = romajiStr.replace(/./g, (char) => {
    const item = data.mora[char]
    if (item) {
      return ` ${item[1]}`
    }
    return char
  })

  let code = codeStr.trim()
  if (style === 1) code = codeStyle1(code)
  if (style === 2) code = codeStyle2(code)

  return { code, romaji: romajiStr.trim() }
}

const getIndexOfMora = (str, keyword) => {
  let index = str.indexOf(` ${keyword} `)
  if (index !== -1) return index
  index = str.indexOf(`${keyword} `)
  if (index === 0) {
    return index
  }
  index = str.indexOf(` ${keyword}`)
  if (index !== -1 && (index + keyword.length + 1) === str.length) {
    return index
  }
  index = str.indexOf(keyword)
  if (index === 0 && keyword.length === str.length) {
    return index
  }
  return -1
}


const code2Mora = (text) => {
  const formattedCode = formatCode(text)
  let moraStr = formattedCode
  let romajiStr = formattedCode
  debugger
  data.l3Code.forEach(item => {
    let index = getIndexOfMora(moraStr, item)
    while (index !== -1) {
      moraStr = moraStr.replace(item, data.code[item][0])
      romajiStr = romajiStr.replace(item, data.code[item][1])
      index = getIndexOfMora(moraStr, item)
    }
  })
  data.l2Code.forEach(item => {
    let index = getIndexOfMora(moraStr, item)
    while (index !== -1) {
      moraStr = moraStr.replace(item, data.code[item][0])
      romajiStr = romajiStr.replace(item, data.code[item][1])
      index = getIndexOfMora(moraStr, item)
    }
  })

  moraStr = moraStr.split(' ').map(char => {
    const item = data.code[char]
    if (item) {
      return item[0]
    }
    return char
  }).join('')
  romajiStr = romajiStr.split(' ').map(char => {
    const item = data.code[char]
    if (item) {
      return item[1]
    }
    return char
  }).join(' ')

  return { mora: moraStr, romaji: romajiStr }
}

export { code2Mora, mora2Code }
