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
      <div className="container">
        <div className="grid">
          <div className="article-content">
            <Hero title="Contacts" />
            <section className="segment small">
              <div className="post-content">
                <p>
                  Do you have some big ideas and need help bringing them to
                  fruition for your business? Then please reach out, i would
                  love to hear more about you, your project and how i can help!
                </p>
              </div>
            </section>
          </div>
          <aside>
            <div className="contact-sidebar-card">
              <form>
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    required
                    disabled
                    value="disabled"
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    id="email"
                    required
                    disabled
                    value="disabled"
                  />
                </div>
                <div>
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    required
                    disabled
                    value="disabled"
                  />
                </div>
                <div>Button</div>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
