import * as React from "react";

import IAuthenticationService from "../../services/IAuthenticationService";

import UserProfile from "../../models/UserProfile";

import "./ProfileFragment.css";

export interface IProps {
    authService: IAuthenticationService
}

interface IState {
    loadingProfileData: boolean;
    userProfile: UserProfile
}

export default class ProfileFragment extends React.Component<IProps, IState> {
    private authService: IAuthenticationService;
    
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

    componentDidMount() {
        this.loadProfileData();
    }

    private async loadProfileData(): Promise<any> {
        let profile = await this.authService.getProfileAsync();
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
            return (<p className="loading-message">Loading data...</p>);
        } 
        
        return (
            <div className="profile-container">
                <h2 className="app-logo">Groovify!</h2>
                <div className="profile-text">
                    <p className="profile-name">Welcome, {this.state.userProfile.name}</p>
                    <small className="logout-button" onClick={this.logOut}>Log Out</small>
                </div>
                <img className="profile-picture" src={this.state.userProfile.pictureUrl} />
            </div>
        );
    }
}