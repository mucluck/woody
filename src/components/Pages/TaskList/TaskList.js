import React, { Component } from "react";
import { Icon, Avatar, Table, Button, Checkbox, Input, message, Pagination } from "antd";
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
const filtersStylse = {
	display: "flex",
	paddingTop: "1rem",
	justifyContent: "space-around",
};

class UnmappedTaskList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasks: [],
			totalTaskCount: 0,
			loading: true,
			editableRow: null,
			sortDirection: "asc",
			sortField: "id",
		};

		this.sort = null;

		this.sortTaskData = this.sortTaskData.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.getTasksData = this.getTasksData.bind(this);
	}

	componentDidMount() {
		this.getTasksData();
	}

	getTasksData(page = this.state.page) {
		const { dispatch } = this.props;

		dispatch(actions.getTasks({
			page,
			sort: {
				direction: this.state.sortDirection,
				field: this.state.sortField,
			},
		}));
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
				},
				callback: () => this.setState({
					editableRow: null,
				}),
			},
		));
	}

	sortTaskData(sortField) {
		const { sortDirection } = this.state;

		this.setState({
			sortDirection: !sortDirection || sortDirection === "desc" ? "asc" : "desc",
			sortField,
		}, this.getTasksData);
	}

	render() {
		const { state: { loadingTasks, tasks, totalTaskCount, error }, dispatch } = this.props;
		const columns = [
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
				title: "Status",
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
		const sort = [
			{
				field: "id",
				title: "Sort by ID",
			},
			{
				field: "username",
				title: "Sort by Name",
			},
			{
				field: "email",
				title: "Sort by E-mail",
			},
			{
				field: "status",
				title: "Sort by Status",
			},
		];

		return (
			<>
				{ error && message.error(error, 3, () => dispatch(actions.clearError())) }
				<Header />
				<Container >
					<div style={ filtersStylse }>
						{sort.map(sorter => {
							return <Button key={sorter.field} onClick={() => this.sortTaskData(sorter.field)}>
								{sorter.title}
								{
									this.state.sortField === sorter.field && <Icon type={ this.state.sortDirection === "asc" ? "caret-up" : "caret-down" } />
								}
							</Button>;
						})}
					</div>
					<Table
						style={ listStyle }
						columns={ columns }
						rowKey={task => task.id}
						dataSource={ tasks }
						loading={ loadingTasks }
						pagination={ false }
					/>
				</Container>
				<Container>
					<Pagination
						onChange={ page => this.setState({ page }, () => this.getTasksData(this.state.page)) }
						total={ +totalTaskCount }
						pageSize={ 3 }
						size={ "small" }
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
