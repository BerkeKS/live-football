import { useState } from 'react';
import { Form, FormControl, FormGroup, FormLabel, Button, Row, Col, Container, FormText } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UsernameLogin } from '../axios/service';
import toast from 'react-hot-toast';

const LoginuScreen = ({setUser}) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    return(
        <Container>
            <Row className='d-flex justify-content-center'>
                <Col xs={12} sm={9} md={9}>
                    <Form onSubmit={(e) => {
                        //To avoid auto refreshes
                        e.preventDefault()
                        UsernameLogin(formData).then((res) => {
                            localStorage.setItem('user', JSON.stringify(res.data))
                            setUser(res.data);
                            navigate("/");
                        }).catch((error) => {toast.error(error.response.data.message)})
                    }}>
                        <FormGroup className='mb-5' controlId='usernameInput'>
                            <FormLabel>Username</FormLabel>
                            <FormControl onChange={(input) => setFormData({...formData, username: input.target.value})} type='text' placeholder='Enter your username'/>
                        </FormGroup>
                        <FormGroup controlId='passwordInput'>
                            <FormLabel>Password</FormLabel>
                            <FormControl onChange={(input) => setFormData({...formData, password: input.target.value})} type='password' placeholder='Enter your password'/>
                        </FormGroup>
                        <Row>
                            <Col>
                                <p className='mt-4'><a href='logine'>Login with Your Email</a></p>
                            </Col>
                            <Col>
                            <Button disabled={formData.username === "" || formData.password === ""} className='mt-3' variant="primary" type="submit">Login</Button>
                            </Col>
                        </Row>
                        <FormGroup className='mt-3'>
                            <FormText>Don't have an account? <Link to="/register">Click here to register</Link></FormText>
                        </FormGroup>
                    </Form>  
                </Col>
            </Row>
        </Container>    
    );
}

export default LoginuScreen