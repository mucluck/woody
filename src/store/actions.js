import constants from "./constants";

export const actions = {
	getTasks({ page }) {
		return {
			type: constants.GET_TASKS,
			page,
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
};
