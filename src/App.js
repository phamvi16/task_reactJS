import Header from './components/Header';
import Button from './components/Button';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState } from 'react';
const App = (props) => {
	const [showAddTask, setShowAddTask] = useState(true);
	const [tasks, setTasks] = useState([
		{
			id: 1,
			text: 'Doctors Appointment',
			day: 'Feb 5th at 2:30pm',
			reminder: true,
		},
		{
			id: 2,
			text: 'Software Technology',
			day: 'Jan 6th at 2:30pm',
			reminder: true,
		},
		{
			id: 3,
			text: 'Information System',
			day: 'Feb 5th at 2:30pm',
			reminder: false,
		},
	]);

	//Delete Task
	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	//Add Task
	const addTask = (task) => {
		const id = Math.floor(Math.random() * 1000) + 1;
		const newTask = { id, ...task };
		setTasks([...tasks, newTask]);
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
