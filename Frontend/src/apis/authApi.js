import api from '../client';

export const register = (body) => {
    return api.post("/auth/signup", body);
}

export const login = async (body) => {
    return api.post("/auth/login", body);
}
