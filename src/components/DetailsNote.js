import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function DetailsNote({ modal, setModal, closeModal, detailsNote }) {
	const [isUpdate, setIsUpdate] = useState(false);
	const [titleNote, setTitleNote] = useState(detailsNote[0].titleNote);
	const [tasks, setTasks] = useState(detailsNote[0].tasks);

	const updateNote = () => setIsUpdate(true);

	const saveUpdate = (event) => {
		event.preventDefault();
		const id = detailsNote[0].id;
		let updatedNote = { titleNote: titleNote, tasks: tasks };
		setModal(false);
		putData(updatedNote, id);
	}

	const handleTitleChange = (event) => {
		const newTitle = detailsNote[0];
		newTitle.titleNote = event.target.value;
		setTitleNote(newTitle);
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

	const addTask = () => {
		const taskId = tasks.length + 1;
		const note = detailsNote[0];
		const newTask = { id: `Task ${taskId}`, strTask: "", strDescription: "", isDone: false };
		const newData = [...tasks, newTask];
		note.tasks = newData;
		setTasks(newData);
	}

	const removeTask = (task_id) => {
		const id = detailsNote[0].id;
		const taskId = tasks.length - 1;
		console.log(taskId);
		const filterTask = tasks.filter(task => task.id !== task_id);
		detailsNote[0].tasks = filterTask;
		setTasks(filterTask);
		// console.log(tasks)
		const updatedNote = { id: `Task ${taskId}`, titleNote: titleNote, tasks: filterTask };
		putData(updatedNote, id);
	}

	const checkboxTask = (event, task_id) => {
		const id = detailsNote[0].id;
		const copyTask = [...tasks];
		const findTask = copyTask.findIndex(task => task.id === task_id);
		copyTask[findTask].isDone = event.target.checked;
		setTasks(copyTask);
		const updatedNote = { titleNote: titleNote, tasks: copyTask };
		putData(updatedNote, id);
	}

	const putData = (data, id) => {
		fetch(`https://quiet-lake-04193.herokuapp.com/notes/${id}`, {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(result => {
			console.log("Data updated", result);
		})
		.catch(error => console.log(error))
	}

	if(detailsNote !== null) {
		return (
			<Form onSubmit={ saveUpdate }>
				<Modal show={modal} onHide={closeModal} dialogClassName="modal-fullscreen-sm-down" contentClassName="bg-dark" scrollable={true}>
					<Modal.Header className="border-primary" closeButton>
						<Modal.Title className="text-light">{ isUpdate ? "Update Note" : detailsNote[0].titleNote }</Modal.Title>
					</Modal.Header>
					<Modal.Body className="text-light">
						{ 
							isUpdate &&
							<>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control type="text" defaultValue={ titleNote } onChange={ (event) => handleTitleChange(event) } />
							</Form.Group>
								{
									tasks.map((task, index) => (
										<Form.Group>
											<div className="d-flex justify-content-between">
												<div>
													<Form.Label>{ task.id }</Form.Label>
												</div>
												<div>
													<i className='bx bx-x text-warning icon-pointer-rounded' onClick={ () => removeTask(task.id) } ></i>
												</div>
											</div>
											<div className="task rounded p-3">
												<Form.Control type="text" defaultValue={ task.strTask } onChange={ (event) => handleChangeTask(event, task.id) } className="text-light mb-3 p-0 border-top-0 border-right-0 border-left-0 rounded-0 border-secondary outline-off bg-transparent" placeholder="Task" />
												<Form.Control type="text" defaultValue={ task.strDescription } onChange={ (event) => handleChangeDescription(event, task.id) } className="text-info p-0 border-top-0 border-right-0 border-left-0 rounded-0 border-secondary outline-off bg-transparent" placeholder="Description" />
											</div>
										</Form.Group>
									))
								}
								<Button variant="success" size="sm" onClick={ () => addTask() }><i className='bx bx-plus'></i> Task</Button>
							</>
						}
						{
							!isUpdate &&
							tasks.map((task, index) => (
								<div key={index}>
									<div className="d-flex justify-content-between">
										<div>{ task.id }</div>
										<div>
											<i className='bx bx-x text-warning icon-pointer-rounded' onClick={ () => removeTask(task.id) } ></i>
										</div>
									</div>
									<div className="task my-3 p-3 rounded">
										<div className="d-flex justify-content-between">
											<div className="align-self-center">
												<Form.Check type="checkbox" checked={ task.isDone ? "checked" : "" } onChange={ (event) => checkboxTask(event, task.id) } />
											</div>
											<div className="flex-grow-1 mx-3">
												<h6 className="text-light">{ task.isDone ? <del>{ task.strTask }</del> : <span>{ task.strTask }</span> }</h6>
												<small className="text-info">{ task.isDone ? <del>{ task.strDescription }</del> : <span>{ task.strDescription }</span> }</small>
											</div>
										</div>
									</div>
								</div>
							))
						}
					</Modal.Body>
					<Modal.Footer className="text-light border-primary">
						<Button variant="secondary" onClick={closeModal}>
							Close
						</Button>
						<Button variant={ isUpdate ? "primary" : "success" } type={ isUpdate ? "submit" : "button"} onClick={ isUpdate ? saveUpdate : updateNote }>
							{ isUpdate ? "Save Changes" : "Update" }
						</Button>
					</Modal.Footer>
				</Modal>
			</Form>
		)
	}
};
