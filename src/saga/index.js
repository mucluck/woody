import { call, put, takeEvery } from "redux-saga/effects";

import { DataService } from "../dataService";
import constants from "../store/constants";

const API = new DataService("https://uxcandy.com/~shapoval/test-task-backend/v2");

function* fetchTasksData(reduxData) {
	const { page, sort } = reduxData;

	yield put({
		type: constants.FETCH_TASKS_DATA,
	});

	try {
		const response = yield call(async () => {
			const data = await API.handleTaskList({
				page,
				sort,
			});

			return data;
		});

		const { message: { tasks, total_task_count: totalTaskCount } } = response;

		yield put({
			type: constants.SET_TASKS_DATA,
			tasks,
			totalTaskCount,
			loadingTasks: false,
			error: response.status === "ok" ? "" : JSON.stringify(response.message),
		});
	} catch (event) {
		console.error("Error: ", new Error(event));
	}
}

function* signIn(reduxData) {
	const { username, password } = reduxData;

	yield put({
		type: constants.SIGNING_IN,
	});

	try {
		const response = yield call(async () => {
			const data = await API.handleLogin({
				username,
				password,
			});

			return data;
		});

		const { message: { token } } = response;

		yield put({
			type: constants.LOG_IN,
			token,
			error: response.status === "ok" ? "" : JSON.stringify(response.message),
		});
	} catch (event) {
		console.error("Error: ", new Error(event));
	}
}

function* saveTask(reduxData) {
	const { task, task: { id, text, status, token, username }, callback } = reduxData;

	yield put({
		type: constants.TASK_SAVING,
		loadingTaskSaving: true,
	});

	try {
		const response = yield call(async () => {
			const data = await API.handleTaskEdit({
				text,
				status,
				token,
			}, id, username);

			return data;
		});

		yield put({
			type: constants.TASK_SAVING,
			loadingTaskSaving: false,
			updatedTask: task,
			error: response.status === "ok" ? "" : JSON.stringify(response.message),
		});

		callback();
	} catch (event) {
		console.error("Error: ", new Error(event));
	}
}

function* createTask(reduxData) {
	const { task } = reduxData;

	yield put({
		type: constants.TASK_CREATION,
		taskCreation: true,
	});

	try {
		const response = yield call(async () => {
			const data = await API.handleTaskCreate({
				task,
			});

			return data;
		});

		yield put({
			type: constants.TASK_CREATION,
			taskCreation: false,
			error: response.status === "ok" ? "" : JSON.stringify(response.message),
		});
	} catch (event) {
		console.error("Error: ", new Error(event));
	}
}

function* watcher() {
	yield takeEvery(
		constants.GET_TASKS,
		fetchTasksData
	);

	yield takeEvery(
		constants.SIGN_IN,
		signIn,
	);

	yield takeEvery(
		constants.SAVE_TASK,
		saveTask,
	);

	yield takeEvery(
		constants.CREATE_TASK,
		createTask,
	);
}

export { watcher };
