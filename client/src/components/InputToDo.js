import React, { useState } from 'react'

const InputToDo = () => {
  const [description, setDescription] = useState("");
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
        const body = {
          description: description,
          user_id: 1
        };
        const response = await fetch('http://localhost:5000/api/todo', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        console.log(response);        
    } catch (err) {
        console.error(err.message);
    }
  }
  return (
    <>
        <h1 className='text-center my-5'>Input ToDo</h1>
        <form className='d-flex' onSubmit={onSubmitForm}>
            <input type="text" placeholder="add todo" className='form-control' value={description} onChange={e => setDescription(e.target.value)}/>
            <button className='btn btn-success'>Add</button>
        </form>
    </>
  )
}

export default InputToDo