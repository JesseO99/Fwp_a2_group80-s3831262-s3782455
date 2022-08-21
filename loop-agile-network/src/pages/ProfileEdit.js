import "./ProfileEdit.css";
import {Navigate, useNavigate} from "react-router-dom";
import {getUserDetails, updateUser} from "../data/repository";
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import {useState} from "react";


function ProfileEdit(props) {
    const user = getUserDetails(props.username);
    const [firstName, setFirstName] = useState(user.firstName);
    const [email, setEmail] = useState(user.email);
    const [lastName, setLastName] = useState(user.lastName);
    const navigate = useNavigate();

    //Authenticate and Redirect if not Logged in
    if (!props.username) {
        return <Navigate to="/" />
    }

    
    

    function onChangeFirstName(e)
    {
        setFirstName(e.target.value);
    }

    function onChangeLastName(e)
    {
        setLastName(e.target.value);
    }
    
    function onChangeEmail(e)
    {
        setEmail(e.target.value);
    }




    function onSubmit ()
    {
        props.loginUser(email);
        updateUser(user.email, email, firstName, lastName);
        navigate("/Profile");
    }

   
    

    

    return (
        <div className="Profile-Edit-Container">
            {user.img === null ? 
            (<img className="Profile-Pic" src="https://img.icons8.com/ios/100/000000/gender-neutral-user.png" alt="Profile picture"></img>):
            (<img className="Profile-Pic" src={user.img} alt="Profile picture"></img>)}

            <div className="Input Fields">
                <h1>
                    Edit Profile
                </h1>

                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="firstName" onChange={onChangeFirstName} >
                        <Form.Label>First Name</Form.Label> <br></br>
                        <Form.Control type="text" placeholder="Enter FirstName" value={firstName} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName" onChange={onChangeLastName}> 
                        <Form.Label>Last Name</Form.Label> <br></br>
                        <Form.Control type="text" placeholder="Enter FirstName" value={lastName}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail" onChange={onChangeEmail}  >
                        <Form.Label>Email Address</Form.Label> <br></br>
                        <Form.Control type="email" placeholder="Enter email" value={email} />
                    </Form.Group>





                    {/* <Form.Group className="mb-3" controlId="formBasicPassword" onChange={onChangePassword}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group> */}
                   <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
            
            <div className="Previous-Details">
                <h3>Temporary Testing box</h3>
                <p>
                    Email: {user.email}<br></br>
                    first Name: {user.firstName} <br></br>
                    lastName: {user.lastName} <br></br>
                    date joined: {user.date_joined}<br></br>
                    dob: {user.dob} <br></br>
                    password: {user.password}
                </p>


            </div>

            
        </div>
    );
};

export default ProfileEdit;
