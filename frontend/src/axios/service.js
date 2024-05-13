import axios from 'axios';

const HTTP = axios.create({
    baseURL: 'http://localhost:5000',
})

export const UsernameLogin = async (formData) => await HTTP.post('/users/loginu', formData);
export const EmailLogin = async (formData) => await HTTP.post('/users/logine', formData);
export const Register = async (formData) => await HTTP.post('/users/register', formData);