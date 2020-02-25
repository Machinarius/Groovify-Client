import * as React from "react";
import Styled from "styled-components";

import IMusicPlayerController from "../../services/IMusicPlayerController";
import DefaultPlayerController from "../../services/DefaultPlayerController";
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
    private playerController: IMusicPlayerController;

    constructor(props: IProps) {
        super(props);

        this.authService = props.authService;
        this.playerController = new DefaultPlayerController(this.authService);
    }

    render() {
        return (
            <this.StackWrapper>
                <ProfileFragment authService={this.authService} />
                <this.LibraryWrapper>
                    <LibraryFragment authService={this.authService} playerController={this.playerController} />
                </this.LibraryWrapper>
                <NowPlayingFragment authService={this.authService} playerController={this.playerController} />
            </this.StackWrapper>
        );
    }
}