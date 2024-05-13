import { useEffect, useState } from 'react';
import { Form, FormControl, FormGroup, FormLabel, Button, Row, Col, Container, FormText } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Register } from '../axios/service';
import  toast  from 'react-hot-toast';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const RegisterScreen = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("")
    //The fields have to match with the fields in server code.
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: phoneNumber,
        password: "",
    });
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        if(formData.password.length >= 8 && formData.username.length >= 3){
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }
    }, [formData]);
    useEffect(() =>{
        setFormData({...formData, phoneNumber: phoneNumber})
    }, [phoneNumber])
    return(
        <Container>
            <Row>
                <Col>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    Register(formData).then((res) => {
                        toast.error(res.data.message)
                        navigate("/loginu");
                    }).catch((error) => {toast.error(error.response.data.message)})
                }}>
                    <FormGroup className='mb-2' controlId='usernameInput'>
                        <FormLabel>Username</FormLabel>
                        <FormControl onChange={(input) => setFormData({...formData, username: input.target.value})} type="text" placeholder="Enter Your Username" />
                    </FormGroup>
                    <FormGroup className='mb-2' controlId='emailInput'>
                        <FormLabel>Email</FormLabel>
                        <FormControl onChange={(input) => setFormData({...formData, email: input.target.value})} type="email" placeholder="Enter Your Email" />
                    </FormGroup>
                    <FormGroup className='mb-2'>
                    <FormLabel>Phone</FormLabel>
                        <PhoneInput value={phoneNumber} onChange={setPhoneNumber} defaultCountry='TR' placeholder="Enter Your Phone Number"/>
                    </FormGroup>
                    <FormGroup controlId='passwordInput'>
                        <FormLabel>Password</FormLabel>
                        <FormControl onChange={(input) => setFormData({...formData, password: input.target.value})} type="password" placeholder="Enter Your Password" />
                    </FormGroup>
                    <Button disabled={disabled} className='mt-3' variant="primary" type="submit">Register</Button>
                    <FormGroup className='mt-3'>
                            <FormText>Already have an account? <Link to="/loginu">Click here to login</Link></FormText>
                    </FormGroup>
                </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterScreen;