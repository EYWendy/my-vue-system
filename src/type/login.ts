export interface ILoginData {
    account: string,
    password: string
}

export class LoginData {
    ruleForm: ILoginData = {
        account: "admin",
        password: "123456"
    }
}