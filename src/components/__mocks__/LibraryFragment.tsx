import * as React from "react";

import IAuthenticationService from "../../services/IAuthenticationService";
import IMusicPlayerController from "../../services/IMusicPlayerController";
import IMusicLibraryRepository from "../../services/IMusicLibraryRepository";

export interface IProps {
    authService: IAuthenticationService,
    playerController: IMusicPlayerController,
    overrideLibraryRepo?: IMusicLibraryRepository
}

export default class LibraryFragment extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (<div>Mock LibraryFragment</div>);
    }
}