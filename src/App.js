import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./css/style.css";
import Header from "./components/Header";
import Notes from "./components/Notes";
import Loader from "./components/Loader";
import AddNewNote from "./components/AddNewNote";

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [notes, setNotes] = useState([]);
	const [modal, setModal] = useState(false);
	
	const showModal = () => setModal(true);
	const closeModal = () => setModal(false);

	useEffect(() => {
		fetch("https://quiet-lake-04193.herokuapp.com/notes")
		.then(response => response.json())
		.then(results => {
			setIsLoading(false);
			setNotes(results);
		})
		.catch(error => console.log(error));
	}, []);

  return (
    <Container className="py-2">
			<Header showModal={showModal} /> 
			{ isLoading && <Loader /> }
			{ !isLoading && <Notes data={notes} setNotes={setNotes} /> }
			<AddNewNote modal={modal} setModal={setModal} closeModal={closeModal} notes={notes} setNotes={setNotes} />
		</Container>
  );
}

export default App;
