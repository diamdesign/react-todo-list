import React, { useState, useRef } from "react";
import "./App.css";

function App() {
	const [todos, setTodos] = useState([]);
	const [editingIndex, setEditingIndex] = useState(-1);
	const inputRef = useRef(null);

	const handleKeyUp = (e) => {
		if (e.key === "Enter") {
			setTodos([...todos, e.target.value]);
			e.target.value = "";
		}
	};

	const editTodo = (index) => {
		setEditingIndex(index);
		setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.focus();
			}
		}, 0);
	};

	const updateTodo = (index, newValue) => {
		const newTodos = [...todos];
		newTodos[index] = newValue;
		setTodos(newTodos);
		setEditingIndex(-1);
	};

	const deleteTodo = (index) => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	return (
		<>
			<div id="todos">
				<h1>Todos</h1>
				<input
					type="text"
					onKeyUp={(e) => {
						handleKeyUp(e);
					}}
				/>
				<div id="list">
					{todos.map((todo, index) => (
						<div key={index}>
							{index === editingIndex ? (
								<input
									ref={inputRef}
									type="text"
									value={todo}
									onChange={(e) => updateTodo(index, e.target.value)}
									onBlur={() => setEditingIndex(-1)}
									onKeyUp={(e) => {
										if (e.key === "Enter") {
											updateTodo(index, e.target.value);
										}
									}}
								/>
							) : (
								<>
									{todo}
									<button onClick={() => editTodo(index)}>Edit</button>
									<button onClick={() => deleteTodo(index)}>Delete</button>
								</>
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default App;
