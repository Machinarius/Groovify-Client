import * as React from "react";

import IAuthenticationService from "../../services/IAuthenticationService";
import IMusicPlayerController from "../../services/IMusicPlayerController";

export interface IProps {
    authService: IAuthenticationService,
    playerController: IMusicPlayerController
}

export default class NowPlayingFragment extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (<div>Mock NowPlayingFragment</div>);
    }
}