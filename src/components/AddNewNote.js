import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function AddNewNote({modal, setModal, closeModal, notes, setNotes}) {
	const [taskId, setTaskId] = useState(1);
	const [titleNote, setTitleNote] = useState("");
	const [tasks, setTasks] = useState([{ id: `Task ${taskId}`, strTask: "", strDescription: "", isDone: false }]);

	const addNewNote = (event) => {
		event.preventDefault();
		const newNote = { titleNote: titleNote, tasks: tasks }
		setModal(false);
		fetch("https://quiet-lake-04193.herokuapp.com/notes", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(newNote)
		})
		.then(response => response.json())
		.then(result => {
			console.log("Data added: ", result);
			setNotes([...notes, result]);
		})
		.catch(error => console.log(error))
	}

	const addTask = () => {
		const task_id = tasks.length + 1;
		const newTask = { id: `Task ${task_id}`, strTask: "", strDescription: "", isDone: false };
		setTaskId(task_id);
		setTasks([...tasks, newTask]);
	}

	const removeTask = (id) => {
		const task_id = tasks.length - 1;
		const filterTask = tasks.filter(task => task.id !== id);
		setTaskId(task_id);
		setTasks(filterTask);
	}

	const handleChangeTask = (event, id) => {
		const newData = [...tasks];
		const findTasks = newData.findIndex(task => task.id === id);
		newData[findTasks].strTask = event.target.value;
		setTasks(newData);
	}

	const handleChangeDescription = (event, id) => {
		const newData = [...tasks];
		const findTasks = newData.findIndex(task => task.id === id);
		newData[findTasks].strDescription = event.target.value;
		setTasks(newData);
	}

	return(
		<Form onSubmit={ addNewNote }>
			<Modal show={modal} onHide={closeModal} dialogClassName="modal-fullscreen-sm-down" contentClassName="bg-dark" scrollable={true}>
				<Modal.Header className="border-primary" closeButton>
					<Modal.Title className="text-light">New Note</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-light">
					<Form.Group>
						<Form.Label>Title</Form.Label>
						<Form.Control type="text" onChange={ (event) => setTitleNote(event.target.value) } />
					</Form.Group>
					{
						tasks.map((task, index) => (
							<Form.Group key={index}>
								<div className="d-flex justify-content-between">
									<div>
										<Form.Label>{ task.id }</Form.Label>
									</div>
									<div>
										<i className='bx bx-x text-warning icon-pointer-rounded' onClick={ () => removeTask(task.id) } ></i>
									</div>
								</div>
								<div className="task rounded p-3">
									<Form.Control type="text" onChange={ (event) => handleChangeTask(event, task.id) } className="text-light mb-3 p-0 border-top-0 border-right-0 border-left-0 rounded-0 border-secondary outline-off bg-transparent" placeholder="Task" />
									<Form.Control type="text" onChange={ (event) => handleChangeDescription(event, task.id) } className="text-info p-0 border-top-0 border-right-0 border-left-0 rounded-0 border-secondary outline-off bg-transparent" placeholder="Description" />
								</div>
							</Form.Group>
						))
					}
					<Button variant="success" size="sm" onClick={ addTask }><i className='bx bx-plus'></i> Task</Button>
				</Modal.Body>
				<Modal.Footer className="text-light border-primary">
					<Button variant="secondary" onClick={closeModal}>
						Close
					</Button>
					<Button variant="primary" type="submit" onClick={ addNewNote }>
						Add
					</Button>
				</Modal.Footer>
			</Modal>
		</Form>
	)
};
