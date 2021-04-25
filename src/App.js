import Header from './components/Header';
import Button from './components/Button';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import axios from 'axios';
import api from './components/api/api';
import { useState, useEffect } from 'react';
const App = (props) => {
	const [showAddTask, setShowAddTask] = useState(true);
	const [tasks, setTasks] = useState([]);
	const [text, setText] = useState('');
	const [day, setDay] = useState('');
	const [reminder, setReminder] = useState('No');
	useEffect(() => {
		const getTasks = async () => {
			// const tasksFromServer = await fetchTasks();
			// setTasks(tasksFromServer);
			const resp = await api.get('/tasks');
			setTasks(resp.data);
		};
		getTasks();
	}, []);
	// Fetch Tasks
	// const fetchTasks = async () => {
	// 	const res = await fetch('http://localhost:5000/tasks');
	// 	const data = await res.json();
	// 	console.log('data', data);
	// 	return data;
	// };
	//Delete Task
	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	//Add Task
	const addTask = async () => {
		const newTask = { text: text, day: day, reminder: reminder };
		// const id = Math.floor(Math.random() * 1000) + 1;
		// const newTask = { id, ...task };
		// setTasks([...tasks, newTask]);
		const resp = await api.post('/tasks', newTask);
		// setTasks([...tasks, resp.data]);
		console.log('resp', resp.data);
	};

	//Toggle Reminder
	const toggleReminder = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id
					? {
							...task,
							reminder: !task.reminder,
					  }
					: task
			)
		);
	};
	return (
		<div className="container">
			<Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
			{showAddTask && <AddTask onAdd={addTask} />}

			{tasks.length > 0 ? (
				<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
			) : (
				'No Tasks To Show'
			)}
		</div>
	);
};

export default App;
