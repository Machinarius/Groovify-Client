import * as React from "react";
import * as ReactDOM from "react-dom";

import HelloWorld from './components/HelloWorld';

var targetElement = document.createElement("div");
document.body.append(targetElement);

ReactDOM.render(
    <HelloWorld compiler="TypeScript" framework="React" />,
    targetElement
);