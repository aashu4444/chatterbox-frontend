import { useEffect, useState } from "react";
// import Image from 'next/image';
import Link from "next/link";
import { url, mediaUrl } from "@/baseObjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import ViewChatImages from './ViewChatImages';

export default function Attachments({ attachments }) {
    const attachments_parsed = JSON.parse(attachments)
    const [pictures, setPictures] = useState([]);
    const [attachedFiles, setAttachedFiles] = useState([]);

    const imageFormats = ['jpg', 'jpeg', 'png', 'jfif']


    useEffect(() => {
        const picturesArray = []
        const attachedFilesArray = [];

        for (let attachment of attachments_parsed) {
            const sliced_attachment = attachment.split(".")
            const attachmentFormat = sliced_attachment[sliced_attachment.length - 1]

            if (imageFormats.includes(attachmentFormat)) {
                // Code to show pictures
                picturesArray.push(attachment);
            }

            else {
                // Code to show attached files
                attachedFilesArray.push(attachment);
            }

        }

        setPictures(picturesArray)
        setAttachedFiles(attachedFilesArray)

    }, [])

    return (
        <div>
            {/* <ViewChatImages /> */}
            <div className={`grid grid-cols-2 gap-2 ${pictures.length !== 0 ? 'mb-2' : ""}`}>
                {

                    pictures.map((picture, index) =>
                        <div key={index} style={
                            {
                                backgroundImage: `url("${mediaUrl(picture)}")`,
                            }
                        } className="w-auto h-20 bg-cover bg-center">

                        </div>
                    )}

            </div>

            <div id="additionalFiles" >
                {
                    attachedFiles.map((filename, index) =>
                        <Link href={mediaUrl(filename)} className="AttachedFile flex gap-x-2 mb-2 items-center bg-gray-800/20 rounded-md" key={index}>
                            <FontAwesomeIcon icon={faFile} className="bg-gray-600/30 p-3 rounded-md" />
                            <p>{filename}</p>
                        </Link>
                    )
                }
            </div>
        </div>
    )

}