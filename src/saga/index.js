import { call, put, takeEvery } from "redux-saga/effects";

import { DataService } from "../dataService";
import constants from "../store/constants";

const API = new DataService("https://uxcandy.com/~shapoval/test-task-backend/v2");

function* fetchTasksData(reduxData) {
	const { page } = reduxData;

	yield put({
		type: constants.FETCH_TASKS_DATA,
	});

	try {
		const response = yield call(async () => {
			const data = await API.handleTaskList({ page });

			return data;
		});

		const { message: { tasks, total_task_count: totalTaskCount } } = response;

		yield put({
			type: constants.SET_TASKS_DATA,
			tasks,
			totalTaskCount,
			loadingTasks: false,
		});
	} catch (event) {
		console.error("Error: ", new Error(event));
	}
}

function* watchfetchTasksData() {
	yield takeEvery(
		"GET_TASKS",
		fetchTasksData
	);
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
		});
	} catch (event) {
		console.error("Error: ", new Error(event));
	}
}

function* watchSignIn() {
	yield takeEvery(
		"SIGN_IN",
		signIn,
	);
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

		yield put(response.status === "ok" ? {
			type: constants.TASK_SAVING,
			loadingTaskSaving: false,
			updatedTask: task,
		} : {
			type: constants.TASK_SAVING, // TODO: task update
			loadingTaskSaving: false,
			error: response.message.token,
		});

		callback();
	} catch (event) {
		console.error("Error: ", new Error(event));
	}
}

function* watchsaveTask() {
	yield takeEvery(
		"SAVE_TASK",
		saveTask,
	);
}

export { watchfetchTasksData, watchSignIn, watchsaveTask };
