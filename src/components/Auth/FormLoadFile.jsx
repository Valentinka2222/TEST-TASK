import React from 'react';

export const FormLoadFile = ({ onChange, selectedFile }) => {
  return (
    <label className="form_input-file">
      <input required accept=".jpg,.jpeg" type="file" name="photo" onChange={onChange} />
      <span className="form_input-file-btn">Upload</span>
      <input
        type="text"
        placeholder="Upload your photo"
        defaultValue={selectedFile}
        className="form_input-file-text"
      ></input>
    </label>
  );
};

export default FormLoadFile;
