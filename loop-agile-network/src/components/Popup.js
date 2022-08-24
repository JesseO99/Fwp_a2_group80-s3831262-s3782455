import {Button} from "react-bootstrap";
import "./Popup.css";

function Popup (props) {

    return (
        <div className="popup">        
            <div className="Popup-Content">
                
                <p className="content">
                    {props.content}
                </p>
                
                <div className="options">
                    <Button className="cancel" variant="light" type = "button" value = "cancel" onClick={props.close}> Cancel</Button>
                    <Button className="confirm" variant="primary    " type = "button" value = "confirm" onClick={props.confirm}>Confirm</Button>
                </div>
            </div>
        </div>
    );
}

export default Popup;
