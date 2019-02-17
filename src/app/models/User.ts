export class User {
    id?: string;
    email?: string;
    password?: string;
    name?: string;
    urlAvt?: string;
    roles?: Array<string> = ["user"];
}