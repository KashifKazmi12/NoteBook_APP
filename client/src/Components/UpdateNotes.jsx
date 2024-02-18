import React, {  useState, useContext, useEffect } from 'react';
import NoteContext from '../Context/Notes/NoteContext';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import {useNavigate, useLocation} from "react-router-dom"

const UpdateNotes = () => {

    const context = useContext(NoteContext);
    const navigator = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/')[3]

    const { getSingleNote, editNote } = context;
  
    const [note, setNote] = useState({
      title: "",
      description: "",
      tag: "default"
    });
  
  
    const closeAddNote = (e) => {
        e.preventDefault();
      navigator(-1)
    };
  
    const handleOnchange = (e) => {
      if (e.target) {
        // Handle changes from regular input fields
        setNote({ ...note, [e.target.name]: e.target.value });
      } else {
        // Handle changes from ReactQuill editor
        setNote({ ...note, description: e });
      }

      console.log(note)
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Add the note to your context
      editNote(Number(path),note.title,note.description)
      navigator("/")
  
  
  
  
      //you can submit the note to your server here
    };


    useEffect(() => {
        setNote(getSingleNote(Number(path)))
    }, [getSingleNote, path])


  //editor functions and variables:

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
        <div className="update-page py-12" style={{ width: "100%",minHeight:"100vh", zIndex: '99', backgroundColor: "whitesmoke" }}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <form method="POST" action="action.php" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-xl text-gray-600">
                  Title <span className="text-red-500">*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="border-2 border-gray-300 p-2 w-full"
                  name="title"
                  value={note.title}
                  onChange={handleOnchange}
                  id="title"
                  required
                />
              </div>

              <div className="mb-8">
                <label className="text-xl text-gray-600">
                  Content <span className="text-red-500">*</span>
                </label>
                <br />
                <div className="editorContainer">
                  <ReactQuill
                    type="text"
                    className="border-2 border-gray-300 p-1 w-full "
                    name="description"
                    value={note.description}
                    modules={modules}
                    formats={formats}
                    onChange={handleOnchange}
                    id="description"
                    required={true}
                  />
                </div>
              </div>

              <div className="flex justify-end p-1 gap-2">
              <button className="p-3 border-solid border-l-emerald-100 text-blue-700 hover:bg-blue-500 hover:text-white" onClick={closeAddNote} required>
                  Cancel
                </button>
                <button type="submit" className="p-3 bg-blue-500 text-white hover:bg-blue-400" required>
                  Update Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateNotes
