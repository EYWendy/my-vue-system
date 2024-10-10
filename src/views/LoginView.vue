<template>
    <div class="login-box">
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="80px"
            class="demo-ruleForm">
            <h2>后台管理系统</h2>
            <el-form-item label="账号：" prop="account">
                <el-input v-model="ruleForm.account" autocomplete="off" clearable />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" clearable />
            </el-form-item>
            <el-form-item>
                <el-button class="loginBtn" type="primary" @click="submitForm(ruleFormRef)">
                    登入
                </el-button>
                <el-button class="loginBtn" @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { LoginData } from '../type/login';
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/request/api';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        {
            // const data = reactive({
            //     ruleForm: {
            //         account: "",
            //         password: ""
            //     },
            //     rules: {
            //         username: [
            //             { required: true, message: '请输入你的账号', trigger: 'blur' },
            //             { min: 3, max: 10, message: '账号的长度在3到10之间', trigger: 'blur' },
            //         ],
            //         password: [
            //             { required: true, message: '请输入你的密码', trigger: 'blur' },
            //             { min: 3, max: 10, message: '密码的长度在3到10之间', trigger: 'blur' },
            //         ]
            //     }
            // })
            // return { ...toRefs(data) }
        }

        const data = reactive(new LoginData())

        const rules = {
            account: [
                { required: true, message: '请输入你的账号', trigger: 'blur' },
                { min: 3, max: 10, message: '账号的长度在3到10之间', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入你的密码', trigger: 'blur' },
                { min: 3, max: 10, message: '密码的长度在3到10之间', trigger: 'blur' },
            ]
        }

        // 登录
        const ruleFormRef = ref<FormInstance>()
        const router = useRouter() //-->$router

        const submitForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return

            // 对整个表单进行验证
            // valid布尔类型，true表示验证成功
            formEl.validate((valid) => {
                if (valid) {
                    //console.log('submit!')
                    login(data.ruleForm).then((res) => {
                        // console.log(res);

                        // 保存token
                        localStorage.setItem('token', res.data.accessToken)

                        //跳转到首页
                        router.push('/')
                    });

                } else {
                    console.log('error submit!')
                }
            })
        }

        // 重置
        const resetForm = () => {
            data.ruleForm.account = ""
            data.ruleForm.password = ""
        }

        return { ...toRefs(data), rules, resetForm, ruleFormRef, submitForm }
    }
})
</script>

<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100vh;
    background: url("@/assets/bg2.png") no-repeat center center;
    background-size: cover;
    //background-color: #f00;
    padding: 1px;
    text-align: center;
    overflow: hidden;

    .demo-ruleForm {

        width: 400px;
        margin: 250px auto;
        background-color: #fff;
        padding: 40px;
        border-radius: 20px;
    }

    .loginBtn {
        width: 40%;
    }

    h2 {
        text-align: center;
        margin-bottom: 20px;
    }
}
</style>