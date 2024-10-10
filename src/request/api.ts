import service from "@/request/index";
import type {ILoginData} from "@/type/login";
import type {ICategoryData,ISelectData} from "@/type/categories";

// 登录
export function login(data:ILoginData){
    return service({
        url:"/CMSUser/Login",
        method:"post",
        data
    })
}

// 分类列表接口
export function categorySearch(data:ISelectData){
    return service({
        url:"/CMSCategory/Search",
        method:"post",
        data
    })
}

export function getCategory(id:number){
    return service({
        url:"/CMSCategory/GetCategorybyId?id="+id,
        method:"get",
    })
}

export function categoryInsertOrUpdate(data:ICategoryData){
    return service({
        url:"/CMSCategory/InsertOrUpdate",
        method:"post",
        data
    })
}

export function categoryDelete(id:number){
    return service({
        url:"/CMSCategory/Delete?id="+id,
        method:"delete",
    })
}