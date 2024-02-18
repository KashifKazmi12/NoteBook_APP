import "./App.css"
import Navbaar from "./Components/Navbaar";
import About from "./Pages/About";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import NoteState from "./Context/Notes/NoteState";
import DisplayFullNote from "./Components/DisplayFullNote";
import UpdateNotes from "./Components/UpdateNotes";
import { useState } from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Wether } from "./Components/Wether";

function App() {

  const [nightMode, setNightMode] = useState(false)

  const mynightMode = ()=>{
      setNightMode(!nightMode)
      if(!nightMode)
      {
        document.body.style.background="rgb(12, 16, 34)"
      }
      else
      {
        document.body.style.background="#ffffff"
      }
  }
      
  return (
    <NoteState>
    <div className="">
        <BrowserRouter>
        <Navbaar nightMode={nightMode} myNightMode={mynightMode} />
        <Routes>
          <Route exact path="/" element={<Home nightMode={nightMode}/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/note/:id" element={<DisplayFullNote />}/>
          <Route exact path="/note/editnote/:id" element={<UpdateNotes />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/signup" element={<Signup />}/>
          <Route exact path="/weather" element={<Wether/>}/>
        </Routes>
        </BrowserRouter>
    </div>
    </NoteState>
  );
}

export default App;
