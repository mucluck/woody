import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Form, Checkbox, Input, Button } from "antd";

import { Header, Container } from "../../Layout";
import { actions } from "../../../store/actions";

class UnmappedEditTask extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();

		const { dispatch, form: { validateFields } } = this.props;

		validateFields((err, values) => {
			console.log(values);
			if (!err) {
				console.log(values);
			}
		});
	}

	render() {
		const { form: { getFieldDecorator }, match: { params: { id } }, state: { tasks } } = this.props;
		const { text: initialTextValue, status: initalStatusValue } = tasks.find(task => +task.id === +id);

		return (
			<>
				<Header />
				<Container >
					<Form onSubmit={this.handleSubmit}>
						<Form.Item label="Text">
							{getFieldDecorator("text", {
								rules: [
									{
										required: true,
										message: "Need to input tasks text",
									},
								],
								initialValue: initialTextValue,
							})(<Input.TextArea />)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator("status", { initialValue: !!+initalStatusValue })(<Checkbox>Completed</Checkbox>)}
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Save
							</Button>
						</Form.Item>
					</Form>
				</Container>
			</>
		);
	}
}

const EditTask = connect((state, ownProps) => {
	return {
		state,
		...ownProps,
	};
})(withRouter(Form.create({ name: "sign-in" })(UnmappedEditTask)));

export { EditTask };

UnmappedEditTask.propTypes = {
	form: PropTypes.object,
	match: PropTypes.object,
	state: PropTypes.object,
	dispatch: PropTypes.func,
};
