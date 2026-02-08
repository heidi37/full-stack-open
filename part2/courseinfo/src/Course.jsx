const Header = (props) => <h1>{props.course.name}</h1>

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

export default function Course(props){
  const totalExercises = props.course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <>
    <Header course={props.course}/>
    <Content course={props.course} />
    <p><strong>total of {totalExercises} exercises</strong></p>
    </>
  )
}