import { useState } from "react"
import axios from "axios";
import Note from './components/Note'
import { useEffect } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    console.log('effect');
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled');
        setNotes(response.data)
      })
  }

  useEffect(hook, []) // [] - частота запуску рендерингу, якщо масив порожній, то ефект запускається лише під час першого рендерингу компонента

  const notesToShow = showAll
    ? notes // якщо нотес існуюють, то
    : notes.filter(note => note.important === true) // відфільтровуємо ті, яке є важливі

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = { // створюємо новий об'єкт
      content: newNote, // Отримуватиме весь вміст зі стану newNote
      important: Math.random() < 0.5, // нотатка має шанз 50% отримати статус важливої
      id: String(notes.length + 1), // унікальний id формується за рахунок довшини масиву + 1
    }

    setNotes(notes.concat(noteObject)); // додаємо нову нотатку
    setNewNote(''); // скидаємо значення після додавання

  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      {/* При натисканні міняємо назву кнопки з  important на all і навпаки*/}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul >
        {notesToShow.map(note => // розділяємо саме notesToShow
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App