import React, { useContext } from 'react'
import NoteContext from '../Context/Notes/NoteContext'
import { Link } from 'react-router-dom';

const stripHtmlTags = (htmlString) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText || '';
};

const NoteItems = (props) => {

    const context = useContext(NoteContext);

    const { deleteNote } = context;


    const iconStyle = {
        position: "absolute",
        right: "10px",
        bottom: "5px",
        display: "flex",
        gap: "8px"
    }

    const textDescription = stripHtmlTags(props.description);


    return (
        <div className='note-item fadeup' style={{ position: 'relative' }}>
            <Link to={`/note/${props.id}`}>
            {
                <div className="note-item-inner-container">
                    <div className="p-5">
                        <h5 className={`cursor-pointer mb-2 text-2xl font-bold tracking-tight ${props.nightMode? 'text-gray-200' : 'text-gray-900'} dark:text-white`} style={{wordWrap:"break-word", textAlign:'center'}}>{props.title.slice(0,45)}</h5>
                        {/* <p >{props.description.slice(0,30)} ....</p> */}
                        <p style={{wordWrap:"break-word", textAlign:'center'}} className={`mb-8 font-normal ${props.nightMode? 'text-gray-300' : 'text-gray-700'}`}>{textDescription.length>260? `${textDescription.slice(0, 260)}. . . .` : textDescription}</p>
                        {/* <div className="mb-8 font-normal text-gray-700 dark:text-gray-400 " dangerouslySetInnerHTML={{ __html: props.description.slice(0, 40) }} /> */}
                        
                    </div>
                    <div className="action-buttons" style={iconStyle} >
                            <Link to={'/'}><i style={{background:props.nightMode? "black":""}} className={`fa-solid fa-trash text-red-600 cursor-pointer`} onClick={() => { deleteNote(props.id) }}></i></Link>
                            <Link to={`/note/editnote/${props.id}`}><i style={{background:props.nightMode? "black":""}} className="fa-solid fa-pen-to-square text-green-600 cursor-pointer "></i></Link>
                        </div>
                </div>}
            </Link>

        </div>
    )
}

export default NoteItems
