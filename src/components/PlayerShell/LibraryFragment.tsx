import * as React from "react";

import IAuthenticationService from "../../services/IAuthenticationService";
import IMusicPlayerController from "../../services/IMusicPlayerController";
import IMusicLibraryRepository from "../../services/IMusicLibraryRepository";
import GroovifyAPIMusicLibraryRepository from "../../services/GroovifyAPIMusicLibraryRepository";

export interface IProps {
    authService: IAuthenticationService,
    playerController: IMusicPlayerController,
    overrideLibraryRepo?: IMusicLibraryRepository
}

export default class LibraryFragment extends React.Component<IProps, {}> {
    private authService: IAuthenticationService;
    private playerController: IMusicPlayerController;
    private libraryRepo: IMusicLibraryRepository;

    constructor(props: IProps) {
        super(props);

        this.authService = props.authService;
        this.playerController = props.playerController;
        this.libraryRepo = props.overrideLibraryRepo ??
            new GroovifyAPIMusicLibraryRepository();
    }

    render() {
        return (<div></div>);
    }
}