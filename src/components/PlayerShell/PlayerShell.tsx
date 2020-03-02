import * as React from "react";
import Styled from "styled-components";

import IMusicPlaybackController from "../../services/IMusicPlaybackController";
import DefaultPlaybackController from "../../services/DefaultPlaybackController";
import IAuthenticationService from "../../services/IAuthenticationService";

import ProfileFragment from "./ProfileFragment";
import LibraryFragment from "./LibraryFragment";
import NowPlayingFragment from "./NowPlayingFragment";

export interface IProps {
    authService: IAuthenticationService;
}

export default class PlayerShell extends React.Component<IProps, {}> {
    private StackWrapper = Styled.div`
        display: flex;
        flex-direction: column;
    `;

    private LibraryWrapper = Styled.div`
        flex-grow: 1;
    `;

    private authService: IAuthenticationService;
    private playbackController: IMusicPlaybackController;

    constructor(props: IProps) {
        super(props);

        this.authService = props.authService;
        this.playbackController = new DefaultPlaybackController(this.authService);
    }

    render() {
        return (
            <this.StackWrapper>
                <ProfileFragment authService={this.authService} />
                <this.LibraryWrapper>
                    <LibraryFragment authService={this.authService} playbackController={this.playbackController} />
                </this.LibraryWrapper>
                <NowPlayingFragment playbackController={this.playbackController} />
            </this.StackWrapper>
        );
    }
}