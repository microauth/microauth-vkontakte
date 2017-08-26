module.exports = obj => {
  const keys = Object.keys(obj)
  if (keys.length < 3) {
    throw new Error('Must provide configuration options!')
  }
  keys.forEach(key => {
    const val = obj[key]
    if (!val) {
      throw new Error(`Must provide value for ${key}!`)
    } else if (key === 'redirectUrl') {
      const providedUrl = obj[key]
      const http = providedUrl.includes('http://')
      const https = providedUrl.includes('https://')
      if (!(http || https)) {
        throw new Error(`Provided redirectUrl: ${providedUrl} fails.`)
      }
    }
  })
  return true
}
