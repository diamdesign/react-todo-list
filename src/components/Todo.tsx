import React, { useState } from "react";

interface TodoProps {
	id: number;
	text: string;
	onDelete: (id: number) => void;
	onUpdate: (id: number, newText: string) => void;
}

export function Todo({ id, text, onDelete, onUpdate }: TodoProps): React.ReactElement {
	const [isEditing, setIsEditing] = useState(false);
	const [updatedText, setUpdatedText] = useState(text);

	const handleDelete = () => {
		onDelete(id);
	};

	const handleUpdate = () => {
		onUpdate(id, updatedText);
		setIsEditing(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedText(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleUpdate();
		}
	};

	return (
		<div>
			{isEditing ? (
				<input
					type="text"
					value={updatedText}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					autoFocus
				/>
			) : (
				<>
					<span>{text}</span>
					<button onClick={() => setIsEditing(true)}>Edit</button>
				</>
			)}
			<button onClick={handleDelete}>Delete</button>
		</div>
	);
}
