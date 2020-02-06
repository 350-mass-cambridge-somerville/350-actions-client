import React, { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react'

export class ActionTextInput extends Component {
	handleEditorChange(content: any, editor: any) {
		console.log(`Editor changed!`)
	}
	render() {
		return (
			<Editor
				initialValue="<p>This is the initial content of the editor</p>"
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
				onChange={this.handleEditorChange}
			/>
		)
	}
}
