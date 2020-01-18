import * as React from "react";

import LoginSplash from "./LoginSplash/LoginSplash";
import PlayerShell from "./PlayerShell/PlayerShell";

import IAuthenticationService from "../services/IAuthenticationService";

export interface IProps {
    _authService?: IAuthenticationService
}

export default class AppContainer extends React.Component<IProps, {}> {
    private authService: IAuthenticationService;

    constructor(props: IProps) {
        super(props);

        this.authService = props._authService;
        if (!this.authService) {
            throw new Error("Not implemented");
        }
    }

    render() {
        if (this.authService.isUserAuthenticated()) {
            return (<PlayerShell />);
        } 

        return (<LoginSplash />);
    }
}