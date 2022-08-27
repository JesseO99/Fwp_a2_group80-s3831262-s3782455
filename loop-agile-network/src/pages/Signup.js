import Form from 'react-bootstrap/Form';
import React, {useContext, useState} from "react";
import "./Signup.css";
import {Button, Modal, Row} from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import {useFormik} from 'formik';
import {useNavigate} from "react-router-dom";
import {isFutureDate} from "../util/Util";
import {registerUser} from "../data/repository";
import {LoginUserContext} from "../App";


//Field Validations Using Formik
const validate = values => {
    const errors = {};

    //Validate Date of Birth
    if (!values.dob) {
        errors.dob = 'Required';
    } else if (isFutureDate(values.dob)) {
        errors.dob = 'Date of Birth cannot be a future date';
    }

    //Validate Password
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must have minimum of 6 characters';
    } else if (!values.rePassword) {
        errors.rePassword = 'Required';
    } else if (values.password !== values.rePassword) {
        errors.rePassword = 'Password you entered does not match';
    }

    return errors;
};

function Signup() {

    const loginUser = useContext(LoginUserContext);
    const navigate = useNavigate();
    //useState for DialogBox
    const [show, setShow] = useState(false);

    //Handle Open/Close DialogBox
    const handleClose = () => {
        setShow(false);
        navigate("/Feed");
    }
    const handleShow = () => setShow(true);

    const formik = useFormik({
        initialValues: {
            firstName: '', lastName: '', email: '',
        }, validate, onSubmit: values => {
            //Register New User, Save Login and Navigate to Feed Page
            registerUser(values);
            loginUser(values.email);
            handleShow();
            // navigate("/Feed");
        },
    });


    return (<div className="Signup">
        <div class="signup-form">
            <p id="signup-heading">Signup</p>
            <Form onSubmit={formik.handleSubmit}>
                <Row className="mb-3">
                    {/*// TODO Enable and Design Avatar*/}
                    {/*<div className="col-sm-3">*/}
                    {/*    <img className="rounded-circle" alt="Avatar" id="avatar"*/}
                    {/*         src={avatar}/>*/}
                    {/*</div>*/}
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control placeholder="First name"
                                      id="firstName"
                                      onChange={formik.handleChange}
                                      value={formik.values.firstName}
                                      type="text"
                                      required
                        />
                    </Col>
                    <Col>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control placeholder="Last name"
                                      id="lastName"
                                      onChange={formik.handleChange}
                                      value={formik.values.lastName}
                                      type="text"
                                      required
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"
                                          placeholder="Enter email"
                                          id="email"
                                          onChange={formik.handleChange}
                                          value={formik.values.email}
                                          required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="formGridDOB">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date"
                                          id='dob'
                                          onChange={formik.handleChange}
                                          value={formik.values.dob}
                                          required
                            />
                            {formik.errors.dob ? <div>{formik.errors.dob}</div> : null}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                      id="password"
                                      placeholder="Password"
                                      onChange={formik.handleChange}
                                      value={formik.values.password}
                                      required
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridRetypePassword">
                        <Form.Label>Retype Password</Form.Label>
                        <Form.Control type="password"
                                      id="rePassword"
                                      placeholder="Password"
                                      onChange={formik.handleChange}
                                      value={formik.values.rePassword}
                                      required
                        />
                        {formik.errors.rePassword ? <div>{formik.errors.rePassword}</div> : null}
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox"
                                label=" Confirm that you agree to our Terms & Privacy Policy."
                                required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        {/*DialogBox For Signup*/}
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Welcome!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you've Signed Up with Loop Agile Now!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Let's Start!
                </Button>
            </Modal.Footer>
        </Modal>
    </div>)
}

export default Signup;