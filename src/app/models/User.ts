export class User {
    id?: string;
    username?: string;
    password?: string;
    name?: string;
    urlAvt?: string;
    roles?: Array<string> = ["user"];
}