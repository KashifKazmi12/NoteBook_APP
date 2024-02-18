import React from 'react'
import Notes from '../Components/Notes'

const Home = (props) => {
  return (
    <>
      <Notes nightMode={props.nightMode}/>
    </>
  )
}

export default Home
