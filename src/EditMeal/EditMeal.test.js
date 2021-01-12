import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import EditMeal from "./EditMeal";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<EditMeal />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
