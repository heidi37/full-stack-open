const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogsList) => {
    return blogsList.reduce((accumulator, current) => {
      return accumulator + current.likes
    }, 0)
}

const favoriteBlog = (blogsList) => {
    return blogsList.reduce((max, current) => {
      return current.likes > max.likes ? current : max
    })
}

const mostBlogs = (blogsList) => {
  const blogAccObject = {}

      for (const blog of blogsList){
        if (blogAccObject.hasOwnProperty(blog.author)){
          blogAccObject[blog.author] += 1
        } else {
          blogAccObject[blog.author] = 1
        }
      }
      let maxAuthor = null
      let maxCount = 0
      for (const author of Object.keys(blogAccObject)) {
        if(blogAccObject[author] > maxCount){
          maxAuthor = author
          maxCount = blogAccObject[author]
        }
      }
      return {
          author: maxAuthor,
          blogs: maxCount
        }
}

const mostLikes = (blogsList) => {
  const blogAccObject = {}

      for (const blog of blogsList){
        if (blogAccObject.hasOwnProperty(blog.author)){
          blogAccObject[blog.author] += blog.likes
        } else {
          blogAccObject[blog.author] = blog.likes
        }
      }
      let maxAuthor = null
      let maxLikesCount = 0
      for (const author of Object.keys(blogAccObject)) {
        if(blogAccObject[author] > maxLikesCount){
          maxAuthor = author
          maxLikesCount = blogAccObject[author]
        }
      }
      return {
          author: maxAuthor,
          likes: maxLikesCount
        }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}