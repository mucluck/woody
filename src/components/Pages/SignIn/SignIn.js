import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row } from "antd";

import { Form, Icon, Input, Button } from "antd";

import { Header, Container } from "../../Layout";

class UnmappedSignIn extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {

	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<>
				<Header />
				<Container >
					<Row>
						<Form layout={ "inline" } onSubmit={this.handleSubmit} className={ "login-form" }>
							<Form.Item>
								{getFieldDecorator("username", {
									rules: [
										{
											required: true,
											message: "Input your username!",
										},
									],
								})(
									<Input
										prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
										placeholder={ "Username" }
									/>,
								)}
							</Form.Item>
							<Form.Item>
								{getFieldDecorator("password", {
									rules: [
										{
											required: true,
											message: "Input your Password!",
										},
									],
								})(
									<Input
										prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
										type="password"
										placeholder="Password"
									/>,
								)}
							</Form.Item>
							<Form.Item>
								<Button type="primary" htmlType="submit" className="login-form-button">
									Log in
								</Button>
							</Form.Item>
						</Form>
					</Row>
				</Container>
			</>
		);
	}
}

const SignIn = connect((state, ownProps) => {
	return {
		state,
		...ownProps,
	};
})(Form.create({ name: "normal_login" })(UnmappedSignIn));

export { SignIn };

UnmappedSignIn.propTypes = {
	form: PropTypes.object,
	dispatch: PropTypes.func,
};
