import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import NavMeal from "./NavMeal";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<NavMeal />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
