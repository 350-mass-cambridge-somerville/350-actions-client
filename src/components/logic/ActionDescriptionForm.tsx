import React, { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react'

type ActionDescriptionFormProps = {
	description: string
	onDescriptionChange: (description: string) => void
}
export function ActionDescriptionForm(props: ActionDescriptionFormProps) {
	function handleEditorChange(content: any, editor: any) {
		props.onDescriptionChange(editor.getContent())
	}

	return (
		<Editor
			apiKey="ruxm5an3zwf6qpwnuxukv52k4sbqdzrfv2548zofud2i46k6"
			initialValue={
				props.description ? props.description : 'Enter action description.'
			}
			init={{
				height: 500,
				menubar: false,
				plugins: [
					'advlist autolink lists link image charmap print preview anchor',
					'searchreplace visualblocks code fullscreen',
					'insertdatetime media table paste code help wordcount',
				],
				toolbar:
					'undo redo | formatselect | bold italic backcolor | \
			alignleft aligncenter alignright alignjustify | \
			bullist numlist outdent indent | removeformat | help',
			}}
			onChange={handleEditorChange}
		/>
	)
}
