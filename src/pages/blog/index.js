import Head from 'next/head'
import config from '@/utils/config'
import SidebarLayout from '@/components/layout/SidebarLayout'
import Hero from '@/components/Hero'
import Posts from '@/components/Posts'
import { getAllPosts } from '@/utils/posts-util'

export default function Blog(props) {

  return (
    <>
      <Head>
        <title>{`Writing | ${config.siteTitle}`}</title>
        <meta name="description" content="A list of all my posts" />
      </Head>
      <SidebarLayout>
        <Hero title="Writing"/>
        <Posts allPosts={props.allPosts}/>
      </SidebarLayout>
    </>
  )
}

export function getStaticProps() {
    const allPosts = getAllPosts();
  
    return {
      props: {
        allPosts: allPosts,
      },
    };
  }
