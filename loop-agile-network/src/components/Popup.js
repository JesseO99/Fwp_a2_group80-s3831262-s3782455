import {Button} from "react-bootstrap";
import "./Popup.css";

// Popup Component is a generic popup component which takes: 
// a message under content parameter 
// a cancel action under the close parameter and 
// a confirmation action under the confirm parameter
function Popup(props) {

    return (
        <div className="popup">
            <div className="Popup-Content">

                <p className="content">
                    {props.content}
                </p>

                <div className="options">
                    <Button className="cancel" variant="light" type="button" value="cancel"
                            onClick={props.close}> Cancel</Button>
                    <Button className="confirm" variant="primary    " type="button" value="confirm"
                            onClick={props.confirm}>Confirm</Button>
                </div>
            </div>
        </div>
    );
}

export default Popup;
