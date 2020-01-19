import * as React from "react";

import IAuthenticationService from "../../services/IAuthenticationService";
import UserProfile from "../../models/UserProfile";
import ProgressUI from "../ProgressUI";

export interface IProps {
    authService: IAuthenticationService
}

interface IState {
    loadingProfileData: boolean;
    userProfile: UserProfile
}

export default class ProfileFragment extends React.Component<IProps, IState> {
    private authService: IAuthenticationService;
    private isUnmounted: boolean;

    constructor(props: IProps) {
        super(props);

        this.loadProfileData = this.loadProfileData.bind(this);
        this.logOut = this.logOut.bind(this);

        this.authService = props.authService;
        this.state = {
            loadingProfileData: true,
            userProfile: undefined
        };
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    private async loadProfileData(): Promise<any> {
        let profile = await this.authService.getProfileAsync();
        if (this.isUnmounted) {
            return; // TODO: Find out why this is not working - loadProfileData is already bound to the "real" this
        }

        this.setState({
            loadingProfileData: false,
            userProfile: profile
        });
    }

    private logOut(): void {
        this.authService.logOut();
    }

    render() {
        if (this.state.loadingProfileData) {
            return (<ProgressUI promiseFactory={() => this.loadProfileData()} />);
        } 
        
        return (
            <div>
                <p className={"profile-name"}>Welcome, {this.state.userProfile.name}</p>
                <img className={"profile-picture"} src={this.state.userProfile.pictureUrl} />
                <button className={"logout-button"} onClick={() => this.logOut()}>Log Out</button>
            </div>
        );
    }
}