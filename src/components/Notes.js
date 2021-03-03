import React, { useState } from "react";
import Task from "./Task";
import DetailsNote from "./DetailsNote";

export default function Notes({ data, setNotes }) {
	const [modal, setModal] = useState(false);
	const [detailsNote, setDetailsNote] = useState(null);

	const showModal = (id) => {
		const details = data.filter(note => note.id === id);
		setDetailsNote(details);
		setModal(true);
	};

	const closeModal = () => setModal(false);

	const deleteNote = (id) => {
		const filterNote = data.filter(note => note.id !== id);
		setNotes(filterNote);

		fetch(`https://quiet-lake-04193.herokuapp.com/notes/${id}`, {
			method: "DELETE"
		})
		.then(response => response.json())
		.then(result => console.log("Data deleted ", result))
		.catch(error => console.log(error))
	}

	if(data.length > 0) {
		return (
			<>
			<div className="row">
				{
					data.map((note, index) => (
						<div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 p-3" key={index}>
							<div className="notes p-3 rounded">
								<div className="d-flex justify-content-between align-items-center">
									<h5 className="text-light">{ note.titleNote }</h5>
									<small className="text-primary icon-pointer" onClick={ () => showModal(note.id) }>View</small>
								</div>
									{
										note.tasks.slice(0, 3).map((task, index) => <Task key={index} strTask={task.strTask} strDescription={task.strDescription} done={task.isDone} /> )
									}
								<div className="d-flex justify-content-between mt-3">
									<small className="text-light text-center">{ note.tasks.length > 3 ? `${note.tasks.length - 3}+ tasks more` : "" }</small>
									<button className="btn btn-danger btn-sm" onClick={ () => deleteNote(note.id) }><i className='bx bxs-trash-alt'></i></button>
								</div>
							</div>
						</div>
					))
				}
			</div>
			<div>
				{ modal && <DetailsNote modal={modal} setModal={setModal} closeModal={closeModal} detailsNote={detailsNote} />}
			</div>
			</>
		)
	} else {
		return (
			<h3 className="text-center text-light">No data show</h3>
		)
	}
	
};
