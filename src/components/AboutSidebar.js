import { useContext } from 'react'
import ThemeContext from '@/store/theme-context'
import Image from 'next/image'

export default function AboutSidebar() {
  const { ariaActive } = useContext(ThemeContext)
  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-card" style={{ width: 'fit-content' }}>
        <h2>Me</h2>
        <Image
            src="/images/me2.jpg"
            width={256}
            height={256}
            alt="Mohammad"
            quality={100}
            style={ariaActive ? null : {display:"none"}}
          />
          <Image
            src="/images/me1.jpg"
            width={256}
            height={256}
            alt="Mohammad"
            quality={100}
            style={ariaActive ? {display:"none"} : null}
          />
      </div>
    </aside>
  )
}
