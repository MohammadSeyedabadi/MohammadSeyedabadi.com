import { createContext, useState, useEffect } from 'react'
import { setTheme,keepTheme } from '@/utils/themes'

const ThemeContext = createContext()

export function ThemeContextProvider(props) {
    const [className, setClassName] = useState('theme-dark')
    useEffect(() => {
      keepTheme(setClassName)
    }, [setClassName])
     // false = dark mode because of the way I wrote the CSS
  const [active, setActive] = useState(false)
  // the opposite, for screenreaders
  const [ariaActive, setAriaActive] = useState(true)

  let theme
  if (typeof window !== 'undefined') {
    theme = localStorage.getItem('theme')
  }

  const changeThemeAndToggle = () => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-light', setClassName)
      setActive(true)
      setAriaActive(false)
    } else {
      setTheme('theme-dark', setClassName)
      setActive(false)
      setAriaActive(true)
    }
  }

  const handleOnClick = () => {
    if (typeof window !== 'undefined') {
      changeThemeAndToggle()
    }
  }

  const handleKeypress = (e) => {
    if (typeof window !== 'undefined') {
      if (e.code === 'Enter') {
        changeThemeAndToggle()
      }
    }
  }

  useEffect(() => {
    if (theme === 'theme-dark') {
      setActive(false)
      setAriaActive(true)
      let root = document.querySelector(':root')
      // root.classList.add('dark');
      root.setAttribute('data-theme', 'dark')
    } else if (theme === 'theme-light') {
      setActive(true)
      setAriaActive(false)
      let root = document.querySelector(':root')
      // root.classList.remove('dark');
      root.setAttribute('data-theme', 'light')
    }
  }, [theme])

  const context = {
    setClassName,
    active,
    ariaActive,
    handleOnClick,
    handleKeypress,
  }

  return (
    <ThemeContext.Provider value={context}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
