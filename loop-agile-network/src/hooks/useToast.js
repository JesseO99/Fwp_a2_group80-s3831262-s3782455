import {useState} from "react";
import usePost from "./usePost";


const useToast = () => {


    const [toast, setToast] = useState('');
    const [show, setShow] = useState(false);

    //Set toast message details
    function toastMessage(title, message,img){
        //Scroll Window to top
        window.scrollTo(0, 0);
        setShow(true);
        setToast({
            title: title,
            message: message,
            img: img
        })
    }

    return {
        toast,
        show,
        setShow,
        toastMessage
    }

};
export default useToast;