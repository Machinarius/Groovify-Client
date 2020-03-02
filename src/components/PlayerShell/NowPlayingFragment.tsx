import * as React from "react";
import * as moment from "moment";
import { Subscription } from "rxjs";

import IMusicPlaybackController from "../../services/IMusicPlaybackController";

import { PlayerState } from "../../models/PlayerState";
import { PlaybackStatus } from "../../models/PlaybackStatus";

export interface IProps {
    playbackController: IMusicPlaybackController
}

export interface IState {
    playerState: PlayerState;
}

export default class NowPlayingFragment extends React.Component<IProps, IState> {
    private playbackController: IMusicPlaybackController;

    private playerStateSubscription: Subscription;

    constructor(props: IProps) {
        super(props);

        this.playbackController = props.playbackController;

        this.handlePlayerStateChanged = this.handlePlayerStateChanged.bind(this);

        this.state = {
            playerState: this.playbackController.getCurrentPlayerState()
        };        
    }

    componentDidMount() {
        this.playerStateSubscription = 
            this.playbackController.playerStateChanges().subscribe(this.handlePlayerStateChanged);
    }

    componentWillUnmount() {
        this.playerStateSubscription.unsubscribe();
    }
    
    private handlePlayerStateChanged(value: PlayerState) {
        this.setState({
            playerState: value
        });
    }

    render() {
        let currentPlayerState = this.state.playerState;

        let songElement = (<div></div>);
        if (currentPlayerState.currentAlbum && currentPlayerState.currentSong) {
            songElement = (
                <div>
                    <img className="current-cover" src={currentPlayerState.currentAlbum.coverUrl}></img>
                    <p className="current-title">{currentPlayerState.currentSong.title}</p>
                    <p className="current-artists">{currentPlayerState.currentSong.artists}</p>
                </div>
            );
        }

        var playButtonClass: string;
        var progressClass: string;
        switch (currentPlayerState.status) {
            case PlaybackStatus.Playing:
                playButtonClass = "pause";
                break;
            case PlaybackStatus.Paused:
                playButtonClass = "play";
                break;
            case PlaybackStatus.Stopped:
                playButtonClass = "play disabled";
                progressClass = " disabled";
                break;
        }

        var lengthInSeconds = 0;
        var playbackPercentage = 0;
        if (currentPlayerState.currentSong) {
            lengthInSeconds = currentPlayerState.currentSong.lengthInSeconds;
            playbackPercentage = (currentPlayerState.playbackPositionInSeconds * 100) / currentPlayerState.currentSong.lengthInSeconds;
        }

        let positionString = moment.utc(currentPlayerState.playbackPositionInSeconds * 1000).format("m:ss");
        let lengthString = moment.utc(lengthInSeconds * 1000).format("m:ss");

        return (
            <div>
                {songElement}
                <div>
                    <button className="previous-button disabled">Previous</button>
                    <button className={playButtonClass + " playback-button"}>Play</button>
                    <button className="next-button disabled">Next</button>
                </div>
                <div>
                    <progress className={progressClass + " playback-progress"} value={playbackPercentage} max={100}></progress>
                    <p className="playback-position">{positionString}</p>
                    <p className="playback-length">{lengthString}</p>
                </div>
            </div>
        );
    }
}