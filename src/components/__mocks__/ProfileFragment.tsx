import * as React from "react";

import IAuthenticationService from "../../services/IAuthenticationService";

export interface IProps {
    authService: IAuthenticationService
}

export default class ProfileFragment extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (<div>Mock ProfileFragment</div>);
    }
}