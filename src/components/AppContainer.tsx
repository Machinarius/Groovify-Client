import * as React from "react";
import { Subscription } from "rxjs";

import LoginSplash from "./LoginSplash/LoginSplash";
import PlayerShell from "./PlayerShell/PlayerShell";

import IAuthenticationService from "../services/IAuthenticationService";

export interface IProps {
    _authService?: IAuthenticationService
}

interface IState {
    userAuthenticated: boolean;
}

export default class AppContainer extends React.Component<IProps, IState> {
    private authService: IAuthenticationService;
    private authStateSub: Subscription;

    constructor(props: IProps) {
        super(props);

        this.onAuthStateChanged = this.onAuthStateChanged.bind(this);

        this.authService = props._authService;
        if (!this.authService) {
            throw new Error("Not implemented");
        }

        this.state = {
            userAuthenticated: this.authService.isUserAuthenticated()
        };
    }

    componentDidMount() {
        this.authStateSub = this.authService.authStateChanges()
            .subscribe(this.onAuthStateChanged);
    }

    componentWillUnmount() {
        this.authStateSub.unsubscribe();
    }

    private onAuthStateChanged(authState: boolean): void {
        this.setState({
            userAuthenticated: authState
        });
    }

    render() {
        if (this.state.userAuthenticated) {
            return (<PlayerShell />);
        } 

        return (<LoginSplash />);
    }
}