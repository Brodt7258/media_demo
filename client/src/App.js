import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image, setImage] = useState(null);

  const handleSelect = e => {
    setImage(e.target.files[0])
    //console.log(e.target.files[0])
  };

  const handleSubmit = async (e) => {
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
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Cloudinary Demo</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="image">Image</label>
          <input 
            type="file" 
            name="image" 
            onChange={handleSelect}
          />
          <button type="submit">
            Submit
          </button>
        </form>
      </header>
      
    </div>
  );
}

export default App;
