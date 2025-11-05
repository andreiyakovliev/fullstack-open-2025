const Person = ({ person }) => {

   return <div style={{ listStyleType: 'none', paddingLeft: 0 }}>{person.name} {person.number}</div>
}

export default Person