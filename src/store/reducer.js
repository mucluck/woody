import constants from "./constants";

const initialState = {
	loadingTasks: false,
	tasks: [],
	totalTaskCount: 0,
	loadingSignIn: false,
	token: null,
	userName: "Name",
	loadingTaskSaving: false,
	error: "",
	taskCreation: false,
};

export default (state = initialState, action) => {
	const { type, tasks, totalTaskCount, token, loadingTaskSaving, updatedTask, taskCreation, error } = action;

	switch (type) {
		case constants.FETCH_TASKS_DATA:
			return {
				...state,
				loadingTasks: true,
				error,
			};
		case constants.SET_TASKS_DATA:
			return {
				...state,
				tasks,
				totalTaskCount,
				loadingTasks: false,
				error,
			};
		case constants.SIGNING_IN:
			return {
				...state,
				loadingSignIn: true,
			};
		case constants.LOG_IN:
			return {
				...state,
				token,
				loadingSignIn: false,
				error,
			};
		case constants.TASK_SAVING:
			if (updatedTask) {
				state.tasks.map(task => {
					if (task.id === updatedTask.id) {
						task.text = updatedTask.text;
						task.status = updatedTask.status;

						return task;
					}

					return task;
				});
			}

			return {
				...state,
				tasks: state.tasks,
				loadingTaskSaving,
				error,
			};
		case constants.TASK_CREATION:
			return {
				...state,
				taskCreation,
				error,
			};
		case constants.CLEAR_ERROR:
			return {
				...state,
				error,
			};
		default:
			return state;
	}
};
