const date = Date.now()
const hasDate = location.search.match(/(\?|\&)t\=[0-9]{0,13}/i)
if (hasDate) {
  const gap = 2 * 60 * 1000
  const old = hasDate[0].slice(3)
  if (date - old > gap) {location.search = location.search.replace(old, date)}
} else {
  location.href = location.href + (location.search ? '&t=' : '?t=') + date
}
