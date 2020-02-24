import * as React from "react";
import * as ReactDOM from "react-dom";

import AppContainer from "./components/AppContainer";

var targetElement = document.createElement("div");
document.body.append(targetElement);

ReactDOM.render(
    <AppContainer />,
    targetElement
);