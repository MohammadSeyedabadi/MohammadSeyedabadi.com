import Head from 'next/head'

import '../styles/global-style.css'
import '../styles/dark-mode.css'
import '../styles/toggle.css'
import Layout from '../components/layout/layout'
import { ThemeContextProvider } from '../store/theme-context'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ThemeContextProvider>
  )
}

export default MyApp
