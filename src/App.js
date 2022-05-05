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

    //SEARCH query by userName
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

    //DELETE
    const handleDelete = async _id => {
        const url = `http://localhost:5000/note/${_id}`
        const { data } = await axios.delete(url)
        if (data.acknowledged) {
            setIsReload(!isReload)
        }
    }

    /*
3. there will be a function named handleUpdate
    to update data, and it will be passed as props to NoteCard and 
   later it will be passed to Update modal using props.
 */

    //CREATE or POST
    const handlePost = async e => {
        e.preventDefault()
        const userName = e.target.userName.value
        const note = e.target.note.value
        const url = 'http://localhost:5000/note'
        const { data } = await axios.post(url, { userName, note })
        e.target.reset()
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
                    <NoteCard key={note._id} note={note} handleDelete={handleDelete} />
                ))}
            </div>
        </div>
    )
}

export default App
