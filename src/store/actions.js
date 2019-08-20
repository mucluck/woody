import constants from "./constants";

export const actions = {
	getTasks({ page, sort }) {
		return {
			type: constants.GET_TASKS,
			page,
			sort,
		};
	},
	signIn({ username, password }) {
		return {
			type: constants.SIGN_IN,
			username,
			password,
		};
	},
	signOut() {
		return {
			type: constants.SIGN_IN,
			token: null,
		};
	},
	saveTask({ task, callback }) {
		return {
			type: constants.SAVE_TASK,
			task,
			callback,
		};
	},
	cretaeTask({ task }) {
		return {
			type: constants.CREATE_TASK,
			task,
		};
	},
	clearError() {
		return {
			type: constants.CLEAR_ERROR,
			error: "",
		};
	},
};
