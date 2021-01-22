<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7"
          ><el-input placeholder="请输入内容" v-model="userSearch" clearable>
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4"
          ><el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          ></el-col
        >
      </el-row>
      <el-table
        :data="userlist"
        border
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50px"
        ></el-table-column>
        <el-table-column
          align="center"
          label="姓名"
          prop="userName"
        ></el-table-column>
        <el-table-column
          align="center"
          label="邮箱"
          prop="email"
        ></el-table-column>
        <el-table-column
          align="center"
          label="角色"
          prop="role"
        ></el-table-column>
        <el-table-column
          align="center"
          label="手机号"
          prop="el"
        ></el-table-column>
        <el-table-column align="center" label="创建时间" prop="create_time">
          <template slot-scope="{ row }">
            {{ row.create_time | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="{ row }">
            <el-switch v-model="row.mg_state"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180px">
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUser"
            ></el-button>
            <el-tooltip class="tooltip" content="分配角色" placement="top">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="29"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      @close="addDialogClosed"
    >
      <span>
        <el-form
          :model="addUserForm"
          :rules="addRules"
          ref="addRuleForm"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="addUserForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addUserForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="el">
            <el-input v-model="addUserForm.el"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改用户" :visible.sync="editDialogVisible">
      <span>
        <el-form
          :model="editForm"
          :rules="editRules"
          ref="editRuleForm"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="editForm.userName" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="el">
            <el-input v-model="editForm.el"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editUser">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      @close="setRoleClose"
    >
      <span>
        <el-form :model="setRoleForm" ref="setRuleForm" label-width="100px">
          <el-form-item label="当前的用户">
            <el-input
              v-model="setRoleForm.userName"
              style="width: 217px"
            ></el-input>
          </el-form-item>
          <el-form-item label="当前的角色"
            ><el-input
              v-model="setRoleForm.role"
              style="width: 217px"
            ></el-input
          ></el-form-item>
          <el-form-item label="分配新角色"
            ><el-select v-model="setRoleForm.newRole">
              <el-option
                v-for="item in roleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option> </el-select
          ></el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveRole">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^1[3-9]\d{9}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      userSearch: '',
      addDialogVisible: false,
      addUserForm: {
        userName: '',
        password: '',
        email: '',
        el: '',
      },
      addRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20个字符', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        el: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
      userlist: [
        {
          userName: 'admin',
          email: '1234345@qq.com',
          role: '管理员',
          el: '12324334545',
          create_time: 1486720211,
          mg_state: true,
        },
      ],
      editForm: {},
      editDialogVisible: false,
      editRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        el: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
      setRoleDialogVisible: false,
      setRoleForm: {
        userName: '',
        role: '',
        newRole: '',
      },
      roleOptions: [
        { value: 1, label: '采购员' },
        { value: 2, label: '技术员' },
        { value: 3, label: '管理员' },
        { value: 4, label: '销售员' },
      ],
      currentPage: 1,
    }
  },
  created() {},
  methods: {
    addUser() {
      this.$message.success('添加用户成功')
      console.log(this.addUserForm)
      this.addDialogVisible = false
    },
    addDialogClosed() {
      this.$refs.addRuleForm.resetFields()
    },
    showEditDialog(user) {
      this.editForm = user
      this.editDialogVisible = true
    },
    editUser() {
      this.$message.success('修改用户成功')
      this.editDialogVisible = false
    },
    async removeUser() {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => {
        return err
      })
      if (confirmResult === 'confirm') {
        this.$message.success('已删除用户')
      } else {
        this.$message.error('取消删除用户')
      }
    },
    setRole(user) {
      console.log(user)
      this.setRoleForm.userName = user.userName
      this.setRoleForm.role = user.role
      this.setRoleDialogVisible = true
    },
    saveRole() {
      this.$message.success('分配新角色成功')
      this.setRoleDialogVisible = false
    },
    setRoleClose() {
      this.setRoleForm.newRole = ''
    },
  },
}
</script>
<style lang="scss" scoped>
.tooltip {
  margin-left: 10px;
}
</style>