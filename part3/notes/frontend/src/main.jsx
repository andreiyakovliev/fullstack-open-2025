import ReactDOM from 'react-dom/client'
// import axios from 'axios' - ми перенесли все в App
import App from './App'


/* const promise = axios.get('http://localhost:3001/notes')

promise.then(response => {
   console.log(response)
}) */

// Метод axios

/* axios
   .get('http://localhost:3001/notes')
   .then(response => {
      const notes = response.data
      console.log(notes)
   }) */

//   Отримання і рендеринг (мінус в тому, що буде затримка рендеру без отримання)

/* axios.get('http://localhost:3001/notes').then(response => {
   const notes = response.data
   ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
})
 */


ReactDOM.createRoot(document.getElementById("root")).render(<App />);