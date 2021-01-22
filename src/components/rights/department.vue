<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="departmentForm" label-width="80px" size="small">
        <el-row :gutter="20">
          <el-col :span="5"
            ><el-form-item label="部门名称"
              ><el-input v-model="departmentForm.name"></el-input></el-form-item
          ></el-col>
          <el-col :span="5"
            ><el-form-item label="部门编号"
              ><el-input v-model="departmentForm.name"></el-input></el-form-item
          ></el-col>
          <el-col :span="8">
            <el-button size="small" type="primary" icon="el-icon-search"
              >搜索</el-button
            >
            <el-button
              size="small"
              type="primary"
              icon="el-icon-circle-plus-outline"
              >添加</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="tableList"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column
          align="center"
          type="index"
          label="序号"
        ></el-table-column>
        <el-table-column
          align="center"
          label="部门名称"
          prop="name"
        ></el-table-column>
        <el-table-column
          align="center"
          label="部门编号"
          prop="num"
        ></el-table-column>
        <el-table-column
          align="center"
          label="所属公司"
          prop="company"
        ></el-table-column>
        <el-table-column
          align="center"
          label="联系电话"
          prop="tel"
        ></el-table-column>
        <el-table-column
          align="center"
          label="录入事件"
          prop="time"
        ></el-table-column>
        <el-table-column label="操作" align="center"
          ><template>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
            ></el-button
          ></template>
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
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      departmentForm: {
        name: '',
        num: '',
      },
      tableList: [
        {
          name: '项目管理部',
          num: '3',
          tel: '17866234',
          time: '2020-10-23',
          company: '北京京仪研究总院',
        },
        {
          name: '人力资源部',
          num: '3',
          tel: '17866234',
          time: '2020-10-23',
          company: '北京京仪研究总院',
        },
        {
          name: '综合管理部',
          num: '3',
          tel: '17866234',
          time: '2020-10-23',
          company: '北京京仪研究总院',
        },
        {
          name: '信息技术部',
          num: '3',
          tel: '17866234',
          time: '2020-10-23',
          company: '北京京仪研究总院',
        },
      ],
      currentPage: 1,
    }
  },
  created() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
</style>