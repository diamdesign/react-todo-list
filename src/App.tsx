import React, { useState } from "react";
import { Todo } from "./components/Todo";

export function App() {
	const [todos, setTodos] = useState<{ id: number; text: string }[]>([]);
	const [todoInput, setTodoInput] = useState("");

	const addTodo = (text: string) => {
		if (text === "") {
			return;
		}
		const newTodo = { id: Date.now(), text };
		setTodos([...todos, newTodo]);
		setTodoInput("");
	};

	const deleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const updateTodo = (id: number, newText: string) => {
		setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
	};

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			addTodo(todoInput.trim());
		}
	};

	return (
		<>
			<div id="todos">
				<h1>Todos</h1>
				<input
					id="inputtodo"
					type="text"
					onChange={(e) => setTodoInput(e.target.value)}
					onKeyUp={handleKeyUp}
					value={todoInput}
				/>
				<div id="list">
					{todos.map((todo) => (
						<Todo
							key={todo.id}
							id={todo.id}
							text={todo.text}
							onDelete={deleteTodo}
							onUpdate={updateTodo}
						/>
					))}
				</div>
			</div>
		</>
	);
}
