import * as React from "react";

import IMusicPlaybackController from "../../services/IMusicPlaybackController";
import DefaultPlaybackController from "../../services/DefaultPlaybackController";
import IAuthenticationService from "../../services/IAuthenticationService";

import ProfileFragment from "./ProfileFragment";
import LibraryFragment from "./LibraryFragment";
import NowPlayingFragment from "./NowPlayingFragment";

import "./PlayerShell.css";

export interface IProps {
    authService: IAuthenticationService;
}

export default class PlayerShell extends React.Component<IProps, {}> {
    private authService: IAuthenticationService;
    private playbackController: IMusicPlaybackController;

    constructor(props: IProps) {
        super(props);

        this.authService = props.authService;
        this.playbackController = new DefaultPlaybackController(this.authService);
    }

    render() {
        return (
            <div className="main-stack">
                <div className="profile-container">
                    <ProfileFragment authService={this.authService} />
                </div>
                <div className="library-container">
                    <LibraryFragment authService={this.authService} playbackController={this.playbackController} />
                </div>
                <div>
                    <NowPlayingFragment playbackController={this.playbackController} />
                </div>
            </div>
        );
    }
}