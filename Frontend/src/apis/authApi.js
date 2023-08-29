import api from '../client';

export const register = async (body) => {
    try {
        const response = await api.post("auth/register", body);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}

export const login = async (body) => {
    try {
        const response = await api.post("auth/login", body);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}

export const editUser = async (body) => {
    try {
        const response = await api.put("me/edit", body, {
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}

export const followUser = async (data) => {
    try {
        const response = await api.put("follow", data, {
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}

export const getUsers = async () => {
    try {
        const response = await api.get("users/");
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}

export const getUser = async (userId) => {
    try {
        const response = await api.get("users/userId");
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}