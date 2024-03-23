import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getRelativeTime(timestamp: string): string {
    const now: Date = new Date();
    const postDate: Date = new Date(timestamp);

    const timeDiff: number = now.getTime() - postDate.getTime();
    const seconds: number = Math.floor(timeDiff / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);

    if (days > 1) {
        return `${days} days ago`;
    } else if (days === 1) {
        return '1 day ago';
    } else if (hours > 1) {
        return `${hours} hours ago`;
    } else if (hours === 1) {
        return '1 hour ago';
    } else if (minutes > 1) {
        return `${minutes} minutes ago`;
    } else if (minutes === 1) {
        return '1 minute ago';
    } else {
        return 'just now';
    }
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const checkIsLiked = (likeList: string[], userId: string) => {
    return likeList.includes(userId);
    //it returns a boolean value , checking if the user has already liked the post or not .
    //To be more precise it is checking if the userId is in that array or not .

};
