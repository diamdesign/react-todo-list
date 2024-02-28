import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
	const [todos, setTodos] = useState([]);
	const [editingIndex, setEditingIndex] = useState(-1);
	const [editedTodo, setEditedTodo] = useState("");
	const inputRef = useRef(null);

	useEffect(() => {
		// Focus the input field when the component mounts
		if (editingIndex !== -1 && inputRef.current) {
			inputRef.current.focus();
		}
	}, [editingIndex]);

	const handleAddTodo = (e) => {
		if (e.key === "Enter" && e.target.value.trim() !== "") {
			setTodos([...todos, e.target.value.trim()]);
			e.target.value = "";
		}
	};

	const handleEditTodo = (index) => {
		setEditingIndex(index);
		setEditedTodo(todos[index]);
	};

	const handleUpdateTodo = (index) => {
		if (editedTodo.trim() !== "") {
			const newTodos = [...todos];
			newTodos[index] = editedTodo.trim();
			setTodos(newTodos);
			setEditingIndex(-1);
		}
	};

	const handleDeleteTodo = (index) => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	return (
		<div id="todos">
			<h1>Todos</h1>
			<input type="text" placeholder="Add a todo..." onKeyUp={handleAddTodo} />
			<div id="list">
				{todos.map((todo, index) => (
					<div key={index}>
						{index === editingIndex ? (
							<input
								ref={inputRef}
								type="text"
								value={editedTodo}
								onChange={(e) => setEditedTodo(e.target.value)}
								onBlur={() => handleUpdateTodo(index)}
								onKeyUp={(e) => {
									if (e.key === "Enter") handleUpdateTodo(index);
								}}
							/>
						) : (
							<>
								{todo}
								<button onClick={() => handleEditTodo(index)}>Edit</button>
								<button onClick={() => handleDeleteTodo(index)}>Delete</button>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
