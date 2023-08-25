import React, { useState,useContext } from 'react'
import notecontext from "../contexts/notes/noteContext";

const AddNote = () => {
  const context=useContext(notecontext);
  const {addNote}=context;

  const [note,setNote]=useState({title:"",description:"",tag:""})
  const handleclick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})
  }
  const onchange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
        <div className="container my-3">
      <h2>add a note</h2>
      <div className="container my-3"></div>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter title"
            value={note.title}
            onChange={onchange}
            minLength={5} required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="desc"
            name="description"
            placeholder="Description"
            value={note.description}
            onChange={onchange}
            minLength={5} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="tag"
            value={note.tag}
            onChange={onchange}
            minLength={5} required
          />
        </div>
        <button disabled={note.title.length<5 ||note.description.length<5}type="submit" className="btn btn-primary my-3" onClick={handleclick}>
          Add Note
        </button>
      </form>
      </div>
    </div>
  )
}

export default AddNote
