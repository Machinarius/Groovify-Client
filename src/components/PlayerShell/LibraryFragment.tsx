import * as React from "react";

import IAuthenticationService from "../../services/IAuthenticationService";
import IMusicPlaybackController from "../../services/IMusicPlaybackController";
import IMusicLibraryRepository from "../../services/IMusicLibraryRepository";

import GroovifyAPIMusicLibraryRepository from "../../services/GroovifyAPIMusicLibraryRepository";

import { Album } from "../../models/Album";
import AlbumComponent from "./Library/AlbumComponent";

export interface IProps {
    authService: IAuthenticationService,
    playbackController: IMusicPlaybackController,
    overrideLibraryRepo?: IMusicLibraryRepository
}

interface IState {
    didLoadAllAlbums: boolean,
    albums: Album[]
}

export default class LibraryFragment extends React.Component<IProps, IState> {
    private authService: IAuthenticationService;
    private playbackController: IMusicPlaybackController;
    private libraryRepo: IMusicLibraryRepository;

    constructor(props: IProps) {
        super(props);

        this.authService = props.authService;
        this.playbackController = props.playbackController;
        this.libraryRepo = props.overrideLibraryRepo ||
            new GroovifyAPIMusicLibraryRepository();

        this.initializeAsync = this.initializeAsync.bind(this);
        this.handlePlaybackRequested = this.handlePlaybackRequested.bind(this);

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

    private handlePlaybackRequested(songId: string, albumId: string): void {
        this.playbackController.startPlayback(songId, albumId);
    }

    render() {
        if (this.state.didLoadAllAlbums) {
            if (this.state.albums.length) {
                var albumComponents = this.state.albums.map(album => 
                    <li key={album.id}>
                        <AlbumComponent albumObject={album} onPlaybackRequested={this.handlePlaybackRequested}></AlbumComponent>
                    </li>);

                return (
                    <ul style={{listStyleType: "none"}}>{albumComponents}</ul>
                );
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