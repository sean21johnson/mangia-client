import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import MealList from "./MealList";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<MealList />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
