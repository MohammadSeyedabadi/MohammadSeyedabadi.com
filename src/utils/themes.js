function setTheme(themeName, setClassName) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', themeName)
    setClassName(themeName)
  }
}

function keepTheme(setClassName) {
  let theme
  if (typeof window !== 'undefined') {
    theme = localStorage.getItem('theme')
  }

  if (theme) {
    setTheme(theme, setClassName)
    return
  }
  let prefersLightTheme
  if (typeof window !== 'undefined') {
    prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)')
    if (prefersLightTheme.matches) {
      setTheme('theme-light', setClassName)
      return
    }
  }

  setTheme('theme-dark', setClassName)
}

// module.exports = {
//   setTheme,
//   keepTheme
// }
export { setTheme, keepTheme }
