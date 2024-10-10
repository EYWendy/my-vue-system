<template>
    <div>
        <h2>
            用户管理
        </h2>
    </div>
</template>

<script lang="ts" setup>

const formInline = {
    user: '',
    region: '',
    date: '',
}
//  reactive({
//   user: '',
//   region: '',
//   date: '',
// })

const onSubmit = () => {
    console.log('submit!')
}

</script>

<style scoped>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}
</style>