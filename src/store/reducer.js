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
};

export default (state = initialState, action) => {
	const { type, tasks, totalTaskCount, token, loadingTaskSaving, updatedTask } = action;

	switch (type) {
		case constants.FETCH_TASKS_DATA:
			return {
				...state,
				loadingTasks: true,
			};
		case constants.SET_TASKS_DATA:
			return {
				...state,
				tasks,
				totalTaskCount,
				loadingTasks: false,
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
			};
		default:
			return state;
	}
};
