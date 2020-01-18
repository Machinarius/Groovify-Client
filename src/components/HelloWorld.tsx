import * as React from 'react';

export interface HelloProps {
    compiler: string,
    framework: string
}

export default class HelloWorld extends React.Component<HelloProps, {}> {
    render() {
        return (<div>Hello from {this.props.compiler} and {this.props.framework}</div>);
    }
}
