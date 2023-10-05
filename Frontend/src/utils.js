import { formatDistanceToNow } from 'date-fns';

export const formatDate = (timestamp) => {
    const formattedDate = formatDistanceToNow(new Date(timestamp), {
        addSuffix: true,
    });

    return formattedDate;
}

export const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://insta-clone-dxtn.onrender.com'
    : 'http://localhost:5000';