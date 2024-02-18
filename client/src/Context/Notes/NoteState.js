import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{

    const endpoint = process.env.REACT_APP_ENDPOINT

    const [notes, setNotes] = useState([
    
      ])

      //Get All Note
      const getAllNotes =async ()=>{
        const reaponse = await fetch(`http://${endpoint}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-tokan': localStorage.getItem("token")
      },
    })
    if(reaponse.ok){
      const data = await reaponse.json()
      setNotes(data)
    }
      }


      //Add Note
      const addNote = async (note)=>{

        const response = await fetch(`http://${endpoint}/api/notes/addnewnote`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-tokan': localStorage.getItem("token")
      },
      body: JSON.stringify(note)
    })

    if (!response.ok) {
      return console.log('Network response was not ok');
    }

    const data = await response.json();
    console.log(data)

    getAllNotes()

    

    

        // let mynote = {
        //       "id": notes.length,
        //       "title": note.title,
        //       "description": note.description,
        //       "tag": "MY Tags",
        //       "date": "2023-09-18T04:51:10.000Z",
        //       "user_id": 6
        // }
        
        // setNotes(notes.concat(mynote))

      }

      //Delete Note
      const deleteNote = async (id)=>{

          let newNotes = notes.filter((e)=>{
            return e.id!==id
          })

          setNotes(newNotes)

          const response = await fetch(`http://${endpoint}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'auth-tokan': localStorage.getItem("token")
            },
          })

          if (!response.ok) {
            return console.log('Network response was not ok');
          }
      
          const data = await response.json();
          console.log(data)

      }
      //Edit Note
      const editNote = async (id, newtitle, newdescription)=>{
        const response = await fetch(`http://${endpoint}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'auth-tokan': localStorage.getItem("token")
            },
            body: JSON.stringify({title:newtitle, description:newdescription, tag:"Default" })
          })

          if (!response.ok) {
             console.log('Network response was not ok');
          }

      };

      //Get Single Note
      const getSingleNote = (id) => {
        const single = notes.find((e) => e.id === id);

        // Check if a match was found, and return a default object if not
        if (single) {
          return single;
        } else {
          return {
            title: "",
            description: "",
            tag: "default"
          };
        }
      }

    return(
        <NoteContext.Provider value={{notes, setNotes, getAllNotes, addNote, deleteNote, editNote, getSingleNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState