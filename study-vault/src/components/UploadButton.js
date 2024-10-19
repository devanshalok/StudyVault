// UploadButton.js
import React from 'react';
import './App.css';

// import { FaUpload } from 'react-icons/fa';
//
// const UploadButton = ({ onUpload }) => {
//   return (
//     <div className="fixed bottom-4 right-4 z-10">
//       <input
//         type="file"
//         id="fileUpload"
//         multiple
//         onChange={onUpload}
//         className="hidden"
//       />
//       <label
//         htmlFor="fileUpload"
//         className=" cursor-pointer "
//       >
//         <FaUpload size={66} />
//       </label>
//     </div>
//   );
// };
//
// export default UploadButton;

const DropdownButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <button className="dropbtn" onClick={toggleDropdown}>
                Options
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    <a href="#">Video</a>
                    <a href="#">Text File</a>
                    <a href="#">Image</a>
                </div>
            )}
        </div>
    );
};

export default DropdownButton;