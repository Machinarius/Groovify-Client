import { Observable } from "rxjs";

export default interface IAuthenticationService {
    authStateChanges(): Observable<boolean>;
    isUserAuthenticated(): boolean;
}