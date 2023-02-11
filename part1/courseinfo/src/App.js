// Header contains the name of the course
const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

// Total contains the total number of exercises
const Total = (props) => {
  const total = props.parts.reduce((acc, part) => acc + part.exercise, 0);
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

// Sub part of the content
const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercise}</p>
    </div>
  )
}

// Content contains the main content of the page
const Content = (props) => {
  return props.parts.map(
    part => <Part name={part.name} exercise={part.exercise} key={part.exercise}/>
  );
}

const App = () => {
  const course = {
    course: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercise: 10,
      },
      {
        name: 'Using props to pass data',
        exercise: 7,
      },
      {
        name: 'State of a component',
        exercise: 14,
      }
    ]
  }


  return (
    <div>
      <Header name={course.course} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

export default App
