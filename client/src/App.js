import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  const handleSelect = e => {
    setImage(e.target.files[0])
    //e.target.value = null;
    //console.log(e.target.files[0])
  };

  const handleLocalSubmit = async (e) => {
    e.preventDefault();
    console.log(image);
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'media_demo');
    data.append('cloud_name', 'dbl8pi1ms');
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dbl8pi1ms/image/upload',
      data
    );
    console.log('RESPONSE', res);
    inputRef.current.value = null;
  };

  const handleSignedSubmit = async (e) => {

  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Cloudinary Demo</h2>
        <form>
          <label htmlFor="image">Image</label>
          <input 
            type="file" 
            name="image" 
            onChange={handleSelect}
            ref={inputRef}
          />
          <button onClick={handleLocalSubmit}>
            Submit unsigned
          </button>
          <button onClick={handleSignedSubmit}>
            Submit signed
          </button>
        </form>
      </header>
      
    </div>
  );
}

export default App;
