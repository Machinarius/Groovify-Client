import * as React from "react";

import IAuthenticationService from "../../services/IAuthenticationService";
import ProfileFragment from "./ProfileFragment";
import LibraryFragment from "./LibraryFragment";
import NowPlayingFragment from "./NowPlayingFragment";

export interface IProps {
    authService: IAuthenticationService;
}

export default class PlayerShell extends React.Component<IProps, {}> {
    private authService: IAuthenticationService;

    constructor(props: IProps) {
        super(props);

        this.authService = props.authService;
    }

    render() {
        return (
            <div>
                <ProfileFragment authService={this.authService} />
                <LibraryFragment authService={this.authService} />
                <NowPlayingFragment authService={this.authService} />
            </div>
        );
    }
}