import * as React from "react";
import Styled from "styled-components";

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

    constructor(props: IProps) {
        super(props);

        this.authService = props.authService;
    }

    render() {
        return (
            <this.StackWrapper>
                <ProfileFragment authService={this.authService} />
                <this.LibraryWrapper>
                    <LibraryFragment authService={this.authService} />
                </this.LibraryWrapper>
                <NowPlayingFragment authService={this.authService} />
            </this.StackWrapper>
        );
    }
}