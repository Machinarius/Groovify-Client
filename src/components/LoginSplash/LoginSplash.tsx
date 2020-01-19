import IAuthenticationService from "../../services/IAuthenticationService";

import * as React from "react";

export interface IProps {
    authService: IAuthenticationService
}

export default class LoginSplash extends React.Component<IProps, {}> {
    private authService: IAuthenticationService;

    constructor(props: IProps) {
        super(props);

        this.beginLogin = this.beginLogin.bind(this);

        this.authService = props.authService;
    }

    private beginLogin() {
        this.authService.beginLogin();
    }

    render() {
        return (
            <div>
                <button onClick={() => this.beginLogin()}>Log In</button>
            </div>
        );
    }
}