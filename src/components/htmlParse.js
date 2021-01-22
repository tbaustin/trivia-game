import React from 'react'
import DOMPurify from 'dompurify'

export default function HTMLParse(props) {
	const sanitizer = DOMPurify.sanitize
	const { value } = props
	return (
		<div 
			dangerouslySetInnerHTML={{ __html: sanitizer(`<p>${value}</p>`) }} // to get &quot; to display correctly
		/>
	)
}