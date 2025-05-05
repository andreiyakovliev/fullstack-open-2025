import { useState } from "react"

const Button = (props) => {
  const { onClick, text } = props;

  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const voite = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [voites, setVoites] = useState(voite);


  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const handleVoitClick = () => {
    const copy = [...voites];
    copy[selected] += 1;
    setVoites(copy);
  }

  const maxVotes = Math.max(...voites);
  const indexOfMostVoted = voites.indexOf(maxVotes);

  return (
    <div>
      <p style={{ fontWeight: 'bold', fontSize: 28 }}>Anecdote of the day</p>
      {anecdotes[selected]}
      <p>has {voites[selected]} voites</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={handleVoitClick} text={'vote'} />
        <Button onClick={handleClick} text={'next anecdotes'} />
      </div>
      <p style={{ fontWeight: 'bold', fontSize: 28 }}>Anecdote with most votes</p>
      {anecdotes[indexOfMostVoted]}
      <p>has {maxVotes} voites</p>
    </div>
  )
}

export default App