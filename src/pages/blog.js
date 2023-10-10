import Head from 'next/head'
import config from '@/utils/config'
import Hero from '@/components/Hero'

export default function Blog() {
  return (
    <>
      <Head>
        <title>{`Writing | ${config.siteTitle}`}</title>
        <meta name="description" content="A list of all my posts" />
      </Head>
      <div style={{ marginBottom: '10rem' }}>
        <div className="container">
          <Hero title="Coming soon ..." />
        </div>
      </div>
    </>
  )
}
