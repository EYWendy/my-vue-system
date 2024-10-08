interface loginFromInt {
    account: string,
    password: string
}

export class LoginData {
    ruleForm: loginFromInt = {
        account: "admin",
        password: "123456"
    }
}