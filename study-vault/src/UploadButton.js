// UploadButton.js
import React from 'react';
import { FaUpload } from 'react-icons/fa';

const UploadButton = ({ onUpload }) => {
  return (
    <div className="fixed bottom-4 right-4 z-10">
      <input
        type="file"
        id="fileUpload"
        multiple
        onChange={onUpload}
        className="hidden"
      />
      <label
        htmlFor="fileUpload"
        className=" cursor-pointer "
      >
        <FaUpload size={66} />
      </label>
    </div>
  );
};

export default UploadButton;
