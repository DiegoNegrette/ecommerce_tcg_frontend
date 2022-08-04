import React from "react";
import "../css/spinner.css";

const Spinner = ({ message }) => {
	return (
		<div className="container">
			<div className="spinner-container">
				<div className="spinner">
					<div></div>
					<div></div>
				</div>
				<p className="msg">{message}</p>
			</div>
		</div>
	);
};

Spinner.defaultProps = {
	message: "Loading...",
};

export default Spinner;
