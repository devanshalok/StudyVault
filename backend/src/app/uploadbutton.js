// UploadButton.js
import React, {useState} from 'react';
import { FaUpload } from 'react-icons/fa';

const [transcription, setTranscription] = useState('')

const FileLoader = () => {
    const [file, setFile] = useState(null)
    const handleFileChange = (e) => {
        const selectedFile = e.target.lines()
        setFile(selectedFile)
    };

    const uploadAndProcessFile() = async () => {
        if(!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try{
            const response = await fetch('../api/huggingface/transcribe'), {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if(response.ok){
                const result = await response.json();
                console.log(result);
            }
            else{
                console.log("error loading files")
            }
        }catch(error){
            console.error(error)
        }
    }

    return (
        <div className="fixed bottom-4 right-4 z-10">
            <input
                type="file"
                id="fileUpload"
                multiple
                onChange={handleFileChange}
                className="hidden"
            />
            {/*<label*/}
            {/*  htmlFor="fileUpload"*/}
            {/*  className=" cursor-pointer "*/}
            {/*>*/}
            {/*  <FaUpload size={66} />*/}
            {/*</label>*/}
            <button
                onClick={uploadAndProcessFile}>Upload and Process File
            </button>
        </div>
    );
};

export default FileLoader;
