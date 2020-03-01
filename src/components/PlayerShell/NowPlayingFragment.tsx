import * as React from "react";

import IAuthenticationService from "../../services/IAuthenticationService";
import IMusicPlaybackController from "../../services/IMusicPlaybackController";

export interface IProps {
    authService: IAuthenticationService,
    playbackController: IMusicPlaybackController
}

export default class NowPlayingFragment extends React.Component<IProps, {}> {
    private authService: IAuthenticationService;

    constructor(props: IProps) {
        super(props);

        this.authService = props.authService;
    }

    render() {
        return (<div></div>);
    }
}