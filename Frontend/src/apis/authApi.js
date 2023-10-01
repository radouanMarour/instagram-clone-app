import api from '../client';

export const register = (body) => {
    return api.post("/api/auth/signup", body);
}

export const login = async (body) => {
    return api.post("/api/auth/login", body);
}
