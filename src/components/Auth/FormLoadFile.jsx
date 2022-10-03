import React, { useState } from 'react';

export const FormLoadFile = () => {
  const [selectedFile, setselectedFile] = useState({});
  const onChange = event => {
    event.preventDefault();
    if (!event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
      alert('FileReader don"t support');
      return;
    }
    if (!FileReader) {
      alert('FileReader don"t support');
      return;
    }
    if (!event.target.files.length) {
      alert('Nothing download');
    }

    if (!event.target.files[0].size > 5242880) {
      alert('File size cannot more than 5MB');
    }

    setselectedFile(event.target.files[0]);
  };

  return (
    <label className="form_input-file">
      <input required type="file" name="file" onChange={onChange} />
      <span className="form_input-file-btn">Upload</span>
      <input
        required
        type="text"
        placeholder="Upload your photo"
        defaultValue={selectedFile.name}
        className="form_input-file-text"
      ></input>
    </label>
  );
};

export default FormLoadFile;
