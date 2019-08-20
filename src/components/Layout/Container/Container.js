import React from "react";
import PropTypes from "prop-types";

import "./Container.scss";

export function Container(props) {
	return (
		<div className={ "container" }>
			{ props.children }
		</div>
	);
}

Container.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array,
	]),
};
