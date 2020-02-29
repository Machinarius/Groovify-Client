import * as React from "react";

import Song from "../../../models/Song";

export interface IProps {
    songObject: Song
}

export default class SongComponent extends React.Component<IProps, {}> {
    render() {
        return (<div></div>);
    }
}