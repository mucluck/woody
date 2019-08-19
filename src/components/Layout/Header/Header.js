import React from "react";
import { Layout } from "antd";

import { Container } from "../Container";
import { SignIn } from "../SignIn";

const headerStyle = {
	background: "#fff",
	padding: 0,
};
const rowStyle = {
	display: "flex",
	justifyContent: "space-between",
	width: "100%",
};

export function Header() {
	return (
		<Layout.Header style={ headerStyle }>
			<Container>
				<div style={ rowStyle }>
					Task manager
					<SignIn />
				</div>
			</Container>
		</Layout.Header>
	);
}
