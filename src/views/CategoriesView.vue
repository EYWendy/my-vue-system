<template>
    <div>
        <h2>分类管理</h2>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="名称">
                    <el-input v-model="selectData.name" placeholder="请输入关键字" clearable />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSearch()">查询</el-button>
                    <el-button type="primary" @click="addCategory()">建立</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="list" border style="width: 100%">
            <!-- <el-table-column prop="id" label="id" width="100" /> -->
            <el-table-column prop="name" label="名称" width="300" />
            <el-table-column prop="sort" label="排序" width="100" />
            <el-table-column prop="isActive" label="状态" width="100">
                <template v-slot="scope">
                    <!-- {{ scope.row.isActive ? '启用' : '关闭' }} -->
                    <el-switch v-model="scope.row.isActive" class="ml-2"
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #e5e9f2" disabled />
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="changeCategory(scope.row)">编辑</el-button>
                    <el-button link type="primary" size="small" class="del-btn"
                        @click="open(scope.row.id)">删除</el-button>

                    <!-- <el-popconfirm width="230px" confirm-button-text="确定" cancel-button-text="取消" icon-color="#626AEF"
                        title="是否确定删除？" @confirm="confirmEvent(scope.row.id)" @cancel="cancelEvent">
                        <template #reference>
                            <el-button link type="primary" size="small" class="del-btn">删除</el-button>
                        </template>
    </el-popconfirm> -->
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination @size-change="sizeChange" @current-change="currentChange" :default-page-size="2"
                :page-sizes="[2, 10]" layout=" prev, pager, next, sizes" :total="totalCount" />
        </div>
    </div>

    <el-dialog v-model="isShow" :title="descript" width="500px" @close="editCancel">
        <el-form ref="ruleFormRef" :model="active" :rules="rules">
            <el-form-item label="名称：" prop="name" label-width="80px">
                <el-input v-model="active.name" autocomplete="off" />
            </el-form-item>

            <el-form-item label="状态：" prop="isActive" label-width="80px">
                <el-select v-model="active.isActive" placeholder="请选择">
                    <!-- <el-option label="请选择" value="null" disabled /> -->
                    <el-option v-for="item of statusList" :label="item.key" :value="item.value" :key="item.key" />
                    <!-- <el-option label="开启" value="1" /> 
                      <el-option label="关闭" value="0" /> -->
                </el-select>
            </el-form-item>
            <el-form-item label="排序：" prop="sort" label-width="80px">
                <el-input-number v-model="active.sort" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="editCancel">取消</el-button>
                <el-button type="primary" @click="updateCategory(ruleFormRef)">
                    提交
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue'
import { categorySearch, categoryDelete, getCategory, categoryInsertOrUpdate } from '@/request/api'
//import { ICategoryData,InitData } from '@/type/categories'
import { InitData } from "@/type/categories";
import type { ICategoryData } from "@/type/categories";

import { ElMessage, ElMessageBox, ElForm } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { da } from 'element-plus/es/locales.mjs';

export default defineComponent({
    setup() {

        const data = reactive(new InitData())

        // categorySearch(data.selectData).then(res => {
        //     //console.log(res);
        //     data.list = res.data.items;
        //     data.totalCount = res.data.totalCount;
        // });

        // 查询
        const onSearch = () => {
            categorySearch(data.selectData).then(res => {
                data.list = res.data.items;
                data.totalCount = res.data.totalCount;
            });
        };

        const currentChange = (page: number) => {
            data.selectData.skipCount = (page - 1) * data.selectData.maxResultCount;

            onSearch();
        }

        const sizeChange = (pagesize: number) => {
            data.selectData.maxResultCount = pagesize;
            data.selectData.skipCount = 0;

            onSearch();
        }

        const addCategory = () => {
            data.isShow = true;
            data.descript="建立信息"
            data.active.id = 0;
            data.active.name = "";
            data.active.sort = 0;
            data.active.isActive = false;
        }

        const changeCategory = (row: ICategoryData) => {
            // console.log(row);
            data.isShow = true;
            data.descript="编辑信息"
            // data.active.id = row.id;
            // data.active.name = row.name;
            // data.active.sort = row.sort;
            // data.active.isActive = row.isActive;
            getCategory(row.id).then(res => {
                data.active = res.data;
                //console.log(res.data);
            });
        }

        const delCategory = (id: number) => {
            categoryDelete(id).then(res => {
                onSearch();
            })
        }

        const confirmEvent = (id: number) => {
            //console.log('confirm!')
            delCategory(id)
        }
        const cancelEvent = () => {
            //console.log('cancel!')
        }

        const open = (id: number) => {
            ElMessageBox.confirm(
                '是否确定删除？',
                '确认',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    //center: true,
                    draggable: true, // 可拖放
                    //overflow: true,
                    //modal: true, // 确保 modal 选项是开启的
                    closeOnClickModal: false, // 不允许点击外部区域关闭
                    // 自定义样式
                    //customClass: 'my-message-box', // 添加自定义类
                }
            )
                .then(() => {
                    delCategory(id);
                    ElMessage({
                        type: 'success',
                        message: '成功',
                    })
                })
                .catch(() => {
                    // ElMessage({
                    //     type: 'info',
                    //     message: 'Delete canceled',
                    // })
                })
        }

        const editCancel = () => {
            data.isShow = false;
            if (ruleFormRef.value) {
                ruleFormRef.value.resetFields(); // 重置表单字段
            }
        }

        const ruleFormRef = ref<FormInstance>()

        const updateCategory = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    categoryInsertOrUpdate(data.active).then(res => {
                        //console.log(res);
                        data.isShow = false;

                        onSearch();
                    }).catch((res: any) => {
                        //console.log(res);
                        ElMessage({
                            type: 'error',
                            message: res.message,
                        })
                    })
                }
            })
        }

        const rules = {
            name: [
                { required: true, message: '请输入分类名称', trigger: 'blur' },
            ],
            sort: [
                { required: true, type: 'number', message: '排序必须为数字', trigger: 'blur' }
            ]
        }

        // 页面进来就执行
        onMounted(  ()=>{ onSearch()});

        // 动态添加样式
        setTimeout(() => {
            const wrapper = document.querySelector('.el-message-box__wrapper') as HTMLElement;
            if (wrapper) {
                wrapper.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                wrapper.style.zIndex = '2000';
            }
        }, 0);

        return { ...toRefs(data), rules, ruleFormRef, onSearch, sizeChange, currentChange, changeCategory, delCategory, confirmEvent, cancelEvent, open, editCancel, updateCategory, addCategory };
    }
})

</script>

<style lang="scss" scoped>
.select-box {
    margin-top: 20px;
}

.pagination-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    /* 可根据需要调整 */
}

.del-btn {
    color: red;
}

.el-message-box {
    background-color: rgba(255, 255, 255, 1) !important;
    /* 消息框的背景色 */
}

::v-deep .el-message-box__wrapper {
    background-color: rgba(255, 255, 255, 1) !important;
    /* 确保背景不透明 */
    z-index: 2000;
    /* 确保高于其他元素 */
}
</style>