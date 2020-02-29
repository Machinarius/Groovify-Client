import * as React from "react";

import SongComponent from "./SongComponent";

import { Album } from "../../../models/Album";

export interface IProps {
    albumObject: Album,
    onPlaybackRequested: (songId: string, albumId: string) => void;
}

export default class AlbumComponent extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);

        this.firePlaybackRequested = this.firePlaybackRequested.bind(this);
    }

    private firePlaybackRequested(songId: string): void {
        this.props.onPlaybackRequested(songId, this.props.albumObject.id);
    }

    render() {
        let songsElement: React.ReactElement;
        if (this.props.albumObject.songs.length > 0) {
            let songItems = this.props.albumObject.songs.map(song => 
                <li key={song.id}>
                    <SongComponent songObject={song} onPlaybackRequested={this.firePlaybackRequested} />
                </li>
            );

            songsElement = <ul>{songItems}</ul>;
        } else {
            songsElement = <h3 className="album-no-songs">This Album has no songs.</h3>
        }

        return (
            <div>
                <h3 className="album-title">{this.props.albumObject.title}</h3>
                <h4 className="album-artists">{this.props.albumObject.artists}</h4>
                <img className="album-cover" src={this.props.albumObject.coverUrl}></img>
                {songsElement}
            </div>
        );
    }
}