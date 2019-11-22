import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './App.css';

export const uploadMedia = async (media, albums, user_id) => {

  console.log(media);
  console.log(media.map(({ file, ...rest }) => rest));
  const submission = new FormData();
  submission.append('albums', albums);
  submission.append('media', JSON.stringify(media.map(({ file, ...rest }) => rest)));

// req.files.reduce((obj, e) => {
//     obj[e.name] = e;
//     return obj;
//   }, {});

  media.forEach(e => {
    submission.append('files', e.file, e.title);
  });

  console.log(submission.getAll('media'));
  //console.log(submission.getAll('files'));

  // route will probably change
  const { data } = axios.post(
    `http://localhost:5000/upload`,
    submission
  );
  return data;
};

function App() {
  const [images, setImages] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    const media = acceptedFiles.map((e, i) => {
      return {
        title: `A Photo Title ${i}`,
        caption: 'A Photo Caption',
        keywords: ['keyword one', 'keyword two'],
        meta: [{
          name: 'Meta Name',
          value: 'Meta Value'
        }, {
          name: 'Other Meta Name',
          value: 'Other Meta Value'
        }],
        file: e
      }
    });
    console.log(media);
    //setImages(prev => [...prev, ...media]);
    setImages(media);
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  // const [albums, setAlbums] = useState([]);
  // useEffect(() => {
  //   axios.get('http://localhost:4000/users/0/albums')
  //     .then(({ data }) => {
  //       setAlbums(data);
  //     })
  // }, []);

  const changeImageName = () => {
    if (images.length) {
      images[0].title = 'title!!!!';
    } else {
      console.error('no images available to mess with');
    }
  };

  const handleSubmit = () => {
    // const data = new FormData();
    // images.forEach((e, i) => {
    //   data.append(`title  ${i}`, e, `title${i}`);
    // });
    // data.append('albums', [0, 1, 2 ,3]);
    // console.log(data.getAll('files'));
    // axios.post('http://localhost:5000/upload', data);
    uploadMedia(images, [-1, 0, -1, 2], 1);
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
      <button onClick={changeImageName}>
        change name
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
