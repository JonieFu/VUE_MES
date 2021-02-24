<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>工艺路线</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="searcDicthRef" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="字典名称" label-width="70px" prop="dictName"
              ><el-input v-model="SearchForm.dictName"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="字典类型" label-width="70px" prop="dictType"
              ><el-input v-model="SearchForm.dictType"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="字典状态" label-width="70px" prop="dictStatus"
              ><el-input
                v-model="SearchForm.dictStatus"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="5"
            ><el-form-item label="创建时间" label-width="70px" prop="dictTime">
              <el-date-picker
                style="width: 240px"
                v-model="SearchForm.dictTime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker> </el-form-item
          ></el-col>
          <el-col :span="3">
            <el-button type="primary" size="small" @click="search"
              >搜索</el-button
            >

            <el-button type="warning" size="small" @click="reset"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-card>
        <el-row>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="addProcess"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="modifyProcess"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="danger" size="mini" @click="deleteProcess"
              >批量删除</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button
              type="primary"
              size="mini"
              style="margin-left: 25px"
              @click="exportData"
            >
              <a class="export">导出</a>
            </el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableList"
          border
          @selection-change="handleSelectionChange"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        >
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column
            align="center"
            prop="process_code"
            label="流程代号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="xtms"
            label="线体描述"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="lchz"
            label="流程绘制"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cjsj"
            label="创建时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cjr"
            label="创建人"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="zhcjsj"
            label="最后更新时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="zhgxr"
            label="最后更新人"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="200px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="edit(row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="delet($index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1"
        >
        </el-pagination>
      </el-card>
    </el-card>
    <el-dialog
      title="添加工艺路线管理"
      :visible.sync="processDialogVisible"
      width="50%"
      append-to-body
    >
      <el-form
        :model="addProcessList"
        label-width="90px"
        ref="addprocess"
        style="width: 80%; margin: auto"
      >
        <el-form-item label="流程代号" prop="process_code"
          ><el-input
            v-model="addProcessList.process_code"
            placeholder=""
          ></el-input
        ></el-form-item>
        <el-form-item label="线体描述" prop="descript"
          ><el-input v-model="addProcessList.descript" placeholder=""></el-input
        ></el-form-item>
        <el-form-item label="流程绘制" prop="draws"
          ><el-input
            v-model="addProcessList.draws"
            placeholder=""
            clearable
            @clear="clear"
          >
          </el-input>
          <el-checkbox-group v-model="checkList" @change="checkboxChange">
            <el-checkbox label="装配工序"></el-checkbox>
            <el-checkbox label="测试工序"></el-checkbox>
            <el-checkbox label="包装工序"></el-checkbox>
            <el-checkbox label="集成测试工序"></el-checkbox>
            <el-checkbox label="焊接"></el-checkbox>
            <el-checkbox label="封胶工序"></el-checkbox>
            <el-checkbox label="加酸工序"></el-checkbox>
            <el-checkbox label="清洗工序"></el-checkbox>
            <el-checkbox label="入库工序"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="创建人" prop="user"
          ><el-input v-model="addProcessList.user" placeholder=""></el-input
        ></el-form-item>
        <el-form-item label="最后更新人" label-width="90px" prop="newUser"
          ><el-input v-model="addProcessList.newUser" placeholder=""></el-input
        ></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="processDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="processDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="修改工艺路线管理"
      :visible.sync="editprocessDialogVisible"
      width="50%"
      append-to-body
    >
      <el-form
        :model="editProcessList"
        label-width="90px"
        style="width: 80%; margin: auto"
      >
        <el-form-item label="流程代号" prop="process_code"
          ><el-input
            v-model="editProcessList.process_code"
            placeholder=""
          ></el-input
        ></el-form-item>
        <el-form-item label="线体描述" prop="xtms"
          ><el-input v-model="editProcessList.xtms" placeholder=""></el-input
        ></el-form-item>
        <el-form-item label="流程绘制" prop="lchz"
          ><el-input
            class="haha"
            v-model="editProcessList.lchz"
            placeholder=""
            disabled
            @clear="clear"
          >
          </el-input>
          <el-checkbox-group v-model="checkList" @change="checkboxChange">
            <el-checkbox label="装配工序"></el-checkbox>
            <el-checkbox label="测试工序"></el-checkbox>
            <el-checkbox label="包装工序"></el-checkbox>
            <el-checkbox label="集成测试工序"></el-checkbox>
            <el-checkbox label="焊接"></el-checkbox>
            <el-checkbox label="封胶工序"></el-checkbox>
            <el-checkbox label="加酸工序"></el-checkbox>
            <el-checkbox label="清洗工序"></el-checkbox>
            <el-checkbox label="入库工序"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="创建人" prop="cjr"
          ><el-input v-model="editProcessList.cjr" placeholder=""></el-input
        ></el-form-item>
        <el-form-item label="创建时间" prop="cjsj"
          ><el-input v-model="editProcessList.cjsj" placeholder=""></el-input
        ></el-form-item>
        <el-form-item label="最后更新人" label-width="90px" prop="zhgxr"
          ><el-input v-model="editProcessList.zhgxr" placeholder=""></el-input
        ></el-form-item>
        <el-form-item label="最后更新时间" label-width="90px" prop="zhcjsj"
          ><el-input v-model="editProcessList.zhcjsj" placeholder=""></el-input
        ></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="processDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="processDialogVisible = false"
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
      SearchForm: {
        dictName: '',
        dictType: '',
        dictStatus: '',
        dictTime: [],
      },
      tableList: [
        {
          process_code: '1',
          xtms: '测试流程',
          lchz: '装配工序→测试工序→集成测试工序→焊接',
          cjsj: '2020-12-9',
          cjr: 'admin',
          zhcjsj: '2020-12-23',
          zhgxr: 'admin',
        },
      ],
      tableTitle: [
        { label: '流程代号', prop: 'process_code' },
        { label: '线体描述', prop: 'xtms' },
        { label: '流程绘制', prop: 'lchz' },
        { label: '创建时间', prop: 'cjsj' },
        { label: '创建人', prop: 'cjr' },
        { label: '最后更新时间', prop: 'zhcjsj' },
        { label: '最后更新人', prop: 'zhgxr' },
      ],
      editProcessList: {
        process_code: '',
        xtms: '',
        lchz: '',
        cjsj: '',
        cjr: '',
        zhcjsj: '',
        zhgxr: '',
      },
      currentPage: 1,
      processDialogVisible: false,
      editprocessDialogVisible: false,
      addProcessList: {
        process_code: '',
        descript: '',
        draws: '',
        user: '',
        newUser: '',
      },
      checkList: [],
      tableAmountData: [],
    }
  },
  created() {},
  methods: {
    exportData() {
      if (this.tableAmountData.length === 0) {
        this.$message({
          message: '请选择要导出数据',
          type: 'warning',
        })
        return
      } else {
        let allColumns = this.tableTitle
        var columnNames = []
        var columnValues = []
        for (var i = 0; i < allColumns.length; i++) {
          columnNames[i] = allColumns[i].label
          columnValues[i] = allColumns[i].prop
        }
        require.ensure([], () => {
          const {
            export_json_to_excel,
          } = require('../../vendor/Export2Excel.js')
          const tHeader = columnNames
          const filterVal = columnValues
          const list = this.tableAmountData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '工艺路线')
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },
    clear() {
      console.log('清空')
      this.checkList = []
    },
    addProcess() {
      this.processDialogVisible = true
    },
    handleSelectionChange(val) {
      this.tableAmountData = val
      console.log(this.tableAmountData)
    },
    modifyProcess() {
      if (this.tableAmountData.length === 0) {
        return
      } else {
        this.editProcessList = this.tableAmountData[0]
        this.editprocessDialogVisible = true
        this.checkList = this.editProcessList.lchz.split('→')
      }
    },
    edit(row) {
      this.editProcessList = row
      this.checkList = this.editProcessList.lchz.split('→')
      this.editprocessDialogVisible = true
    },
    deleteProcess() {
      this.tableList = this.tableList.filter((item) => {
        return this.tableAmountData.indexOf(item) === -1
      })
    },
    delet(index) {
      this.tableList.splice(index, 1)
    },

    reset() {
      this.$refs.searcDicthRef.resetFields()
    },
    search() {
      console.log('搜索')
    },
    checkboxChange() {
      let str = ''
      if (this.checkList.length === 0) {
        if (this.processDialogVisible === true) {
          this.addProcessList.draws = ''
          return
        } else {
          this.editProcessList.lchz = ''
          return
        }
      }
      this.checkList.forEach((item, index) => {
        if (index === this.checkList.length - 1) {
          str = str + item
          if (this.processDialogVisible === true) {
            this.addProcessList.draws = str
            return
          } else {
            this.editProcessList.lchz = str
            return
          }
        }
        item = item + '→'
        str = str + item
      })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>