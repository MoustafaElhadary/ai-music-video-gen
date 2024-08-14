import {customAlphabet} from 'nanoid';
import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789');

export function absoluteUrl(path: string): string {
	return `${process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'}${path}`;
}
export const timestamps: {createdAt: true; updatedAt: true} = {
	createdAt: true,
	updatedAt: true,
};
