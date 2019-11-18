import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

type ActionDescriptionFormProps = {
	description: string,
	onDescriptionChange: (description: string) => void
}
export function ActionDescriptionForm(props: ActionDescriptionFormProps) {
	function handleEditorChange(content: any, editor: any) {
		console.log(`Editor changed! content: ${editor.getContent()}`);
		props.onDescriptionChange(editor.getContent());
	}


	return (
		<Editor
		initialValue={props.description}
		init={{
			height: 500,
			menubar: false,
			plugins: [
			'advlist autolink lists link image charmap print preview anchor',
			'searchreplace visualblocks code fullscreen',
			'insertdatetime media table paste code help wordcount'
			],
			toolbar:
			'undo redo | formatselect | bold italic backcolor | \
			alignleft aligncenter alignright alignjustify | \
			bullist numlist outdent indent | removeformat | help'
		}}
		onChange={handleEditorChange}
		/>);
};