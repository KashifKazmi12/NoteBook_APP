import React, { useContext, useEffect, useState } from 'react'
import NoteContext from '../Context/Notes/NoteContext'
import { useLocation, useNavigate } from 'react-router-dom';

const DisplayFullNote = () => {
    const context = useContext(NoteContext);
    const { getSingleNote } = context
    const navigate = useNavigate()

    const [fullNote, setFullNote] = useState({})
    const location = useLocation()
    const path = location.pathname.split('/')[2]
    useEffect(() => {
        setFullNote(getSingleNote(Number(path))) // eslint-disable-next-line
    },[])


    return (
        <div>
            <div className='single-note pt-14 mx-auto'>
                <div style={{wordWrap:"break-word", textAlign:"left"}} className='heading text-4xl font-bold'>{fullNote.title}</div>
                <hr className='seprator'/>
                <div style={{wordWrap:"break-word", textAlign:"left"}} className='editor-container-display' dangerouslySetInnerHTML={{ __html: fullNote.description }}></div>
                <span className="absolute top-2 right-2 px-4 py-3" onClick={()=>{navigate(-1)}}>
                    <svg className="fill-current h-6 w-6 text-gray-100 bg-purple-700 p-1 rounded-sm" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
            </div>
        </div>
    )
}

export default DisplayFullNote
