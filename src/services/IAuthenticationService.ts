import { Observable } from "rxjs";

export default interface IAuthenticationService {
    initAsync(): Promise<any>;
    authStateChanges(): Observable<boolean>;
    isUserAuthenticated(): boolean;
    beginLogin(): void;
}