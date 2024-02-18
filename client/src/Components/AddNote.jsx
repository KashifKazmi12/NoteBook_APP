import NoteContext from '../Context/Notes/NoteContext';
import React, { useState, useContext } from 'react';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

function AddNotes(props) {
  const context = useContext(NoteContext);


  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default"
  });


  const closeAddNote = () => {
    props.setClickBtn(false);
  };

  const handleOnchange = (e) => {
    if (e.target) {
      // Handle changes from regular input fields
      setNote({ ...note, [e.target.name]: e.target.value });
    } else {
      // Handle changes from ReactQuill editor
      setNote({ ...note, description: e });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(note.title.length < 5 || note.description.length < 5)
    {
      props.setShowAlert(true)
      return;
    }
    
    // Add the note to your context
    addNote(note);

    closeAddNote();




    //you can submit the note to your server here
  };


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
    <div className="py-12" style={{ width: "100%",minHeight:"100vh", zIndex: '99', backgroundColor: "whitesmoke" }}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={closeAddNote}>
              <svg className="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
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

              <div className="flex justify-end p-1">
                <button type="submit" className="p-3 bg-blue-500 text-white hover:bg-blue-400" required>
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNotes;
