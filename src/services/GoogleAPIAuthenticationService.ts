import { Observable, Subject } from "rxjs";

import IAuthenticationService from "./IAuthenticationService";

export default class GoogleAPIAuthenticationService implements IAuthenticationService {
    private googleAuth: gapi.auth2.GoogleAuth;
    private statusSubject: Subject<boolean>;

    async initAsync(): Promise<any> {
        await gapi.client.init({
            apiKey: process.env.GOOGLE_API_KEY,
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
            discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
            scope: "profile"
        });

        this.statusSubject = new Subject<boolean>();
        this.googleAuth = gapi.auth2.getAuthInstance();
        this.googleAuth.isSignedIn.listen(this.onSignedInChanged);
    }    
    
    authStateChanges(): Observable<boolean> {
        this.ensureInitialized();
        return this.statusSubject.asObservable();
    }

    isUserAuthenticated(): boolean {
        this.ensureInitialized();
        return this.googleAuth.isSignedIn.get();
    }

    private ensureInitialized() {
        if (!this.googleAuth) {
            throw new Error("initAsync must successfully finish before this method is called");
        }
    }

    private onSignedInChanged(signedIn: boolean) {
        this.statusSubject.next(signedIn);
    }
}