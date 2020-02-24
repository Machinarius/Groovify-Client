import * as React from "react";

import IAuthenticationService from "../../services/IAuthenticationService";

export interface IProps {
    authService: IAuthenticationService
}

export default class LibraryFragment extends React.Component<IProps, {}> {
    private authService: IAuthenticationService;

    constructor(props: IProps) {
        super(props);

        this.authService = props.authService;
    }

    render() {
        return (<div></div>);
    }
}