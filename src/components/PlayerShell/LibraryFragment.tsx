import * as React from "react";

import IAuthenticationService from "../../services/IAuthenticationService";
import IMusicPlayerController from "../../services/IMusicPlayerController";
import IMusicLibraryRepository from "../../services/IMusicLibraryRepository";

import GroovifyAPIMusicLibraryRepository from "../../services/GroovifyAPIMusicLibraryRepository";

import { Album } from "../../models/Album";

export interface IProps {
    authService: IAuthenticationService,
    playerController: IMusicPlayerController,
    overrideLibraryRepo?: IMusicLibraryRepository
}

interface IState {
    didLoadAllAlbums: boolean,
    albums: Album[]
}

export default class LibraryFragment extends React.Component<IProps, IState> {
    private authService: IAuthenticationService;
    private playerController: IMusicPlayerController;
    private libraryRepo: IMusicLibraryRepository;

    constructor(props: IProps) {
        super(props);

        this.authService = props.authService;
        this.playerController = props.playerController;
        this.libraryRepo = props.overrideLibraryRepo ||
            new GroovifyAPIMusicLibraryRepository();

        this.initializeAsync = this.initializeAsync.bind(this);

        this.state = {
            didLoadAllAlbums: false,
            albums: null
        };
    }

    componentDidMount() {
        this.initializeAsync();
    }

    private async initializeAsync(): Promise<any> {
        let allAlbums = await this.libraryRepo.getAllAlbumsAsync();
        this.setState({
            albums: allAlbums,
            didLoadAllAlbums: true
        });
    }

    render() {
        if (this.state.didLoadAllAlbums) {
            if (this.state.albums) {

            }

            return (
                <div>
                    <h1 className="loading-text">No albums have been added to our library yet, please check back later!</h1>
                </div>
            );
        }

        return (
            <div>
                <p className="loading-text">Loading albums...</p>
            </div>
        );
    }
}