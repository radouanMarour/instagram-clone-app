import api from '../client';

export const register = (body) => {
    return api.post("http://localhost:5000/api/auth/signup", body);
}

export const login = async (body) => {
    return api.post("http://localhost:5000/api/auth/login", body);
}
