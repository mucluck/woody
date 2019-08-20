import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames";

import { actions } from "../../../store/actions";
import "./SignIn.scss";

const signInStyle = {
	display: "flex",
	alignItems: "center",
};

export class UnmappedSignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpened: false,
			width: 0,
		};

		this.handleShow = this.handleShow.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSignOut = this.handleSignOut.bind(this);
	}

	handleShow() {
		this.setState({ isOpened: !this.state.isOpened });
	}

	handleSignOut() {
		const { dispatch } = this.props;

		dispatch(actions.signOut());
		this.handleShow();
	}

	handleSubmit(event) {
		event.preventDefault();

		const { dispatch, form: { validateFields } } = this.props;

		validateFields((err, values) => !err && dispatch(actions.signIn(values)));
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { state: { loadingSignIn, token }, extra } = this.props;

		return (
			<div style={ signInStyle }>
				{!token && <div className={ cn("sign-in-wrapper", { "is-hidden": !this.state.isOpened }) }>
					<Form layout={ "inline" } onSubmit={this.handleSubmit} className={ "login-form" }>
						<Form.Item help={ false }>
							{getFieldDecorator("username", {
								rules: [
									{
										required: true,
										message: "",
									},
								],
							})(
								<Input
									prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
									placeholder={ "Username" }
								/>,
							)}
						</Form.Item>
						<Form.Item help={ false }>
							{getFieldDecorator("password", {
								rules: [
									{
										required: true,
										message: "",
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
							<Button
								loading={ loadingSignIn }
								type="primary"
								htmlType="submit"
								className="login-form-button"
							>
								Sign in
							</Button>
						</Form.Item>
					</Form>
				</div>}
				{!token ? <Button
					type={ "primary" }
					shape={ "circle" }
					icon={ !this.state.isOpened ? "login" : "close-circle" }
					onClick={ this.handleShow }
				/> : <Button
					type={ "primary" }
					shape={ "circle" }
					icon={ "logout" }
					onClick={ this.handleSignOut }
				/>}
				{extra}
			</div>
		);
	}
}

const SignIn = connect((state, ownProps) => {
	return {
		state,
		...ownProps,
	};
})(Form.create({ name: "sign-in" })(UnmappedSignIn));

export { SignIn };

UnmappedSignIn.propTypes = {
	form: PropTypes.object,
	state: PropTypes.object,
	dispatch: PropTypes.func,
	extra: PropTypes.object,
};

