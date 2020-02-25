import IMusicPlayerController from "./IMusicPlayerController";
import IAuthenticationService from "./IAuthenticationService";

export default class DefaultPlayerController implements IMusicPlayerController {
    constructor(
        private authService: IAuthenticationService
    ) { }
}