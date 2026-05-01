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
    }).title
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}