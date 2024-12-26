import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getRelativeTime(date: string): string {
    const now = new Date();
    const pastDate = new Date(date); // Convert string to Date object

    if (isNaN(pastDate.getTime())) {
        return "Invalid date";
    }

    const secondsAgo = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

    const units = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "week", seconds: 604800 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
    ];

    for (const unit of units) {
        const interval = Math.floor(secondsAgo / unit.seconds);
        if (interval >= 1) {
            return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
        }
    }
    return "just now";
}


export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const checkIsLiked = (likeList: string[], userId: string) => {
    return likeList.includes(userId);
    //it returns a boolean value , checking if the user has already liked the post or not .
    //To be more precise it is checking if the userId is in that array or not .

};
