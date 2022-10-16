import './OneTimeCodeAuthentification.css';
import {useState} from "react"
import emailjs from 'emailjs-com'
import {Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form';


// Form requires dictionary with to_email, to_name and a code
function sendEmail(e) {
    const SERVICE_ID = 'service_38hrlua';
    const API_KEY = 'vCWztD5Zrphv-x4zU';
    const TEMPLATE_ID = 'template_i4d4on8';
    // Bellow line is disabled due to not sending emails every time uncomment line for email functionality. 
    // You can check local storage under MFA key to get the necesarry login code
    emailjs.send(SERVICE_ID, TEMPLATE_ID, e, API_KEY);
}

function OneTimeCodeAuthentification(props) {
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);


    // Tracks Users Entry
    function onChangeCodeEntry(e) {
        setCode(e.target.value);
    }

    function onSubmit() {
        let authenticated = false;
        // Allow Access to the page
        if (code.length === 6) {
            authenticated = props.onSubmit(parseInt(code));
        }
        // If not authenticated display error Message
        if (!authenticated) {
            setError(true);
        }

    }


    return (
        <div className="MFA-Component">

            <div className="MFA-Content">
                <h3>Email Verfication</h3>
                <p>An email has been sent to the linked account with a verification code</p>
                {error &&
                    <p className="error">Error: this is not the correct code. The code is a 6 digit number connected to
                        the email</p>}
                <Form.Label>Verfication Code: </Form.Label>
                <div className='form-box'>
                    <Form.Control className="Code-Box" type="text" onChange={onChangeCodeEntry}/>
                    <Button onClick={onSubmit}>Submit</Button>
                </div>

            </div>

        </div>
    )
}

export {
    sendEmail
}
export default OneTimeCodeAuthentification;