<template>
  <div class="home">
    <el-container>

      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <img src="../assets/logo.svg" class="logo" />
          </el-col>
          <el-col :span="16">
            <h2>后台管理系统</h2>
          </el-col>
          <el-col :span="4" class="col-btn">
            <!-- <span class="quit-login" @click="delToken">登出</span> -->
            <el-button @click="delToken">退出登录</el-button>
          </el-col>
        </el-row>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
            :default-active="activeValue" text-color="#fff" router >

            <!-- router 开启路由模式通过el-menu-item index 来进行跳转 -->
            <el-menu-item :index="item.path" v-for="(item,index) of list" :key="item.path">
              <span>{{item.meta.title}}</span>
            </el-menu-item>

          </el-menu>
        </el-aside>

        <el-main>
          <!-- 设置路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: "HomeView",
  components: {

  },
  setup() {
    const router = useRouter()
    const route = useRoute()
   // console.log(router.getRoutes());
    const list=router.getRoutes().filter(v=>v.meta.isShow);
    //console.log(list);
    const activeValue = ref(route.path)

    const delToken=()=>{

      localStorage.removeItem('token');
      router.push('/login')
    }

    return {list,activeValue,delToken}
  }
});

</script>
<style lang="scss" scoped>
.el-header {
  height: 80px;
  background-color: #666;

  .logo {
    height: 80px;
  }

  h2,
  .quit-login {
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: #fff;
  }

  .col-btn{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 80px;
    line-height: 80px;
  }
}

.el-aside {
    .el-menu {
      height: calc(100vh - 80px);
    }
  }

 
</style>
