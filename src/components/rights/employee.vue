<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form label-width="80px" size="small">
        <el-row :gutter="30">
          <el-col :span="5"
            ><el-form-item label="员工姓名"
              ><el-input placeholder=""></el-input></el-form-item
          ></el-col>
          <el-col :span="5"
            ><el-form-item label="员工账号"
              ><el-input placeholder=""></el-input></el-form-item
          ></el-col>
          <el-col :span="10">
            <el-button icon="el-icon-search" type="primary" size="small"
              >搜索</el-button
            >
            <el-button
              icon="el-icon-circle-plus-outline"
              type="primary"
              size="small"
              @click="addEmployee"
              >添加</el-button
            >
            <el-button type="primary" size="small"
              >上传<i class="el-icon-upload el-icon--right"></i
            ></el-button>
          </el-col> </el-row
      ></el-form>
      <el-table
        :data="tableData"
        border
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column type="selection" align="center"> </el-table-column>
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50px"
        ></el-table-column>
        <el-table-column
          align="center"
          v-for="(value, key, index) in employeeInfo"
          :label="value"
          :prop="key"
          :key="index"
        >
        </el-table-column>
        <el-table-column align="center" label="状态" prop="status">
          <template slot-scope="{ row }">
            <el-tag :type="row.status === 1 ? '' : 'info'">{{
              row.status === 1 ? '在职' : '离职'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="140px">
          <template slot-scope="{ row }">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="edit(row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
            ></el-button>
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
      title="添加员工"
      :visible.sync="addEmployeeDialogVisible"
      width="50%"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addForm"
        label-width="100px"
      >
        <el-form-item
          :label="value"
          :prop="key"
          v-for="(value, key, index) in employeeInfo"
          :key="index"
        >
          <el-input v-model="addForm[key]"></el-input>
        </el-form-item>
      </el-form>

      <el-form-item label="状态" prop="status">
        <el-input></el-input>
      </el-form-item>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      employeeInfo: {
        name: '姓名',
        num: '账号',
        title: '岗位',
        department: '所属部门',
        tel: '电话',
        email: '邮箱',
        address: '住址',
        time: '入职时间',
      },
      tableData: [
        {
          name: '王小虎',
          num: '4232423524',
          title: '职工',
          department: '项目管理',
          tel: '17866234',
          email: 'wangxiaohu@gmail.com',
          status: 0,
          address: '上海市普陀区金沙江路 1518 弄',
          time: '2020-10-23',
        },
        {
          name: '李四',
          num: '52343',
          title: '职工',
          department: '项目管理',
          tel: '17866234',
          email: 'wangxiaohu@gmail.com',
          status: 1,
          address: '大连金普新区区金沙江路 1518 弄',
          time: '2020-10-28',
        },
      ],
      addForm: {
        name: 'fuyu',
        num: '1',
        title: '2',
        department: '3',
        tel: '4',
        time: '',
        status: '',
        email: '',
        address: '',
      },
      addFormRules: {},
      addEmployeeDialogVisible: false,
      currentPage: 1,
    }
  },
  created() {},
  methods: {
    addEmployee() {
      this.addEmployeeDialogVisible = true
    },
  },
}
</script>
<style lang="scss" scoped>
</style>