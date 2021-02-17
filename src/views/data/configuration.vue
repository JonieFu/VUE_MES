<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据配置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="searchForm" label-width="60px" size="small">
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
      </el-form>
      <el-card>
        <el-row>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="addData"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="modifyData"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="danger" size="mini" @click="deleteData"
              >批量删除</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button
              type="primary"
              size="mini"
              style="margin-left: 24px"
              @click="exportData"
            >
              导出
            </el-button>
          </el-col>
        </el-row>
        <el-table
          border
          :data="tableList"
          @selection-change="handleSelectionChange"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        >
          <el-table-column align="center" type="selection"></el-table-column>
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
            ><template slot-scope="{ row, $index }"
              ><el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="edit(row)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="remove($index)"
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
    </el-card>
    <el-dialog
      title="添加基础数据"
      :visible.sync="addDataDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="form"
          :model="adddatalist"
          label-width="150px"
          size="small"
        >
          <el-form-item label="表名称"
            ><el-input style="width: 90%" v-model="adddatalist.name"></el-input>
          </el-form-item>
          <el-form-item label="业务描述"
            ><el-input
              style="width: 90%"
              v-model="adddatalist.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建用户"
            ><el-input style="width: 90%" v-model="adddatalist.user"></el-input>
          </el-form-item>
          <el-form-item label="创建时间"
            ><el-input style="width: 90%" v-model="adddatalist.time"></el-input>
          </el-form-item>
          <el-form-item label="状态"
            ><el-input
              style="width: 90%"
              v-model="adddatalist.status"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBomDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改基础数据"
      :visible.sync="editDataDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="form"
          :model="editdatalist"
          label-width="150px"
          size="small"
        >
          <el-form-item label="表名称"
            ><el-input
              style="width: 90%"
              v-model="editdatalist.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="业务描述"
            ><el-input
              style="width: 90%"
              v-model="editdatalist.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建用户"
            ><el-input
              style="width: 90%"
              v-model="editdatalist.user"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间"
            ><el-input
              style="width: 90%"
              v-model="editdatalist.time"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态"
            ><el-input
              style="width: 90%"
              v-model="editdatalist.status"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDataDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
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
      adddatalist: {
        name: '',
        description: '',
        user: '',
        time: '',
        status: '',
      },
      editdatalist: {
        name: '',
        description: '',
        user: '',
        time: '',
        status: '',
      },
      tableTitle: [
        { label: '表名称', prop: 'name' },
        { label: '业务描述', prop: 'description' },
        { label: '创建用户', prop: 'user' },
        { label: '创建时间', prop: `time` },
        { label: '状态', prop: 'status' },
      ],
      currentPage: 1,
      addDataDialogVisible: false,
      editDataDialogVisible: false,
      tableAmountData: [],
    }
  },
  created() {},
  methods: {
    handleSelectionChange(val) {
      this.tableAmountData = val
      console.log(this.tableAmountData)
    },
    addData() {
      this.addDataDialogVisible = true
    },
    modifyData() {
      if (this.tableAmountData.length === 0) {
        return
      } else {
        this.editdatalist = this.tableAmountData[0]
        console.log(this.editdatalist)
        this.editDataDialogVisible = true
      }
    },
    deleteData() {
      this.tableList = this.tableList.filter((item) => {
        return this.tableAmountData.indexOf(item) === -1
      })
    },
    edit(data) {
      console.log(data)
      this.editdatalist = data
      console.log(this.editdatalist)
      this.editDataDialogVisible = true
    },
    remove(index) {
      this.tableList.splice(index, 1)
    },
    exportData() {
      let allColumns = this.tableTitle
      var columnNames = []
      var columnValues = []
      for (var i = 0; i < allColumns.length; i++) {
        columnNames[i] = allColumns[i].label
        columnValues[i] = allColumns[i].prop
      }
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../vendor/Export2Excel.js')
        const tHeader = columnNames
        const filterVal = columnValues
        const list = this.tableList
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '基础数据配置')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },
    submit() {},
  },
}
</script>
<style lang="scss" scoped>
</style>