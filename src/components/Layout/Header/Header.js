import React from "react";
import { Layout, Button } from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

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

function UnmappedHeader(props) {
	return (
		<Layout.Header style={ headerStyle }>
			<Container>
				<div style={ rowStyle }>
					<Link to={ "/" }>
						Task Manager
					</Link>
					<SignIn extra={
						<Button
							type={ "primary" }
							shape={ "circle" }
							icon={ "form" }
							style={{ marginLeft: "1rem" }}
							onClick={() => props.history.push("/create/")}
						/>
					}/>
				</div>
			</Container>
		</Layout.Header>
	);
}

const Header = withRouter(UnmappedHeader);

export { Header };

UnmappedHeader.propTypes = {
	history: PropTypes.object,
};

