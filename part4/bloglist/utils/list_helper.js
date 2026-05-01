const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogsList) => {
    const totalLikes=blogsList.reduce((accumulator, current) => {
      return accumulator + current.likes
    }, 0)
    return totalLikes
}

module.exports = {
  dummy,
  totalLikes,
}