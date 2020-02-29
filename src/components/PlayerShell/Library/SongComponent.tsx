import * as React from "react";
import * as moment from "moment";

import Song from "../../../models/Song";

export interface IProps {
    songObject: Song,
    onPlaybackRequested: (id: string) => void;
}

export default class SongComponent extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);

        this.firePlaybackRequested = this.firePlaybackRequested.bind(this);
    }

    private firePlaybackRequested(): void {
        this.props.onPlaybackRequested(this.props.songObject.id);
    }

    render() {
        let formattedDuration = moment
            .utc(this.props.songObject.lengthInSeconds * 1000)
            .format("H:mm:ss");

        return (
            <div onDoubleClick={this.firePlaybackRequested}>
                <h4 className="song-title">{this.props.songObject.title}</h4>   
                <h5 className="song-artists">{this.props.songObject.artists}</h5>
                <p className="song-length">{formattedDuration}</p>
            </div>
        );
    }
}