
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPaperclip, faImage, faFileAlt, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { url } from '@/baseObjs';

const Attach = ({ attachmentsForm, setSelectedFiles, selectedFiles }) => {
    const [domLoaded, setDomLoaded] = useState(false);

    const handleFileSelect = e => {
        const selected = e.target.files;

        setSelectedFiles(Array.from(selected).map(item => item.name));
        console.log("Hurrr")
    }

    useEffect(() => {
      setDomLoaded(true);
    }, [])
    
    return (
        <div className="relative inline-block">
            <form id="attachmentForm" ref={attachmentsForm} onReset={handleFileSelect}>
                <input type="file" name="attachments" id="attachments" className='hidden' onChange={handleFileSelect}  multiple />
            </form>

            <label htmlFor="attachments" className='flex items-center justify-center w-12 h-12 bg-rose-500 rounded-full hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50'>
                <FontAwesomeIcon icon={faPaperclip} className="text-white" />
            </label>
        </div>
    );
};

export default Attach;

