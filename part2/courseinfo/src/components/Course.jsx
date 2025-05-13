const Course = ({ title, courses }) => {
   return (
      <>
         <Title name={title} />
         {courses.map(course => (
            <div key={course.id}>
               <Header name={course.name} />
               {course.parts.map(part => (
                  <Content key={part.id} part={part} />
               ))}
               <Total parts={course.parts} />
            </div>
         ))}
      </>
   )
}

const Header = (props) => {
   return (
      <h2>{props.name}</h2>
   )
}

const Title = (props) => {
   return (
      <h1>{props.name}</h1>
   )
}

const Part = (props) => {
   return (
      <>
         {props.part} {props.exercises}
      </>
   )
}

const Content = (props) => {
   return (
      <p>
         <Part part={props.part.name} exercises={props.part.exercises} />
      </p>
   )
}

const Total = (props) => {
   const totalExercises = props.parts.reduce((accumulator, currentPart) => {
      return accumulator + currentPart.exercises;
   }, 0);

   return <p style={{ fontWeight: "bold" }}> total of {totalExercises} exercises</p >
}

export default Course