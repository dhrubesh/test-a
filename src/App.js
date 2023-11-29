import { useState } from 'react';
import './App.css';
import {TaskTypes} from './constant';

// {
  // note: '',
  // type: [taskType]

// }

const DefaultValue = {note:'',pin: false}
function App() {
  const [taskType, setTaskType] = useState(TaskTypes[0]);
  const [note, setNewNote] = useState(DefaultValue);
  const [noteList, setNoteList] = useState([]);
  const [filter, setFilter] = useState([]);

  const handleInputChange = (e) =>{
    setNewNote((_note)=>({..._note,note:e.target.value}))
  }
  const handleInputSubmit = (e) =>{
    e.preventDefault();
    console.log('enter');
    setNoteList((notes)=>[...notes, {
      id: Date.now(),
      note: note.note.trim(),
      type: taskType,
      pin: note.pin,
    }]);
    setNewNote(DefaultValue);
  }

  const handlePin = (id) =>{
    setNoteList((notes)=>notes.map((note)=>{
      if(note.id===id){
        return {
          ...note, pin: true
        }
      }
      return note;
    }))
  }
  const handleSetFilter = (type) =>{
    const index = filter.indexOf(type);
    if( index > -1){
      setFilter((fil)=>fil.filter(k=>k!==type))
    }else{
      setFilter([...filter, type])
    }
  }

  const pinnedNotes = noteList.filter((notes)=>(filter.length > 0 ? filter.indexOf(notes.type) > -1 && notes.pin  : notes.pin ));
  
  const filteredNotes = noteList.filter((notes)=> filter.length > 0 ?  filter.indexOf(notes.type) > -1 : notes);
  const handleCBchange = () =>{
    setNewNote((_note)=>({..._note, pin:!_note.pin}))
  }
  return (
    <div className="App">
    <div className='task-container'>
      {TaskTypes.map((key)=>(
          <div>
          <input type='radio' key={key} onChange={()=>setTaskType(key)} checked={taskType === key}/>
          {key}
        </div>
        ))}
      </div>      
        <div className='input-box'>
          <form onSubmit={handleInputSubmit}>
           <input type="text" value={note.note} onChange={handleInputChange} />
           <input type="checkbox"   onChange={()=>handleCBchange()} checked={note.pin}/> Pin
          </form>
        </div>
        <div className='task-container'>
        {TaskTypes.map((key)=>(
          <div>
          <input type='checkbox' key={key} onChange={()=>handleSetFilter(key)} checked={filter.indexOf(key) > -1}/>
          {key}
        </div>
        ))}
        </div>
        <div>
          {
            pinnedNotes.map((notes)=>{
              return(
                <div key={notes.id} className='pin activity-block'>
                  {notes.note} 
                    <div>
                      type: {notes.type}
                      pinned
                    </div>
                  </div>
              )
            })
          }
        </div>

        <div>
          {
            filteredNotes.map((notes)=>{
              if(notes.pin){
                return null;
              }
              return(
                <div key={notes.id} className='activity-block'>
                  {notes.note} 
                    <div>
                      type: {notes.type}
                    </div>
                    <button onClick={()=>handlePin(notes.id)}>pin this</button>
                  </div>
              )
            })
          }
        </div>
    </div>
  );
}

export default App;
