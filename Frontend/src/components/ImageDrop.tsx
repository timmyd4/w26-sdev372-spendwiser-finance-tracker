import { useCallback, useState } from "react";
import "../App.css";
import { useDropzone } from "react-dropzone";

export default function ImageDrop({updateImage}: {updateImage: (image: File | null) => void}) {
    const [uploads, setUploads] = useState<File[]>([]);

    const { getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: useCallback((images: File[]) => {
            setUploads(images);
            updateImage(uploads[0] ?? null);
        }, []),
    })  
   
    return (
        <div className="image-drop">
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag and drop some files here, or click to select files</p>
            )}
            </div>
            {uploads && uploads.length > 0 && (
                <img src={URL.createObjectURL(uploads[0])} alt="Preview" />
            )}
        </div>
    );
}