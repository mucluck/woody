import React from "react";
import { Provider } from "react-redux";
import { Layout } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { store } from "./store/";
import { TaskList } from "./components/Pages/TaskList";
import { CreateTask } from "./components/Pages/CreateTask";

export default function App() {
	return (
		<Provider store={ store }>
			<Router>
				<Layout>
					<Route path="/" exact component={ TaskList } />
					<Route path="/create/" component={ CreateTask } />
				</Layout>
			</Router>
		</Provider>
	);
}
