import * as React from "react";

export interface IProps<TPromise> {
    promiseFactory: () => Promise<TPromise>;
    callback: (result: TPromise, error: Error) => void;
}

interface IState {
    promiseIsRunning: boolean,
    promiseRejected: boolean,
    promiseResolved: boolean
}

// TODO: Integrate https://github.com/lifeomic/attempt to provide resiliency/retry services
export default class ProgressUI<TPromise> extends React.Component<IProps<TPromise>, IState> {
    constructor(props: IProps<TPromise>) {
        super(props);

        this.startResolvingPromise = this.startResolvingPromise.bind(this);

        this.state = {
            promiseIsRunning: false,
            promiseRejected: false,
            promiseResolved: false
        };
    }

    componentDidMount() {
        this.startResolvingPromise();
    }

    private async startResolvingPromise(): Promise<any> {
        this.setState({
            promiseIsRunning: true
        });

        try {
            let result = await this.props.promiseFactory();
            this.props.callback(result, null);

            this.setState({
                promiseIsRunning: false,
                promiseResolved: true
            });
        } catch (error) {
            this.props.callback(null, error);

            this.setState({
                promiseIsRunning: false,
                promiseRejected: true
            });
        }
    }

    render() {
        if (this.state.promiseIsRunning) {
            return (
                <div>
                    Loading data...
                    <progress></progress>
                </div>
            );
        }

        if (this.state.promiseRejected) {
            return (
                <div>
                    <p>Loading data failed, please check your internet connection and try again</p>
                    <button className={"retry-button"} onClick={() => this.startResolvingPromise()}>Try Again</button>
                </div>
            );
        }

        let hiddenStyle = {
            display: "none"
        };

        return (<div style={hiddenStyle}></div>);
    }
}