import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import PostSidebar from '@/components/PostSidebar'

export default function PostTemplate({ post }) {
  return (
    <>
      <div className="container">
        <ReactMarkdown>{post.content}</ReactMarkdown>
        <PostSidebar post={post}/>
      </div>
    </>
  )
}
