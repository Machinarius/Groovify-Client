import * as React from "react";
import { Subscription } from "rxjs";

import LoginSplash from "./LoginSplash/LoginSplash";
import PlayerShell from "./PlayerShell/PlayerShell";

import IAuthenticationService from "../services/IAuthenticationService";
import GoogleAPIAuthenticationService from "../services/GoogleAPIAuthenticationService";

export interface IProps {
    _authService?: IAuthenticationService
}

interface IState {
    initialized: boolean;
    userAuthenticated: boolean;
}

export default class AppContainer extends React.Component<IProps, IState> {
    private authService: IAuthenticationService;
    private authStateSub: Subscription;

    constructor(props: IProps) {
        super(props);

        this.initializeAsync = this.initializeAsync.bind(this);
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this);

        this.authService = props._authService;
        if (!this.authService) {
            this.authService = new GoogleAPIAuthenticationService();
        }

        this.state = {
            initialized: false,
            userAuthenticated: false
        };
    }

    componentDidMount() {
        this.initializeAsync();
    }

    componentWillUnmount() {
        this.authStateSub.unsubscribe();
    }

    private async initializeAsync(): Promise<any> {
        await this.authService.initAsync();
        this.authStateSub = this.authService.authStateChanges()
            .subscribe(this.onAuthStateChanged);

        this.setState({
            initialized: true,
            userAuthenticated: this.authService.isUserAuthenticated()
        });
    }

    private onAuthStateChanged(authState: boolean): void {
        this.setState({
            userAuthenticated: authState
        });
    }

    render() {
        if (!this.state.initialized) {
            return (<div id="loading-message">Loading data...</div>);
        }

        if (this.state.userAuthenticated) {
            return (<PlayerShell authService={this.authService} />);
        } 

        return (<LoginSplash authService={this.authService} />);
    }
}