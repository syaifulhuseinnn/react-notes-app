import { Container, Spinner } from "react-bootstrap";
export default function Loader() {
	return (
		<Container className="d-flex justify-content-center align-items-center" style={{height: "500px"}}>
			<Spinner animation="grow" variant="secondary" />
		</Container>
	)
};
