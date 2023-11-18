import React, { useState, useEffect, ReactEventHandler } from 'react';
import { Button, Image, Input } from '@nextui-org/react';
import axios from 'axios';
import NextJsImage from '../NextJsImage';
import PhotoAlbum from 'react-photo-album';

interface ButtonUploadProps {
	readonly onChange: (e: any) => void;
	readonly form: any;
}

interface IImagePreview {
	src: string;
	width: number;
	height: number;
}
const imagePreviewsDefault = [{ src: '', width: 0, height: 0 }];

const ButtonUpload = ({ onChange, form }: ButtonUploadProps) => {
	const [image, setImage] = React.useState<File[]>([]); // Specify File type for 'image'
	const [imagePreviews, setImagePreviews] = useState<IImagePreview[]>([]); // Specify string type for 'imagePreviews'

	// useEffect(() => {
	// 	if (form.photos) {
	// 		//form to File
	// 		const imageData = form.photos;
	// 		//convert imageData from src to File
	// 		setImage(imageData);

	// 		setImagePreviews(form.photos.map((photo: any) => ({ src: photo, width: 4, height: 3 })));
	// 	}
	// }, [form.photos]);

	const handleMultipleImage = (event: any) => {
		const files = [...event.target.files];
		setImage(files);
		console.log(files);
		const previews: any = [];
		files.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				previews.push(reader.result);
				if (previews.length === files.length) {
					setImagePreviews(previews.map((preview: IImagePreview) => ({ src: preview, width: 4, height: 3 })));
				}
			};
			reader.readAsDataURL(file);
		});
		onChange({ target: { name: 'photos', value: files } });
	};

	const handleRemoveImage = () => {
		const files: any[] | ((prevState: File[]) => File[]) = [];
		setImage(files);

		setImagePreviews([]);
	};

	return (
		<div className='w-full flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				<input
					id='fileSelect'
					type='file'
					multiple
					onChange={handleMultipleImage}
					accept='image/*'
					className='text-sm custom-image-upload'
					hidden
				/>
				<div className='flex gap-4 items-center text-sm text-chocolate/80'>
					<label htmlFor='fileSelect' className='button-30 font-bold text-sm'>
						Upload
					</label>
				</div>
				{imagePreviews.length != 0 && (
					<button className='text-sm font-bold button-29' onClick={handleRemoveImage}>
						Remove
					</button>
				)}
			</div>
			<PhotoAlbum
				layout='rows'
				photos={imagePreviews}
				renderPhoto={NextJsImage}
				defaultContainerWidth={400}
				sizes={{ size: 'calc(100vw - 240px)' }}
			/>
			{imagePreviews.length == 0 && <h4 className='font-bold text-center text-default-400'>NO IMAGE UPLOADED</h4>}
		</div>
	);
};

export default ButtonUpload;
