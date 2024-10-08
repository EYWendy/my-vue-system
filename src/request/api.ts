import service from "@/request/index";

interface LoginData{
    account:string,
    password:string
}

export function login(data:LoginData){
    return service({
        url:"/CMSUser/Login",
        method:"post",
        data
    })
}