// // UploadButton.js
// import React from 'react';
// import '../App.css';
//
// // import { FaUpload } from 'react-icons/fa';
// //
// // const UploadButton = ({ onUpload }) => {
// //   return (
// //     <div className="fixed bottom-4 right-4 z-10">
// //       <input
// //         type="file"
// //         id="fileUpload"
// //         multiple
// //         onChange={onUpload}
// //         className="hidden"
// //       />
// //       <label
// //         htmlFor="fileUpload"
// //         className=" cursor-pointer "
// //       >
// //         <FaUpload size={66} />
// //       </label>
// //     </div>
// //   );
// // };
// //
// // export default UploadButton;
//
// const DropdownButton = () => {
//     const [isOpen, setIsOpen] = useState(false);
//
//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         if(file){
//
//         }
//     }
//
//     const toggleDropdown = () => {
//         setIsOpen(!isOpen);
//     };
//
//     return (
//         <div className="dropdown" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
//             <button className="dropbtn" onClick={toggleDropdown}>
//                 Options
//             </button>
//             {isOpen && (
//                 <div className="dropdown-content">
//                     <label>
//                         <input type="file" accept="image/*" onChange={handleFileUpload}/>
//                         image
//                     </label>
//                     <label>
//                         <input type="file" accept="video/*" onChange={handleFileUpload}/>
//                     </label>
//                     <label>
//                         <input type="file" accept=".pdf" onChange={handleFileUpload}/>
//                     </label>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default DropdownButton;