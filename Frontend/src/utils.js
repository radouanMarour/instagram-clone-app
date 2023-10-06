import { formatDistanceToNow } from 'date-fns';

export const formatDate = (timestamp) => {
    const formattedDate = formatDistanceToNow(new Date(timestamp), {
        addSuffix: true,
    });

    return formattedDate;
}
