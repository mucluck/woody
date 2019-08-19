import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Header, Container } from "../../Layout";
import { actions } from "../../../store/actions";

class UnmappedCreateTask extends Component {
	render() {
		return (
			<>
				<Header />
				<Container >
					Create Task
				</Container>
			</>
		);
	}
}

const CreateTask = connect((state, ownProps) => {
	return {
		state,
		...ownProps,
	};
})(UnmappedCreateTask);

export { CreateTask };

UnmappedCreateTask.propTypes = {
	state: PropTypes.object,
	dispatch: PropTypes.func,
};
