import { fa } from "element-plus/es/locales.mjs"

/**
 * 分类类型定义
 */
export interface ICategoryData {
    id: number,
    name: string,
    sort: number,
    isActive: boolean
}

export interface ISelectData {
    skipCount: number,
    maxResultCount: number,
    sortExpression: string,
    name: string,
}

export interface IActiveData {
    id: number,
    name: string,
    sort: number,
    isActive: boolean
}

export class InitData {

    // 搜索条件
    selectData: ISelectData = {
        skipCount: 0,
        maxResultCount: 2,
        sortExpression: "",
        name: "",
    }

    list: ICategoryData[] = []// 列表展示的内容数据
    totalCount:number=0
    isShow=false
    descript="编辑信息"
    active:IActiveData={
        id: 0,
        name: "",
        sort: 0,
        isActive: false
    }
    statusList=[{
        key:"启用",
        value:true
    },
    {
        key:"关闭",
        value:false
    }
]
}
