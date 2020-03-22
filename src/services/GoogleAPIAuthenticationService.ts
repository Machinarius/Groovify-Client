import { Observable, Subject } from "rxjs";

import IAuthenticationService from "./IAuthenticationService";
import UserProfile from "../models/UserProfile";

export default class GoogleAPIAuthenticationService implements IAuthenticationService {
    private googleAuth: gapi.auth2.GoogleAuth;
    private currentUser: gapi.auth2.GoogleUser;
    private statusSubject: Subject<boolean>;

    constructor() {
        this.onSignedInChanged = this.onSignedInChanged.bind(this);
    }

    async initAsync(): Promise<any> {
        let gapiLoad = new Promise<void>((resolve) => {
            gapi.load("client:auth2", resolve);
        });

        await gapiLoad;
        await gapi.client.init({
            apiKey: process.env.GOOGLE_API_KEY,
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
            discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
            scope: "profile"
        });

        this.statusSubject = new Subject<boolean>();
        this.googleAuth = gapi.auth2.getAuthInstance();
        this.googleAuth.isSignedIn.listen(this.onSignedInChanged);
        
        if (this.googleAuth.isSignedIn.get()) {
            this.currentUser = this.googleAuth.currentUser.get();
            this.printAccessToken();
        }
    }    
    
    authStateChanges(): Observable<boolean> {
        this.ensureInitialized();
        return this.statusSubject.asObservable();
    }

    isUserAuthenticated(): boolean {
        this.ensureInitialized();
        return this.googleAuth.isSignedIn.get();
    }

    async beginLogin(): Promise<void> {
        this.ensureInitialized();
        this.currentUser = await this.googleAuth.signIn();
        this.printAccessToken();
    }

    logOut(): void {
        this.ensureInitialized();
        this.googleAuth.signOut();

        this.currentUser = null;
    }

    async getProfileAsync(): Promise<UserProfile> {
        this.ensureInitialized();

        let profileResponse = await gapi.client.request({
            path: "https://people.googleapis.com/v1/people/me?personFields=names,photos"
        });
        let profileObject = JSON.parse(profileResponse.body) as IGoogleProfileResponse;
        
        var nameObject: { displayName: string };
        let primaryNameObject = profileObject.names
            .filter(nameObject => nameObject.metadata.primary);
        if (primaryNameObject.length > 0) {
            nameObject = primaryNameObject[0];
        } else {
            nameObject = profileObject.names[0];
        }

        var pictureObject: { url: string; };
        let primaryPictureObject = profileObject.photos
            .filter(pictureObject => pictureObject.metadata.primary);
        if (primaryPictureObject.length > 0) {
            pictureObject = primaryPictureObject[0];
        } else {
            pictureObject = profileObject.photos[0];
        }

        let name = nameObject.displayName;
        let pictureUrl = pictureObject.url;
        let userProfile: UserProfile = {
            name: name,
            pictureUrl: pictureUrl
        };

        return userProfile;
    }

    public getOAuthToken(): string {
        this.ensureInitialized();
        if (!this.googleAuth.isSignedIn.get() || !this.currentUser) {
            throw new Error("The user must be authenticated before requesting an access token");
        }

        return this.currentUser.getAuthResponse().id_token;
    }

    private ensureInitialized() {
        if (!this.googleAuth) {
            throw new Error("initAsync must successfully finish before this method is called");
        }
    }

    private onSignedInChanged(signedIn: boolean) {
        this.statusSubject.next(signedIn);
    }

    private printAccessToken() {
        console.log("Access token: " + this.getOAuthToken());
    }
}

interface IGoogleProfileResponse {
    names: [{
        metadata: {
            primary: boolean
        },
        displayName: string
    }],
    photos: [{
        metadata: {
            primary: boolean
        },
        url: string
    }]
}