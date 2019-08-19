export class DataService {
	constructor(URL) {
		this.URL = URL;
	}

	async handleTaskList({ name = "Name", page = 0 }) {
		const response = await fetch(`${this.URL}/?developer=${name}&page=${page}`);
		const data = await response.json();

		return data;
	}

	async handleTaskCreate(task = {}) {
		const formData = new FormData();

		for (let [key, value] of Object.entries(task)) {
			formData.append(key, value);
		}

		const request = await fetch(`${this.URL}/create?developer=${task.username}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/form-data",
			},
			body: formData,
		});
		const response = request.json();

		return response;
	}

	async handleLogin(userData = {}) {
		const formData = new FormData();

		for (let [key, value] of Object.entries(userData)) {
			formData.append(key, value);
		}

		const response = await fetch(`${this.URL}/login?developer=${userData.username}`, {
			method: "POST",
			body: formData,
		});
		const data = await response.json();

		return data;
	}

	async handleTaskEdit(taskData = {}, id = "", username = "") {
		const formData = new FormData();

		for (let [key, value] of Object.entries(taskData)) {
			formData.append(key, value);
		}

		const response = await fetch(`${this.URL}/edit/${id}/?developer=${username}`, {
			method: "POST",
			body: formData,
		});
		const data = await response.json();

		return data;
	}
}

// https://uxcandy.com/~shapoval/test-task-backend/v2
