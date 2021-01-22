<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>公司管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="companyForm" label-width="80px" size="small">
        <el-row :gutter="10">
          <el-col :span="5"
            ><el-form-item label="公司名称"
              ><el-input v-model="companyForm.name"></el-input
            ></el-form-item>
          </el-col>
          <el-col :span="5"
            ><el-form-item label="公司编号"
              ><el-input v-model="companyForm.num"></el-input
            ></el-form-item>
          </el-col>
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
      <el-table :data="tableList">
        <el-table-column
          align="center"
          label="序号"
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          label="公司名称"
          prop="name"
        ></el-table-column>
        <el-table-column
          align="center"
          label="公司编号"
          prop="num"
        ></el-table-column>
        <el-table-column
          align="center"
          label="联系电话"
          prop="tel"
        ></el-table-column>
        <el-table-column
          align="center"
          label="公司地址"
          prop="address"
        ></el-table-column>
        <el-table-column
          align="center"
          label="录入时间"
          prop="time"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
            ></el-button></template
        ></el-table-column>
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
      companyForm: { name: '', num: '' },
      tableList: [
        {
          name: '北京京仪研究总院',
          num: '4',
          address: '北京市大兴区兴业街2号',
          tel: 1563565362,
          time: '2020-10-25',
        },
        {
          name: '北京京仪研究总院',
          num: '4',
          address: '北京市大兴区兴业街2号',
          tel: 1563565362,
          time: '2020-10-25',
        },
        {
          name: '北京京仪研究总院',
          num: '4',
          address: '北京市大兴区兴业街2号',
          tel: 1563565362,
          time: '2020-10-25',
        },
        {
          name: '北京京仪研究总院',
          num: '4',
          address: '北京市大兴区兴业街2号',
          tel: 1563565362,
          time: '2020-10-32',
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