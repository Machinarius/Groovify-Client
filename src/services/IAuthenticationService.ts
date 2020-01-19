import { Observable } from "rxjs";

import UserProfile from "../models/UserProfile";

export default interface IAuthenticationService {
    initAsync(): Promise<any>;
    authStateChanges(): Observable<boolean>;
    isUserAuthenticated(): boolean;
    beginLogin(): void;
    getProfileAsync(): Promise<UserProfile>;
    logOut(): void;
}