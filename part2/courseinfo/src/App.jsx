const Header = (props) => <h1>{props.course.name}</h1>

const Course = (props) => {
  const totalExercises = props.course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <>
    <Header course={props.course}/>
    <Content course={props.course} />
    <p><strong>total of {totalExercises} exercises</strong></p>
    </>
  )
}

const Content = (props) => {
  return (
      <div>
        {props.course.parts.map((part) => {
          return <Part key={part.id} part={part} />
        })}
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

    return (
    <>
      {courses.map(course => {
        return <Course key={course.id} course={course} />
      })}
    </>
    )
}

export default App