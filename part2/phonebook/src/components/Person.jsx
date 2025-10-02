const Person = ({ person }) => {

   return <li style={{ listStyleType: 'none', paddingLeft: 0 }}>{person.name} {person.number}</li>
}

export default Person