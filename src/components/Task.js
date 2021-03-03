import React from "react";

export default function Task({ strTask, strDescription, done }) {
	return (
		<div className="task mt-3 p-3 rounded d-block text-truncate">
			<h6 className="text-light">{ done ? <del>{ strTask }</del> : <span>{ strTask }</span> }</h6>
			<small className="text-info">{ done ? <del>{ strDescription }</del> : <span>{ strDescription }</span> }</small>
		</div>
	)
};
