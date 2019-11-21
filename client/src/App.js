import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    setImages(prev => [...prev, ...acceptedFiles]);
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  // const [albums, setAlbums] = useState([]);
  // useEffect(() => {
  //   axios.get('http://localhost:4000/users/0/albums')
  //     .then(({ data }) => {
  //       setAlbums(data);
  //     })
  // }, []);

  const handleSubmit = () => {
    const data = new FormData();
    images.forEach(e => {
      data.append('files', e);
    });
    data.append('albums', [0, 1, 2 ,3]);
    axios.post('http://localhost:5000/upload', data);
  };

  return (
    <React.Fragment>
      <div>Upload photos</div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      <button onClick={handleSubmit}>
        Submit
      </button>
      {/* {
        images.map((e, i) => (
          <img key={i} src={URL.createObjectURL(e)} alt="" />
        ))
      } */}
    </React.Fragment>
  );
};

export default App;
