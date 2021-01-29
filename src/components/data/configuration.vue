<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据配置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="searchForm" label-width="80px" size="small">
        <el-row :gutter="10">
          <el-col :span="6"
            ><el-form-item label="表名称">
              <el-input v-model="searchForm.name"></el-input> </el-form-item
          ></el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" size="small"
              >搜索</el-button
            >
          </el-col>
        </el-row>
        <el-table :data="tableList">
          <el-table-column
            align="center"
            label="序号"
            type="index"
          ></el-table-column>
          <el-table-column
            align="center"
            label="表名称"
            prop="name"
          ></el-table-column>
          <el-table-column
            align="center"
            label="业务描述"
            prop="description"
          ></el-table-column>
          <el-table-column
            align="center"
            label="创建用户"
            prop="user"
          ></el-table-column>
          <el-table-column
            align="center"
            label="创建时间"
            prop="time"
          ></el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="{ row }">
              {{ row.status === 1 ? '正常' : '非正常' }}</template
            >
          </el-table-column>
          <el-table-column align="center" label="操作"
            ><template
              ><el-button
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
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      searchForm: { name: '' },
      tableList: [
        {
          name: 'sp_factory',
          description: '工厂主数据',
          user: 'admin',
          time: '2021-1-4',
          status: 0,
        },
        {
          name: 'op_factory',
          description: '第一批数据',
          user: 'admin',
          time: '2021-1-4',
          status: 0,
        },
        {
          name: 'sp2_factory',
          description: '第二批数据',
          user: 'admin',
          time: '2021-1-4',
          status: 1,
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