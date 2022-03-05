<template>
    <!--zuo-->
    <div class="leftBar">
      <el-col :span="20">
        <br>
        <div style="color: white;font-weight: bolder;text-align: center;">知识库管理系统</div>
        <br>
        <el-menu
            active-text-color="#ffd04b"
            background-color="#7698a2"
            class="el-menu-vertical-demo"
            default-active="1"
            text-color="#fff"
            style="width: 200px;height: 100%;background-color: #7698a2"
        >
          <el-menu-item index="1">
            <el-icon><setting /></el-icon>
            <span @click="selectMenu('1');getUser()">{{menuList[0]}}</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><setting /></el-icon>
            <span @click="selectMenu('2');getRole()">{{ menuList[1] }}</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><setting /></el-icon>
            <span  @click="selectMenu('3');getAuth()">{{menuList[2]}}</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span  @click="selectMenu('4');getKnow()">{{menuList[3]}}</span>
          </el-menu-item>
          <el-sub-menu index="5">
            <template #title>
              <el-icon><location /></el-icon>
              <span>日志管理</span>
            </template>
            <el-menu-item index="1-1" @click="selectMenu('5');getOperaLog()">操作日志</el-menu-item>
            <el-menu-item index="1-2" @click="selectMenu('6');getLoginLog()">登陆日志</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-col>
    </div>
    <div style="position:absolute;left: 250px;top: 40px">
    <span style="color: white;font-weight: bolder">
          知识库管理系统 》 {{menuList[menuIndex-1]}}
    </span>
      <el-divider style="width: 1200px"></el-divider>
    </div>

    <div class="rightBottonBar" >

      <!--    用户管理-->
      <div>
        <el-form :model="form" style="width: 1230px;" v-if="menuIndex==='1'">
          <el-form-item style="color:white;">
            用户名称&nbsp;&nbsp;&nbsp;<el-input v-model="userSendForm.userName" label="请输入用户名称" style="width: 375px"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            手机号码&nbsp;&nbsp;&nbsp;<el-input v-model="userSendForm.phonenumber" label="请输入手机号码" style="width: 375px"></el-input>
          </el-form-item>
          <el-form-item  style="color:white;">
            状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-select v-model="userSendForm.status" placeholder="用户状态" style="width: 375px">
            <el-option label="正常" value='0'></el-option>
            <el-option label="停用" value='1'></el-option>
          </el-select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            创建时间&nbsp;&nbsp;&nbsp;
            <div style="width:400px">
              <el-col :span="11">
                <el-date-picker
                    v-model="userSendForm.beginTime"
                    type="date"
                    placeholder="开始时间"
                    style="width: 100%"
                ></el-date-picker>
              </el-col>
              <el-col :span="2" class="text-center">
                <span class="text-gray-500">-</span>
              </el-col>
              <el-col :span="11">
                <el-date-picker
                    type="date"
                    v-model="userSendForm.endTime"
                    placeholder="结束时间"
                    style="width: 100%"
                ></el-date-picker>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button round @click="getUser" style="background-color: #9a87be;color: white">搜索</el-button>
            <el-button round @click="clearUser">重置</el-button>
            <el-button plain style="position: absolute;right: 120px;background-color: #9a87be;color: white" @click="addUser=true" > +  新增</el-button>
          </el-form-item>
          <el-dialog v-model="addUser" width="550px">
            <h2>添加用户</h2>
            <br>
            <el-form ref="ruleFormRef"
                     :model="addUserSendForm" :rules="rules" >
              <el-form-item prop="nickname">
                用户昵称&nbsp;&nbsp;&nbsp;
                <el-input placeholder="请输入用户昵称" v-model="addUserSendForm.nickname" style="width: 400px">
                </el-input>
              </el-form-item>
              <el-form-item prop="userName">
                用户账号&nbsp;&nbsp;&nbsp;
                <el-input placeholder="请输入用户账号" v-model="addUserSendForm.userName" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                用户密码&nbsp;&nbsp;&nbsp;
                <el-input placeholder="请输入密码" type="password" v-model="addUserSendForm.password" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item>
                归属部门&nbsp;&nbsp;&nbsp;
                <el-select v-model="addUserSendForm.deptName" placeholder="请选择归属部门" style="width: 400px">
                  <el-option label="采编部门1" value='采编部门'></el-option>
                  <el-option label="审核部门2" value='审核部门'></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                手机号码&nbsp;&nbsp;&nbsp;
                <el-input placeholder="请输入手机号码" v-model="addUserSendForm.phonenumber" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱&nbsp;&nbsp;&nbsp;
                <el-input placeholder="请输入邮箱" v-model="addUserSendForm.email" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item>
                用户性别&nbsp;&nbsp;&nbsp;
                <div>
                  <el-radio v-model="addUserSendForm.sex" label="男" size="large" >男</el-radio>
                  <el-radio v-model="addUserSendForm.sex" label="女" size="large">女</el-radio>
                </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                状态&nbsp;&nbsp;&nbsp;
                <div>
                  <el-radio v-model="addUserSendForm.status" label="正常" size="large">正常</el-radio>
                  <el-radio v-model="addUserSendForm.status" label="停用" size="large">停用</el-radio>
                </div>
              </el-form-item>
              <el-form-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                角色&nbsp;&nbsp;&nbsp;<el-select v-model="addUserSendForm.roleName" placeholder="请选择" style="width: 400px">
                  <el-option label="管理员2" value='管理员'></el-option>
                  <el-option label="审核员2" value='审核员'></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <template #footer><span class="dialog-footer">
        <el-button @click="addUser = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
            </template>
          </el-dialog>
          <el-dialog v-model="updateUser" width="550px">
            <h2>修改用户</h2>
            <br>
            <el-form ref="ruleFormRefUpdate"
                     :model="updateUserSendForm" :rules="updateRules">
              <el-form-item prop="nickname">
                用户昵称&nbsp;&nbsp;&nbsp;
                <el-input v-model="updateUserSendForm.nickname" style="width: 400px" disabled>
                </el-input>
              </el-form-item>
              <el-form-item>
                归属部门&nbsp;&nbsp;&nbsp;
                <el-select v-model="updateUserSendForm.deptName" placeholder="请选择归属部门" style="width: 400px">
                  <el-option label="采编部门1" value='采编部门'></el-option>
                  <el-option label="审核部门2" value='审核部门'></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                手机号码&nbsp;&nbsp;&nbsp;
                <el-input placeholder="请输入手机号码" v-model="updateUserSendForm.phonenumber" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱&nbsp;&nbsp;&nbsp;
                <el-input placeholder="请输入邮箱" v-model="updateUserSendForm.email" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item>
                用户性别&nbsp;&nbsp;&nbsp;
                <div>
                  <el-radio v-model="updateUserSendForm.sex" label="男" size="large" value="男">男</el-radio>
                  <el-radio v-model="updateUserSendForm.sex" label="女" size="large" model-value="女">女</el-radio>
                </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                状态&nbsp;&nbsp;&nbsp;
                <div>
                  <el-radio v-model="updateUserSendForm.status" label="正常" size="large">正常</el-radio>
                  <el-radio v-model="updateUserSendForm.status" label="停用" size="large">停用</el-radio>
                </div>
              </el-form-item>
              <el-form-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                角色&nbsp;&nbsp;&nbsp;<el-select v-model="updateUserSendForm.roleName" placeholder="请选择" style="width: 400px">
                  <el-option label="管理员2" value='管理员'></el-option>
                  <el-option label="审核员2" value='审核员'></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <template #footer><span class="dialog-footer">
        <el-button @click="updateUser = false">取消</el-button>
        <el-button type="primary" @click="updateUserFunction">确定</el-button>
      </span>
            </template>
          </el-dialog>
          <el-form-item>
            <el-table :data="userForm" style="width: 100%">
              <el-table-column prop="userId" label="用户编号" width="100" />
              <el-table-column prop="userName" label="用户名称" width="120" />
              <el-table-column prop="nickname" label="用户昵称" width="120" />
              <el-table-column prop="dept" label="部门" width="120" />
              <el-table-column prop="phonenumber" label="手机号码" width="140" />
              <el-table-column prop="status" label="状态" width="100" />
              <el-table-column prop="createTime" label="创建时间" width="200" />
              <el-table-column label="操作" width="280">
                <template #default="scope">
                  <el-button type="text" size="small" @click="update(scope.row)">修改</el-button>
                  <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="updatePassword(scope.row)">重置密码</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>

      <!--    角色管理-->
      <div>
        <el-form :model="form" style="width: 1200px" v-if="menuIndex==='2'">
          <el-form-item  style="color:white;">
            角色名称&nbsp;&nbsp;&nbsp;<el-input v-model="roleSendForm.roleName" label="请输入用户名称" style="width: 375px" placeholder="请输入角色名称"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            状态&nbsp;&nbsp;&nbsp;<el-select v-model="roleSendForm.status" placeholder="角色状态" style="width: 375px">
            <el-option label="正常" value="正常"></el-option>
            <el-option label="停用" value="停用"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round style="background-color: #9a87be;color: white">搜索</el-button>
            <el-button type="plain" round @click="clearRole">重置</el-button>
          </el-form-item>
          <el-dialog v-model="updaterole" width="550px">
            <h2>修改角色</h2>
            <br>
            <el-form
                :model="updateRoleSendForm"  >
              <el-form-item prop="nickname">
                角色名称&nbsp;&nbsp;&nbsp;
                <el-input v-model="updateRoleSendForm.roleName" style="width: 400px">
                </el-input>
              </el-form-item>
              <el-form-item prop="userName">
                <div class="block">
                  <span class="demonstration">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;权限</span>
                  <el-cascader
                      v-model="updateRoleSendForm.menuName"
                      :options="options"
                      :props="props"
                      model-value="updateRoleSendForm.menuName"
                      style="width: 375px"

                  ></el-cascader>
                </div>
              </el-form-item>
              <el-form-item>
                状态&nbsp;&nbsp;&nbsp;
                <div>
                  <el-radio v-model="updateRoleSendForm.status" label="正常" size="large" model-value="正常">正常</el-radio>
                  <el-radio v-model="updateRoleSendForm.status" label="停用" size="large" model-value="正常">停用</el-radio>
                </div>
              </el-form-item>
            </el-form>
            <template #footer><span class="dialog-footer">
        <el-button @click="updaterole = false">取消</el-button>
        <el-button type="primary" @click="updateRoleFunction">确定</el-button>
      </span>
            </template>
          </el-dialog>
          <el-form-item>
            <el-table :data="rolesForm" style="width: 1200px">
              <el-table-column prop="roleId" label="角色编号" width="140" />
              <el-table-column prop="roleName" label="角色名称" width="140" />
              <el-table-column prop="status" label="状态" width="140" />
              <el-table-column prop="createTime" label="创建时间" width="200" />
              <el-table-column label="操作" width="280">
                <template #default="scope">
                  <el-button type="text" size="small" @click="updateRole(scope.row)">修改</el-button>
                  <el-button type="text" size="small" @click="deleteRole(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>

      <!--    菜单-->
      <div>
        <el-form :model="form" style="width: 880px" v-if="menuIndex==='3'">
          <el-table
              :data="menuForm"
              style="width: 100%"
              row-key="menuId"
              border
          >
            <el-table-column prop="menuName" label="菜单名称" width="200" />
            <el-table-column prop="orderNum" label="排序" width="120" />
            <el-table-column prop="perms" label="权限标识" width="220" />
            <el-table-column prop="status" label="状态" width="120" />
            <el-table-column prop="createTime" label="创建时间" width="220" />
          </el-table>
        </el-form>
      </div>

      <!--    知识管理-->
      <div>
        <el-form :model="form" style="width: 1280px"  v-if="menuIndex==='4'">

          <el-form-item>
            知识标题&nbsp;&nbsp;&nbsp;<el-input v-model="knowledgeSendForm.title" label="请输入" placeholder="请输入知识标题" style="width: 375px"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            知识状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-select v-model="knowledgeSendForm.status" placeholder="知识状态" style="width: 375px">
            <el-option label="草稿" value="草稿"></el-option>
            <el-option label="待审核" value="待审核"></el-option>
            <el-option label="发布" value="发布"></el-option>
            <el-option label="审核不通过" value="审核不通过"></el-option>
          </el-select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="getKnow" style="background-color: #9a87be;color: white">搜索</el-button>
            <el-button type="plain" round @click="clearKnow">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-table :data="knowledgeForm" style="width: 100%">
              <el-table-column prop="id" label="知识编号" width="100" />
              <el-table-column prop="title" label="知识标题" width="220" />
              <el-table-column prop="author" label="知识作者" width="100" />
              <el-table-column prop="createTime" label="创建时间" width="200" />
              <el-table-column prop="lifeTime" label="有效时间" width="200" />
              <el-table-column prop="isDelete" label="是否下线" width="100" />
              <el-table-column prop="status" label="知识状态" width="100" />
              <el-table-column prop="version" label="知识版本" width="100" />
              <el-table-column prop="auditor" label="审核者" width="100" />
              <el-table-column label="操作" width="80">
                <template #default="scope">
                  <el-button type="text" size="small" @click="getKnowDetail(scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog v-model="knowdetail" width="650px">
              <div>
                <h2>{{KnowComments.title}}</h2><br>
              </div>
              <div v-html="KnowComments.content">
              </div>
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>

      <!--    操作日志-->
      <div>
        <el-form :model="form" style="width: 1200px"  v-if="menuIndex==='5'">
          <el-form-item>
            系统模块&nbsp;&nbsp;&nbsp;<el-input v-model="operaSendForm.title" label="请输入系统模块" style="width: 375px"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            操作人员&nbsp;&nbsp;&nbsp;<el-input v-model="operaSendForm.operName" label="请输入操作人员" style="width: 375px"></el-input>
          </el-form-item>
          <el-form-item>
            类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-select v-model="operaSendForm.businessType" placeholder="操作类型" style="width: 375px">
            <el-option label="新增" value='1'></el-option>
            <el-option label="修改" value='2'></el-option>
            <el-option label="删除" value='3'></el-option>
            <el-option label="其他" value='0'></el-option>
          </el-select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-select v-model="operaSendForm.status" placeholder="操作状态" style="width: 375px">
              <el-option label="正常" value='0'></el-option>
              <el-option label="异常" value='1'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            操作时间&nbsp;&nbsp;&nbsp;
            <div style="width:400px">
              <el-col :span="11">
                <el-date-picker
                    v-model="operaSendForm.beginTime"
                    type="date"
                    placeholder="开始日期"
                    style="width: 100%"
                ></el-date-picker>
              </el-col>
              <el-col :span="2" class="text-center">
                <span class="text-gray-500">-</span>
              </el-col>
              <el-col :span="11">
                <el-date-picker
                    type="date"
                    v-model="operaSendForm.endTime"
                    placeholder="结束日期"
                    style="width: 100%"
                ></el-date-picker>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="getOperaLog" style="background-color: #9a87be;color: white">搜索</el-button>
            <el-button type="plain" round @click="clearOpera">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-table :data="operationLog" style="width: 100%">
              <el-table-column prop="operId" label="日志编号" width="100" />
              <el-table-column prop="title" label="系统模块" width="100" />
              <el-table-column prop="businessType" label="操作类型" width="100" />
              <el-table-column prop="requestMethod" label="请求方式" width="100" />
              <el-table-column prop="operName" label="操作人员" width="150" />
              <el-table-column prop="operIp" label="操作地址" width="140" />
              <el-table-column prop="operLocation" label="操作地点" width="100" />
              <el-table-column prop="status" label="操作状态" width="100" />
              <el-table-column prop="operTime" label="操作日期" width="260" />
            </el-table>
          </el-form-item>
        </el-form>
      </div>

      <!--    登陆日志-->
      <div>
        <el-form :model="form" style="width: 1200px"  v-if="menuIndex==='6'">
          <el-form-item>
            登陆地址&nbsp;&nbsp;&nbsp;<el-input v-model="loginSendForm.ipaddr" label="请输入地址" style="width: 375px"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            用户名称&nbsp;&nbsp;&nbsp;<el-input v-model="loginSendForm.userName" label="请输入手机号码" style="width: 375px"></el-input>
          </el-form-item>
          <el-form-item>
            状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-select v-model="loginSendForm.status" placeholder="用户状态" style="width: 375px">
            <el-option label="正常" value='0'></el-option>
            <el-option label="异常" value='1'></el-option>
          </el-select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            登陆时间&nbsp;&nbsp;&nbsp;
            <div style="width:400px">
              <el-col :span="11">
                <el-date-picker
                    v-model="loginSendForm.beginTime"
                    type="date"
                    placeholder="开始时间"
                    style="width: 100%"
                ></el-date-picker>
              </el-col>
              <el-col :span="2" class="text-center">
                <span class="text-gray-500">-</span>
              </el-col>
              <el-col :span="11">
                <el-date-picker
                    type="date"
                    v-model="loginSendForm.endTime"
                    placeholder="结束时间"
                    style="width: 100%"
                ></el-date-picker>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="getLoginLog" style="background-color: #9a87be;color: white">搜索</el-button>
            <el-button type="plain" round @click="clearLogin">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-table :data="loginLog" style="width:100%">
              <el-table-column prop="infoId" label="访问编号" width="100" />
              <el-table-column prop="userName" label="用户名称" width="120" />
              <el-table-column prop="ipaddr" label="登录地址" width="140" />
              <el-table-column prop="loginLocation" label="登录地点" width="100" />
              <el-table-column prop="browser" label="浏览器" width="120" />
              <el-table-column prop="os" label="操作系统" width="120" />
              <el-table-column prop="status" label="状态" width="100" />
              <el-table-column prop="msg" label="操作信息" width="150" />
              <el-table-column prop="loginTime" label="登录日期" width="200" />
            </el-table>
          </el-form-item>
        </el-form>
      </div>

      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :background="isBackground"
          :current-page="page"
          :page-sizes="[5, 10, 15,20]"
          :page-size="limit"
          layout="total, jumper, prev, pager, next, sizes"
          :total="100">
      </el-pagination>
    </div>

</template>

<script>
import axios from "axios";
import qs from 'qs';
import {onBeforeMount, ref,reactive} from "vue";
import baseUrl from '../interface/index.js';
import { ElMessageBox, ElMessage } from 'element-plus';
import dateUtil from "../plugins/date.util";

export default {
  name: "Administrator",
  components: {},
  setup(){
    onBeforeMount(async ()=>{
      userSendForm.page=1
      await getUser()
    })
    let limit=ref(10)
    let page=ref(1)
    let addUser=ref(false)
    let knowdetail=ref(false)
    const KnowComments=ref([{
      title:'',
      content:'',
    }])
    const clearOpera=()=>{
      console.log("清楚操作日志")
      operaSendForm.title='';
      operaSendForm.operName='';
      operaSendForm.requestMethod='';
      operaSendForm.status='';
      operaSendForm.beginTime='';
      operaSendForm.endTime='';
    }
    const clearUser=()=>{
      userSendForm.userName='';
      userSendForm.phoneNumber='';
      userSendForm.status='';
      userSendForm.date1='';
      userSendForm.date2='';
    }
    const clearRole=()=>{
      roleSendForm.role='';
      roleSendForm.status='';
      roleSendForm.date1='';
      roleSendForm.date2='';
    }
    const clearKnow=()=>{
      knowledgeSendForm.title='';
      knowledgeSendForm.status='';
    }
    const clearLogin=()=>{
      loginSendForm.ipaddr='';
      loginSendForm.userName='';
      loginSendForm.status='';
      loginSendForm.beginTime='';
      loginSendForm.endTime='';
    }
    const handleSizeChange=(size)=>{
      limit.value=size;
      page.value=1;
      handleCurrentChange(1)
      console.log("limit",limit.value)
    }
    const handleCurrentChange=(currentPage)=>{
      page.value=currentPage
      if(menuIndex.value==='1'){
        userSendForm.page=currentPage
        getUser()
      }else if(menuIndex.value==='2'){
        roleSendForm.page=currentPage
        getRole()
      }else if(menuIndex.value==='3'){
        authSendForm.page=currentPage
        getAuth()
      }else if(menuIndex.value==='4'){
        knowledgeSendForm.page=currentPage
        getKnow()
      }else if(menuIndex.value==='5'){
        operaSendForm.page=currentPage
        getOperaLog()
      }else if(menuIndex.value==='6'){
        loginSendForm.page=currentPage
        getLoginLog()
      }else {
        alert("出错了！")
      }
    }
    const getUser=async () => {
      console.log(userSendForm)
      const {data: res} = await axios.get(`${baseUrl}/api/user/list`, {params: userSendForm})
      userForm.value=res.item.data
      console.log("输出用户")
      for(let i=0;i<res.item.data.length;i++){
        userForm.value[i].dept=res.item.data[i].dept.deptName
        userForm.value[i].status=accountTypeMap.value[res.item.data[i].status]
        let aDate = new Date(res.item.data[i].createTime);
        res.item.data[i].createTime = dateUtil.toChineseString(dateUtil.UTCToLocal(aDate))
      }
      console.log(res.item.data)
    }
    const getRole=async () => {
      console.log("传过去", roleSendForm)
      const {data: res} = await axios.get(`${baseUrl}/api/system/role/list`, {params: roleSendForm})
      rolesForm.value = res.list
      console.log("输出角色")
      for(let i=0;i<res.list.length;i++){
        rolesForm.value[i].status=accountTypeMap.value[rolesForm.value[i].status]
        let aDate = new Date(res.list[i].createTime);
        rolesForm.value[i].createTime = dateUtil.toChineseString(dateUtil.UTCToLocal(aDate))
      }
      console.log(res.list)
    }
    const getAuth=async () => {
      const {data: res} = await axios.get(`${baseUrl}/api/system/menu/treeselect`)
      menuForm.value = res.list
      console.log("输出菜单")
      console.log("第一层",res.list.length)
      for(let i=0;i<res.list.length;i++){

        menuForm.value[i].status=accountTypeMap.value[res.list[i].status]
        let aDate = new Date(res.list[i].createTime);
        menuForm.value[i].createTime = dateUtil.toChineseString(dateUtil.UTCToLocal(aDate))
        console.log("第二层",res.list[i].children.length)
        for(let j=0;j<res.list[i].children.length;j++){

          menuForm.value[i].children[j].status=accountTypeMap.value[res.list[i].children[j].status]
          let aDate2 = new Date(res.list[i].children[j].createTime);
          res.list[i].children[j].createTime = dateUtil.toChineseString(dateUtil.UTCToLocal(aDate2))
          console.log(res.list[i].children[j].children.length)
          for(let k=0;k<res.list[i].children[j].children.length;k++){
            menuForm.value[i].children[j].children[k].status=accountTypeMap.value[res.list[i].children[j].children[k].status]
            let aDate3 = new Date(res.list[i].children[j].children[k].createTime);
            res.list[i].children[j].children[k].createTime = dateUtil.toChineseString(dateUtil.UTCToLocal(aDate3))
          }
        }
        console.log("i是",i)
      }
      console.log(res)
      console.log("第四层",res.list[1].children[0].children.length)
      console.log("第四层",res.list[1].children[1].children.length)
    }
    const getKnow=async () => {
      console.log("传过去",knowledgeSendForm)
      const {data: res} = await axios.get(`${baseUrl}/api/knowledge/selectKnowledgeManageInfo`, {params: knowledgeSendForm})
      knowledgeForm.value=res.item.data
      for(let i=0;i<res.item.data.length;i++){

        let aDate = new Date(res.item.data[i].createTime);
        res.item.data[i].createTime = dateUtil.toChineseString(dateUtil.UTCToLocal(aDate))
        let aDate2 = new Date(res.item.data[i].lifeTime);
        res.item.data[i].lifeTime = dateUtil.toChineseString(dateUtil.UTCToLocal(aDate2))

        knowledgeForm.value[i].status=knowledgeStatusMap.value[res.item.data[i].status]
        if(res.item.data[i].isDelete==="0"){
          knowledgeForm.value[i].isDelete="未删除"
        }else knowledgeForm.value[i].isDelete="已删除"
        // knowledgeForm.value[i].isDelete=isDeleteMap[res.item.data[i].isDelete]
        if(res.item.data[i].version==='A'){
          knowledgeForm.value[i].version='历史'
        }else knowledgeForm.value[i].version='最新'
      }
      console.log("输出知识管理")
      console.log(res.item.data)
    }
    const getOperaLog = async () => {
      console.log("传过去",operaSendForm)

      const {data: res} = await axios.get(`${baseUrl}/api/monitor/operaLog`, {params: operaSendForm})
      operationLog.value=res.item.data
      console.log("输出操作日志")
      console.log(operationLog.value)
      for(let i=0;i<res.item.data.length;i++){
        operationLog.value[i].businessType=businessMap.value[res.item.data[i].businessType]
        operationLog.value[i].status=operaTypeMap.value[res.item.data[i].status]
        let aDate = new Date(res.item.data[i].operTime);
        res.item.data[i].operTime = dateUtil.toChineseString(dateUtil.UTCToLocal(aDate))
      }
    }

    const getLoginLog= async () => {
      console.log("传过去",loginSendForm)
      const {data: res} = await axios.get(`${baseUrl}/api/monitor/logInfo/list`, {params: loginSendForm})
      loginLog.value=res.item.data
      console.log("输出登录日志")
      for(let i=0;i<res.item.data.length;i++){
        loginLog.value[i].status=operaTypeMap.value[res.item.data[i].status]
        let aDate = new Date(res.item.data[i].loginTime);
        loginLog.value[i].loginTime = dateUtil.toChineseString(dateUtil.UTCToLocal(aDate))
        console.log(loginLog.value[i].loginTime)
      }
      console.log(loginLog.value)
    }
    const getKnowDetail = async (val) => {
      knowdetail.value=true
      console.log("id为", val.id)
      const {data: res} = await axios.get(`${baseUrl}/api/knowledge/getKnowledgeDetails`, {params: {id:val.id}})
       KnowComments.value = res.item
      console.log("输出知识详情",KnowComments.value)
    }
    const menuList=ref(["用户管理","角色管理","菜单管理","知识管理","日志管理  》 操作日志","日志管理  》 登录日志"])

    const handleClick = () => {
      console.log('click')
    }

    const businessMap=ref(["其他","新增","修改","删除"])
    const operaTypeMap=ref(["正常","异常"])
    const accountTypeMap=ref(["正常","停用"])
    const knowledgeStatusMap=ref(["草稿","待审核","发布","审核不通过"])
    const isDeleteMap=ref(["未删除","已删除"])

    let menuIndex=ref('1')
    const rolesForm=ref([{
      roleId:'',
      roleName:'',
      status:'',
      createTime:'',
    }])
    const userForm=ref([{
      userId:'',
      userName:'',
      nickname:'',
      dept:'',
      phonenumber:'',
      status:'',
      createTime:'',
    }])
    const operationLog=ref([{
      operId:'',
      title:'',//系统模块
      businessType:'',//新增修改删除
      method:'',
      operName:'',
      operIp:'',
      operLocation:'',
      status:'',
      operTime:'',
    }])
    const loginLog=ref([{
      infoId:'',
      userName:'',
      ipaddr:'',
      loginLocation:'',
      browser:'',
      os:'',
      status:'',
      msg:'',
      loginTime:'',
    }])
    const knowledgeForm=ref([{
      id:'',
      title:'',
      author:'',
      createTime:'',
      lifeTime:'',
      isDelete:'',
      status:'',
      version:'',
      auditor:'',
      auditTime:'',
    }])
    const menuForm=ref([{
      menuName:'',
      menuId:'',
      parentName:'',
      createTime:'',
      createBy:'',
      parentId:'',
      orderNum:'',
      path:'',//路由地址
      visible:'',
      perms:'',
      status:''
    }])

    let operaSendForm=reactive({
      title:null,
      operName:null,
      businessType:null,
      status:null,
      beginTime:null,
      endTime:null,
      page:null,
      limit:limit,
    })
    const userSendForm=reactive({
      userName:'',
      phonenumber:null,
      status:null,
      beginTime:null,
      endTime:null,
      page:null,
      limit:10,
    })
    const roleSendForm=reactive({
      roleName:null,
      status:null,
      page:null,
      limit:limit,
    })
    const authSendForm=reactive({
      userName:'',
      status:'',
      date1:'',
      date2:'',
    })
    const knowledgeSendForm=reactive({
      title:null,
      status:null,
      limit:limit,
      page:null,
    })
    const loginSendForm=reactive({
      ipaddr:null,
      userName:null,
      status:null,
      beginTime:null,
      endTime:null,
      page:null,
      limit:limit,
    })
    //添加用户
    const addUserSendForm=reactive({
      nickname:'',
      deptName:'',
      phonenumber:'',
      email:'',
      userName:'',
      password:'',
      sex:'',
      status:'',
      roleName:'',
    })
    //修改用户
    const updateUserSendForm=reactive({
      nickname:'',
      deptName:'',
      phonenumber:'',
      email:'',
      sex:'',
      status:'',
      roleName:'',
    })
    const updateRoleSendForm=reactive({
      roleName:'',
      status:'',
      menuName:''
    })
    const updatePwdSendForm=reactive((({
      userId:'',
      pwd:''
    })))
    const rules=reactive({
      nickname:[{
        required:true,
        message:'请输入用户昵称',
         trigger:'blur',
      }],
      userName:[{
        required:true,
        message:'请输入用户账号',
        trigger:'blur',
      }],
      password:[{
        required:true,
        message:'请输入用户密码',
        trigger:'blur',
      }],
    })
    const updateRules=reactive({
      nickname:[{
        required:true,
        message:'请输入用户昵称',
        trigger:'blur',
      }],
    })

    const selectMenu=(index)=>{
      page.value=1;
      loginSendForm.page=1;
      knowledgeSendForm.page=1;
      roleSendForm.page=1;
      authSendForm.page=1;
      userSendForm.page=1;
      operaSendForm.page=1;
      menuIndex.value=index
      console.log("index",index)
      console.log("menu",menuIndex.value)
    }

    const updateUser=ref(false)
    const update=(val)=>{
      console.log("当前行的信息为",val)
      updateUser.value=true
      //获取当前行的值进行赋值渲染
      updateUserSendForm.nickname=val.nickname
      updateUserSendForm.deptName=val.deptName
      updateUserSendForm.phonenumber=val.phonenumber
      updateUserSendForm.email=val.email
      updateUserSendForm.sex=val.sex
      updateUserSendForm.status=val.status
      updateUserSendForm.roleName=val.roleName
    }

    const deleteUser=async(val)=>{
      await ElMessageBox.confirm(
          '你确定要删除该用户吗?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(async ()=>{
        console.log("删除的用户id是",val.userId)
        const {data: res} = await axios.delete(`${baseUrl}/api/user/delete`,{params:{userId:val.userId}}).then(res=>{
          del.value=true
          console.log("删除后的bool值",del.value)
          ElMessage({
            message: '删除成功！',
            type: 'success',
          })
          getUser()
        }).catch(res=>{
          ElMessage({
            message: '删除失败！',
            type: 'error',
          })
        })
      }).catch(() => {
        if(!del.value) {
          ElMessage({
            type: 'error',
            message: '取消删除！',
          })
        }
          })

    }
    const del=ref(false)
    const up=ref(false)
    const updatePassword=async (val)=>{
      await ElMessageBox.prompt(`请输入${val.nickname}新密码`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(async ({ value }) => {
         console.log("修改的密码",value)
        updatePwdSendForm.userId=val.userId
        updatePwdSendForm.pwd=value
        console.log(typeof value.toString())
            const {data: res} = await axios.put(`${baseUrl}/api/user/resetPwd`, {
              userId: val.userId,
              pwd: value.toString()
            }).then(res=>{
              up.value=true
              console.log("修改后的bool值",up.value)
              ElMessage({
                type: 'success',
                message: `修改密码成功!`,
              })
            }).catch(res=>{
              ElMessage({
                message: '修改密码失败！',
                type: 'error',
              })
            })
          }).catch(() => {
              if(!up.value){
                ElMessage({
                  type: 'info',
                  message: '取消修改密码！',
                })
              }
          })
    }
    const assignRole=()=>{

    }
    const updaterole=ref(false)
    const updateRoleFunction=async () => {
      const {data: res} = await axios.post(`${baseUrl}/api/system/role/update`, updateRoleSendForm).then(res => {
        ElMessage({
          message: '修改成功！',
          type: 'success',
        })
        updaterole.value = false
        getRole()
      }).catch(res => {
        ElMessage({
          message: '修改失败！',
          type: 'error',
        })
        updaterole.value = false
      })


    }
    const updateRole=(val)=>{
        updaterole.value=true
        updateRoleSendForm.roleName=val.roleName
        updateRoleSendForm.status=val.status
    }
    let delRole=ref(false)
    const deleteRole=async (val)=>{
        await ElMessageBox.confirm(
            '你确定要删除该角色吗?',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }
        ).then(async ()=>{
          console.log("删除的角色id是",val.roleId)
          const {data: res} = await axios.delete(`${baseUrl}/api/system/role/delete`,{params:{roleId:val.roleId}}).then(res=>{
            delRole.value=true
            console.log("删除角色后的bool值",delRole.value)
            ElMessage({
              message: '删除成功！',
              type: 'success',
            })
            getRole()
          }).catch(res=>{
            ElMessage({
              message: '删除失败！',
              type: 'error',
            })
          })
        }).catch(() => {
          if(!delRole.value) {
            ElMessage({
              type: 'error',
              message: '取消删除！',
            })
          }
        })
    }
    const dataAuth=()=>{

    }
    const assignUser=()=>{

    }
    const knowDetail=()=>{
        knowdetail=true
    }
    const ruleFormRef=ref(null)
    function submit(){
      ruleFormRef.value.validate(valid=>{
        if(valid){
          addUserFunction()
          addUser.value = false;
        }else {
          alert("验证失败！")
        }
      })
    }
    const ruleFormRefUpdate=ref(null)
    function updateUserForm(){
      ruleFormRefUpdate.value.validate(valid=>{
        if(valid){
          updateUserFunction()
          updateUser.value = false;
        }else {
          alert("验证失败！")
        }
      })
    }
   const addUserFunction= async () => {
     //console.log("传过去的添加用户信息",addUserSendForm)
     const {data: res} = await axios.post(`${baseUrl}/api/user/addUser`, addUserSendForm).then(res=>{
       ElMessage({
         message: '添加成功！',
         type: 'success',
       })
     }).catch(res=>{
       ElMessage({
         message: '添加失败！',
         type: 'error',
       })
     })
     console.log("传过去了用户",addUserSendForm)
   }

   const updateUserFunction=async ()=>{
      //更新用户信息
   }
    const props = {
      expandTrigger: 'hover',
      multiple: true
    }
    const options = [
      {
        value: '1',
        label: '系统管理',
        children: [{
          value: '107',
          label: '知识管理',
        },{
          value: '1076',
          label: '发布知识查看',
        },{
          value: '1071',
          label: '知识查询',
        },{
          value: '1072',
          label: '知识新增',
        },{
          value: '1073',
          label: '知识修改',
        },{
          value: '1074',
          label: '知识删除',
        },{
          value: '1075',
          label: '知识审核',
        },{
          value: '100',
          label: '用户管理',
        },{
          value: '1001',
          label: '用户查询',
        },{
          value: '1002',
          label: '用户新增',
        },{
          value: '1003',
          label: '用户修改',
        },{
          value: '1004',
          label: '用户删除',
        },{
          value: '1007',
          label: '重置密码',
        },{
          value: '101',
          label: '角色管理',
        },{
          value: '1008',
          label: '角色查询',
        },{
          value: '1009',
          label: '角色修改',
        },{
          value: '1011',
          label: '角色删除',
        },{
          value: '102',
          label: '菜单管理',
        },{
          value: '1013',
          label: '菜单查询',
        },{
          value: '1014',
          label: '菜单新增',
        },{
          value: '1015',
          label: '菜单修改',
        },{
          value: '1016',
          label: '菜单删除',
        },{
          value: '108',
          label: '日志管理',
        },{
          value: '500',
          label: '操作日志',
        },{
          value: '1040',
          label: '操作查询',
        },{
          value: '1041',
          label: '操作删除',
        },{
          value: '501',
          label: '登陆日志',
        },{
          value: '501',
          label: '登录查询',
        },]
      },{
        value: '2',
        label: '业务管理',
        children: [{
          value: '106',
          label: '工单管理',
        },{
          value: '1061',
          label: '工单新增',
        },{
          value: '1062',
          label: '工单查询',
        },{
          value: '1063',
          label: '工单审核',
        },{
          value: '105',
          label: '反馈管理',
        },{
          value: '1053',
          label: '反馈处理',
        },{
          value: '1051',
          label: '反馈新增',
        },{
          value: '1052',
          label: '反馈查询',
        },]
      }]
    const isBackground=ref(true)
    return{
      isBackground,
      options,
      props,
      menuIndex,
      limit,
      page,
      up,
      del,
      delRole,

      rolesForm,
      userForm,
      operationLog,
      loginLog,
      menuList,
      knowledgeForm,
      menuForm,

      handleClick,
      selectMenu,
      getOperaLog,
      getLoginLog,
      getUser,
      getRole,
      getAuth,
      getKnow,
      handleSizeChange,
      handleCurrentChange,

      clearOpera,
      clearUser,
      clearKnow,
      clearLogin,
      clearRole,

      userSendForm,
      roleSendForm,
      authSendForm,
      knowledgeSendForm,
      operaSendForm,
      loginSendForm,

      updateUser,
      deleteUser,
      updatePassword,
      assignRole,
      updaterole,


      updateRole,
      deleteRole,
      dataAuth,
      assignUser,

      knowDetail,

      businessMap,
      operaTypeMap,
      knowledgeStatusMap,
      isDeleteMap,

      addUser,
      addUserSendForm,
      rules,
      addUserFunction,
      updateUserSendForm,
      submit,
      knowdetail,
      getKnowDetail,
      ruleFormRef,
      ruleFormRefUpdate,
      updateRoleSendForm,
      updateRules,
      update,
      updateUserFunction,
      updateUserForm,
      updatePwdSendForm,
      KnowComments,//接收知识详情
      updateRoleFunction,
    }
  }

}
</script>
<style scoped lang="less">

@deep: ~'>>>';

.rightBottonBar{
  position: absolute;
  right: 50px;
  left: 250px;
  top: 120px;
}
.leftBar{
  position: absolute;
  left: 0px;
  width: 200px;
  height: 800px;
  background-color:rgb(118,152,162);
}

/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell{
  background-color: transparent;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color:rgba(255,255,255,0.5);
}

.msg-pagination-container.is-background .el-pager li {
  /*对页数的样式进行修改*/
  background-color:rgba(255,255,255,0.5);
  color: #FFF;
}
.msg-pagination-container.is-background .btn-next {
  /*对下一页的按钮样式进行修改*/
  background-color:rgba(255,255,255,0.5);
  color: #FFF;
}
.msg-pagination-container.is-background .btn-prev {
  /*对上一页的按钮样式进行修改*/
  background-color: rgba(255,255,255,0.5);
  color: #FFF;
}
.msg-pagination-container.is-background .el-pager li:not(.disabled).active {
  /*当前选中页数的样式进行修改*/
  background-color: #9a87be;
  color: #FFF;
}
</style>