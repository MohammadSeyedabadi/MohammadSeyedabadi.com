import Head from 'next/head'
import config from '@/utils/config'
import Hero from '@/components/Hero'

export default function Contact() {
  return (
    <>
      <Head>
        <title>{`Contact Me | ${config.siteTitle}`}</title>
        <meta name="description" content="Send me your messages!" />
      </Head>
      <div style={{ marginBottom: '10rem' }}>
        <div className="container">
          <Hero title="Coming soon ..." />
        </div>
      </div>
    </>
  )
}
