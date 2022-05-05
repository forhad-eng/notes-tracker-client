import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import InputForm from './components/inputForm/InputForm'
import NoteCard from './components/noteCard/NoteCard'

function App() {
    const [notes, setNotes] = useState([])
    const [isReload, setIsReload] = useState(false)

    useEffect(() => {
        const getNotes = async () => {
            const url = 'http://localhost:5000/notes'
            const { data } = await axios.get(url)
            setNotes(data)
        }
        getNotes()
    }, [isReload])
    /*
1. here there will be a function named handleSearch
to handle search by query, and it will be passed as props to header
  */

    const handleSearch = async e => {
        e.preventDefault()
        const search = e.target.searchText.value
        if (search) {
            const url = `http://localhost:5000/notes?userName=${search}`
            const { data } = await axios.get(url)
            setNotes(data)
            e.target.searchText.value = ''
        }
    }

    /*2. here there will be a function named handleDelete
to delete a note, and it will be passed as props to NoteCard that will be triggered using delete button.
 */

    /*
3. there will be a function named handleUpdate
    to update data, and it will be passed as props to NoteCard and 
   later it will be passed to Update modal using props.
 */

    /*
4.  there will be a function named handlePost
to post data to backend, and it will be passed as props to InputFrom.
 */

    const handlePost = async e => {
        e.preventDefault()
        const userName = e.target.userName.value
        const note = e.target.note.value
        const url = 'http://localhost:5000/note'
        const { data } = await axios.post(url, { userName, note })
        if (data.acknowledged) {
            setIsReload(!isReload)
        }
    }

    return (
        <div className="App">
            <Header handleSearch={handleSearch} />
            <InputForm handlePost={handlePost} />
            <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
                {notes.map(note => (
                    <NoteCard key={note._id} note={note} />
                ))}
            </div>
        </div>
    )
}

export default App
