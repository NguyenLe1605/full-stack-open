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
    const total = props.parts.reduce((acc, part) => acc + part.exercises, 0);
    return (
      <div>
        <p><strong>Number of exercises {total}</strong></p>
      </div>
    )
  }
  
  // Sub part of the content
  const Part = (props) => {
    return (
      <div>
        <p>{props.name} {props.exercises}</p>
      </div>
    )
  }
  
  // Content contains the main content of the page
  const Content = (props) => {
    return props.parts.map(
      part => <Part name={part.name} exercises={part.exercises} key={part.id}/>
    );
  }
  
  const Course = (props) => {
    const {course} = props;
    return (
      <div>
        <Header name={course.course} />
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
      </div>
    )
  }

export default Course;