import api from '../client';

export const getUsers = async () => {
    return await api.get("/api/users");
}

export const getUser = async (username) => {
    return await api.get(`/api/users/${username}`);

}

export const searchUsers = async (query) => {
    return await api.get(`/api/users/search/?query=${query}`);

}

export const editUser = async (token, body) => {
    return await api.put(`/api/users/me`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const followUser = async (token, userId) => {
    return await api.put(`/api/users/${userId}/follow`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getNotifications = async (userId) => {
    return await api.get(`/api/notifications/${userId}`);
}
