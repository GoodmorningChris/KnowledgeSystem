<template>
  <el-form :model="form" ref="formref" :rules="rules">
    <el-form-item prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>

import {reactive, ref} from "vue";

export default {
  name: "test",
  setup(){
    const form=reactive({
      name:''
    })
    const rules=reactive({
      name:[{
        required:true,
        message:'请输入'
      }]
    })
    const formref=ref(null)

    return{
      form,rules,formref
    }
  }
}
</script>

<style scoped>

</style>