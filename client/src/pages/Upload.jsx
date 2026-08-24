import { useState } from 'react';

function Upload() {

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle file upload logic here
        console.log('File uploaded:', file);
    }

    return (
        <div className="upload-page">
            <h1>Upload Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="file-upload">Choose a file to upload:</label>
                <input type="file" onChange={handleFileChange} id="file-upload" name="file-upload" />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default Upload;

