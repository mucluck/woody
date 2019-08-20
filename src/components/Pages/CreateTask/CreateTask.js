import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Col, Row, message } from "antd";
import PropTypes from "prop-types";

import { Header, Container } from "../../Layout";
import { actions } from "../../../store/actions";

const colStyle = {
	padding: "0 1rem",
};

class UnmappedCreateTask extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();

		const { dispatch, form: { validateFields } } = this.props;

		validateFields((err, values) => !err && dispatch(actions.cretaeTask({ task: values })));
	}

	render() {
		const { form: { getFieldDecorator }, state: { taskCreation, error }, dispatch } = this.props;

		return (
			<>
				{ error && message.error(error, 3, () => dispatch(actions.clearError())) }
				<Header />
				<Container >
					<Form onSubmit={this.handleSubmit}>
						<Row type="flex">
							<Col span={12} style={ colStyle }>
								<Form.Item label="User Name">
									{getFieldDecorator("username", {
										rules: [
											{
												required: true,
												message: "Please input user name!",
											},
										],
									})(<Input />)}
								</Form.Item>
							</Col>
							<Col span={12} style={ colStyle }>
								<Form.Item label="E-mail">
									{getFieldDecorator("email", {
										rules: [
											{
												required: true,
												message: "Please input email!",
											},
										],
									})(<Input type={ "email" } />)}
								</Form.Item>
							</Col>
							<Col span={24}>
								<Form.Item label="Text" style={ colStyle }>
									{getFieldDecorator("text", {
										rules: [
											{
												required: true,
												message: "Please input task text!",
											},
										],
									})(<Input.TextArea rows={ 10 } />)}
								</Form.Item>
							</Col>
							<Form.Item>
								<Button type={ "primary" } htmlType={ "submit" } loading={ taskCreation }>
									Create
								</Button>
							</Form.Item>
						</Row>
					</Form>
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
})(Form.create({ name: "create" })(UnmappedCreateTask));

export { CreateTask };

UnmappedCreateTask.propTypes = {
	state: PropTypes.object,
	form: PropTypes.object,
	dispatch: PropTypes.func,
};
