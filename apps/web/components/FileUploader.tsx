'use client';

import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@web/components/ui/carousel';
import {cn} from '@web/lib/utils';
import {Trash2, X} from 'lucide-react';
import Image from 'next/image';
import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

interface FileUploaderProps {
	onChange: (files: File[]) => void;
	maxFiles?: number;
	acceptedFileTypes?: string[];
	initialFiles?: File[];
}

export function FileUploader({
	onChange,
	maxFiles = 10,
	acceptedFileTypes = ['image/*'],
	initialFiles = [],
}: FileUploaderProps): React.ReactNode {
	const [files, setFiles] = useState<File[]>(initialFiles);
	const [previewIndex, setPreviewIndex] = useState<number | null>(null);
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
			setFiles(newFiles);
			onChange(newFiles);
		},
		[maxFiles, files, onChange],
	);

	const {getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop,
		accept: acceptedFileTypes.reduce((acc, curr) => ({...acc, [curr]: []}), {}),
		maxFiles,
	});

	const removeFile = (index: number): void => {
		setFiles((prev) => {
			const newFiles = prev.filter((_, i) => i !== index);
			onChange(newFiles);
			return newFiles;
		});
	};

	const handlePreview = {
		open: (index: number): void => {
			setPreviewIndex(index);
		},
		close: (): void => {
			setPreviewIndex(null);
		},
		next: (): void => {
			setPreviewIndex((prev) =>
				prev === null || prev === files.length - 1 ? 0 : prev + 1,
			);
		},
		prev: (): void => {
			setPreviewIndex((prev) =>
				prev === null || prev === 0 ? files.length - 1 : prev - 1,
			);
		},
	};
	const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>): void => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (e.target === e.currentTarget) {
			handlePreview.close();
		}
	};

	useEffect(() => {
		setFiles(initialFiles);
		onChange(initialFiles);
	}, [initialFiles, onChange]);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<div className="space-y-4">
			<div
				{...getRootProps()}
				className={cn(
					'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
					isDragActive
						? 'border-primary bg-primary/10'
						: 'border-gray-300 hover:border-primary',
				)}
			>
				<input {...getInputProps()} />
				<p>Drag & drop some files here, or click to select files</p>
				<p className="text-sm text-gray-500 mt-2">
					(Only {acceptedFileTypes.join(', ')} files will be accepted)
				</p>
			</div>

			{files.length > 0 && (
				<div className="space-y-4">
					<h3 className="font-semibold">Selected Files:</h3>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
						{files.map((file, index) => (
							<div key={index} className="relative group">
								{file?.type?.startsWith('image/') ? (
									<Image
										src={URL.createObjectURL(file)}
										alt={file.name}
										width={200}
										height={200}
										className="rounded-lg object-cover w-full h-40 cursor-pointer"
										onClick={() => handlePreview.open(index)}
									/>
								) : (
									<div className="rounded-lg bg-gray-100 w-full h-40 flex items-center justify-center">
										<p className="text-sm text-gray-500">{file.name}</p>
									</div>
								)}
								<button
									onClick={() => removeFile(index)}
									className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-100 transition-opacity"
								>
									<Trash2 size={16} />
								</button>
							</div>
						))}
					</div>
				</div>
			)}

			{previewIndex !== null && (
				<div
					className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
					onClick={handleOutsideClick}
				>
					<div
						className="relative w-full h-full max-w-3xl max-h-[80vh] m-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={handlePreview.close}
							className="absolute top-4 right-4 text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700 z-10"
						>
							<X size={24} />
						</button>
						<Carousel setApi={setApi} className="w-full h-full">
							<CarouselContent>
								{files.map((file, index) => (
									<CarouselItem key={index}>
										<div className="w-full h-full flex items-center justify-center">
											<Image
												src={URL.createObjectURL(file)}
												alt={file.name}
												width={800}
												height={600}
												className="max-w-full max-h-full object-contain"
											/>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							{files.length > 1 && (
								<>
									<CarouselPrevious />
									<CarouselNext />
								</>
							)}
						</Carousel>
						<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 py-2 px-4 bg-black bg-opacity-50 rounded-full text-white text-sm">
							{current} of {count}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
