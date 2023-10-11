import fs from 'fs'
import path from 'path'

import matter from 'gray-matter' // nodeJS returns all the markdown file, in order to seperate the meta data and the content we installed a
// third party package that do that for us

const postsDirectory = path.join(process.cwd(), 'src/posts')

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory)
}

export function getPostData(postIdentifier) {
  // this function is flexible and wheather the postIdentifier have the .md extention or not, it would work. so it work in both scenorios which we need.
  const postSlug = postIdentifier.replace(/\.md$/, '') // removes the file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`) // this construct a full absolute path to that specefic file
  const fileContent = fs.readFileSync(filePath, 'utf-8') // for reading the content of that file, we also pass a second argument to make it clear that the file encoding is utf-8, so we support all that unicode characters   ( .readFileSync produces file content )   the file content here is just a string   since we use readFileSync we will block the further loop execution, until we parse the data, this is because of this sync
  const { data, content } = matter(fileContent) // matter is a function that take a string and returns a object with two properties, data ==> is a object with meta data information, the content ==> is a string with content in it, markdown as string to be specific

  const postData = {
    // slug: postSlug,
    // ...data,
    // content,
    slug: postSlug,
    title: data.title,
    date: data.date,
  }

  return postData
}

export function getAllPosts() {
  // reads all the posts from the posts folder and then take the data, and then sort them, and then return them.
  const postFiles = getPostsFiles()

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile)
  })

  const sortedPosts = allPosts.sort(
    (
      postA,
      postB // this is a default javascript sort method, which will make sure that the posts with greater date, so more recent posts are actually sorted at in front of older posts, and this return a new array
    ) => (postA.date > postB.date ? -1 : 1)
  )

  return sortedPosts
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts()

  const featuredPosts = allPosts.filter((post) => post.isFeatured)

  return featuredPosts
}
