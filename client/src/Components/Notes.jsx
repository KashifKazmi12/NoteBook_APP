import { useContext, useEffect, useState } from 'react'
import NoteContext from '../Context/Notes/NoteContext'
import NoteItems from './NoteItems'
import addNoteBtn from "../img/addnote.png"
import AddNotes from "./AddNote"
import Alert from "./Alert"
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  const { notes, getAllNotes } = useContext(NoteContext)
  const navigate = useNavigate()

  let [clickBtn, setClickBtn] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  useEffect( () => {
    if(localStorage.getItem('token'))
    getAllNotes()
    else 
    navigate('/login')
      // eslint-disable-next-line
  },[])

  useEffect(()=>{
    let handleAlert = setTimeout(()=>{
      if(showAlert)
      {
        setShowAlert(false)
      }
    },3000)

    return () => {
      clearTimeout(handleAlert);
    };
  })

  const openAddNoteManu = () => {
    setClickBtn(true)
  }

  return (
    <div className='notes' style={{ position: 'relative' }}>
      {showAlert && <Alert message={"title or content must be larger than 5 characters"} closeAlert={setShowAlert}/>}
      {clickBtn && <AddNotes setClickBtn={setClickBtn} setShowAlert={setShowAlert} />}
      {!clickBtn && <div className='notes_innercontainer'>
        {notes.length?
          notes.map((note) => {
            return (
              <NoteItems key={note.id} id={note.id} title={note.title} description={note.description} date={note.date} nightMode={props.nightMode} />
            )
          }) : <p style={{color: props.nightMode? "white":""}} className='text-center pt-5 m-auto'>If you don't have any notes yet, why not start by adding one? Tab the Add New &#91;&#43;&#93; Button to get started</p>
        }
        <div className="add-note-btn cursor-pointer" onClick={openAddNoteManu}><img src={addNoteBtn} alt="Add Notes" /></div>
      </div>}
    </div>
  )
}

export default Notes
