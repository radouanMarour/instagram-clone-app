import api from '../client';

export const createPost = async (token, data) => {
    return await api.post('/posts', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const editPost = async (data, postId, token) => {
    return await api.put(`/posts/${postId}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const deletePost = async (postId, token) => {
    return await api.delete(`/posts/${postId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getPost = async (postId) => {
    return await api.get(`/posts/${postId}`);
}
export const likePost = async (token, postId) => {
    return await api.put(`/posts/${postId}/like`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}
export const savePost = async (token, postId) => {
    return await api.post(`/posts/${postId}/save`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}
export const commentPost = async (token, postId, text) => {
    return await api.post(`/posts/${postId}/comment`, { text }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}


