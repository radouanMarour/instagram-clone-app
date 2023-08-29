import api from '../client';

export const createPost = async (data) => {
    try {
        const response = await api.post('create/post', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}

export const editPost = async (data) => {
    try {
        const response = await api.put("posts/postId", data, {
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

export const deletePost = async () => {
    try {
        const response = await api.delete("posts/postId", {
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

export const getPosts = async () => {
    try {
        const response = await api.get("posts/");
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}

export const getPost = async (postId) => {
    try {
        const response = await api.get("posts/postId");
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}


