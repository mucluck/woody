import React, { Component } from "react";
import { Icon, Avatar, Table, Button, Checkbox, Input, message } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Header, Container } from "../../Layout";
import { actions } from "../../../store/actions";

import "./TaskList.scss";

const listStyle = {
	width: "100%",
	display: "flex",
	flexDirection: "column",
	padding: "1rem 0",
};

class UnmappedTaskList extends Component {
	constructor(props) {
		super(props);

		this.columns = [
			{
				title: "ID",
				dataIndex: "id",
				width: "5%",
			},
			{
				title: "",
				dataIndex: "image_path",
				width: "5%",
				render: image => <Avatar src={ image } />,
			},
			{
				title: "User Name",
				dataIndex: "username",
				width: "15%",
				sorter: (a, b, direction) => this.sortTaskData(direction, "username"),
			},
			{
				title: "Email",
				dataIndex: "email",
				width: "15%",
			},
			{
				title: "Text",
				dataIndex: "",
				width: "35%",
				render: row => {
					return +this.state.editableRow !== +row.id ? row.text : <Input
						ref={ text => this.text = text }
						placeholder={ "Task text" }
						defaultValue={ row.text }
					/>;
				},
			},
			{
				title: "",
				dataIndex: "",
				render: row => {
					return +this.state.editableRow !== +row.id ?
						!!+row.status && <Icon type={ "check-circle" } theme={ "twoTone" } twoToneColor={ "#52c41a" } /> :
						<Checkbox
							ref={ status => this.status = status }
							defaultChecked={ !!+row.status }
						>
							Completed
						</Checkbox>;
				},
				width: "20%",
			},
			{
				title: "",
				dataIndex: "",
				render: row => {
					const { state: { token, loadingTaskSaving } } = this.props;
					const edit = +this.state.editableRow !== +row.id;

					return token && <Button
						onClick={edit ? () => this.handleEdit(row) : () => this.handleSave(row)}
						type={ edit ? "primary" : "danger" }
						shape={ "circle" }
						icon={ edit ? "edit" : "save" }
						loading={ loadingTaskSaving && !edit }
					/>;
				},
			},
		];

		this.state = {
			tasks: [],
			totalTaskCount: 0,
			loading: true,
			editableRow: null,
		};

		this.sortTaskData = this.sortTaskData.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}

	componentDidMount() {
		this.getTasksData();
	}

	getTasksData(page = 0) {
		const { dispatch } = this.props;

		dispatch(actions.getTasks({ page }));
	}

	handleEdit(row) {
		this.setState({ editableRow: row.id });
	}

	handleSave() {
		const { dispatch, state: { token } } = this.props;
		const { editableRow: id } = this.state;

		dispatch(actions.saveTask(
			{
				task: {
					id,
					text: this.text.state.value,
					status: this.status.rcCheckbox.state.checked ? "10" : "0",
					token,
					username: "Name",
				},
				callback: () => this.setState({
					editableRow: null,
				}),
			},
		));
	}

	sortTaskData(direction, field) {
		console.log(field, direction);
	}

	render() {
		const { state: { loadingTasks, tasks, totalTaskCount, error } } = this.props;

		return (
			<>
				{ error && message.error(error) }
				<Header />
				<Container >
					<Table
						style={ listStyle }
						columns={ this.columns }
						rowKey={task => task.id}
						dataSource={ tasks }
						pagination={{
							onChange: page => this.getTasksData(page),
							pageSize: 3,
							size: "small",
							total: +totalTaskCount,
						}}
						loading={ loadingTasks }
						onChange={ this.handleTableChange }
					/>
				</Container>
			</>
		);
	}
}

const TaskList = connect((state, ownProps) => {
	return {
		state,
		...ownProps,
	};
})(UnmappedTaskList);

export { TaskList };

UnmappedTaskList.propTypes = {
	state: PropTypes.object,
	dispatch: PropTypes.func,
};
