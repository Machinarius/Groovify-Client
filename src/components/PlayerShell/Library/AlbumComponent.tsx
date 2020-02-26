import * as React from "react";

import { Album } from "../../../models/Album";

export interface IProps {
    albumObject: Album
}

export default class AlbumComponent extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (<div></div>);
    }
}