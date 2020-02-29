import * as React from "react";
import * as moment from "moment";

import Song from "../../../models/Song";

export interface IProps {
    songObject: Song
}

export default class SongComponent extends React.Component<IProps, {}> {
    render() {
        let formattedDuration = moment
            .utc(this.props.songObject.lengthInSeconds * 1000)
            .format("H:mm:ss");

        return (
            <div>
                <h4 className="song-title">{this.props.songObject.title}</h4>   
                <h5 className="song-artists">{this.props.songObject.artists}</h5>
                <p className="song-length">{formattedDuration}</p>
            </div>
        );
    }
}