import Head from 'next/head'

import '../styles/global-style.css'
import '../styles/dark-mode.css'
import '../styles/toggle.css'
import CustomLayout from '../components/layout/customLayout'
import { ThemeContextProvider } from '../store/theme-context'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <CustomLayout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </CustomLayout>
    </ThemeContextProvider>
  )
}

export default MyApp
