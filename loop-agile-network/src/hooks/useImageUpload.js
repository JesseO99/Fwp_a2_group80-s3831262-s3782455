import React, {useState} from 'react'
import warning from "../img/warning.png";

const UPLOAD_PRESET = "ek7vmpyj";
const CLOUD_NAME = "loopagilenow";
const UPLOAD_URL = "https://api.cloudinary.com/v1_1/loopagilenow/image/upload";

//Custom Hook for Image Upload
const useImageUpload = (callback, toastMessage) => {
    const [image, setImage] = useState("");

    //Make a promise to make an API call to Image upload
    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", UPLOAD_PRESET)
        data.append("cloud_name", CLOUD_NAME)
        fetch(UPLOAD_URL, {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                //Save Image URL once receive the response
                callback(data.url);
            })
            .catch(err => {
                console.log(err)
                toastMessage("Post Not Created!","There was an error of uploading your image. Please try again later!",warning)
            })
    }

    return {
        uploadImage,
        setImage,
        image
    }
};

export default useImageUpload;