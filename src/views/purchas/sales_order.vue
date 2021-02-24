<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>业务模块</el-breadcrumb-item>
      <el-breadcrumb-item>子合同管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="salesForm" :model="salesForm" size="small">
        <el-row :gutter="10">
          <el-col :span="6"
            ><el-form-item
              label="采购方总部编码"
              label-width="110px"
              prop="cgfzbbm"
              ><el-input v-model="salesForm.cgfzbbm"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="子合同编号" label-width="90px" prop="zhtbh"
              ><el-input v-model="salesForm.zhtbh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="供应商编码" label-width="90px" prop="gysbm"
              ><el-input v-model="salesForm.gysbm"></el-input></el-form-item
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
            <el-button type="primary" size="mini" @click="addsales"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="modifySalesOrder"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="danger" size="mini" @click="deleteSalesOrder"
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
          :data="tableList"
          @selection-change="handleSelectionChange"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        >
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column
            align="center"
            prop="cgfzbbm"
            label="采购方总部编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="zhtbh"
            label="子合同编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="zhtmc"
            label="子合同名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gysbm"
            label="供应商编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cgfgsbm"
            label="采购方公司编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cgfgsmc"
            label="采购方公司名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cgfgssf"
            label="采购方公司省份"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="plbm"
            label="品类编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="zlbm"
            label="种类编码"
          ></el-table-column>
          <el-table-column align="center" prop="xsddzt" label="销售订单状态">
            <template slot-scope="{ row }">
              <el-tag v-if="row.xsddzt === 1">正常</el-tag>
              <el-tag type="info" v-else>结束</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="xsddhxmh"
            label="销售订单行项目号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cgddhxmid"
            label="采购订单行项目ID"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="wzbm"
            label="物资编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="wzmc"
            label="物资名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="wzdw"
            label="物资单位"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="wzsl"
            label="物资数量"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sjyyf"
            label="数据拥有方"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sjkjf"
            label="数据可见方"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sjly"
            label="数据来源"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="lysjcjsj"
            label="来源数据创建时间"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="150px">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                style="width: 50px; padding: 7px 0"
                @click="edit(row, $index)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                style="width: 50px; padding: 7px 0"
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
      title="添加子合同"
      :visible.sync="addSalesDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="form"
          :model="addsaleslist"
          label-width="150px"
          size="small"
        >
          <el-form-item label="采购方总部编码" prop="cgfzbbm"
            ><el-input
              v-model="addsaleslist.cgfzbbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="子合同编号" prop="zhtbh"
            ><el-input
              v-model="addsaleslist.zhtbh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="子合同名称" prop="zhtmc"
            ><el-input
              v-model="addsaleslist.zhtmc"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="供应航编码" prop="gysbm"
            ><el-input
              v-model="addsaleslist.gysbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="采购方公司编码" prop="cgfgsbm"
            ><el-input
              v-model="addsaleslist.cgfgsbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="采购方公司名称" prop="cgfgsmc"
            ><el-input
              v-model="addsaleslist.cgfgsmc"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="采购方公司省份" prop="cgfgssf"
            ><el-input
              v-model="addsaleslist.cgfgssf"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="品类编码" prop="plbm"
            ><el-input
              v-model="addsaleslist.plbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="种类编码" prop="zlbm"
            ><el-input
              v-model="addsaleslist.zlbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售订单状态" prop="xsddzt"
            ><el-input
              v-model="addsaleslist.xsddzt"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售订单行项目号" prop="xsddhxmh"
            ><el-input
              v-model="addsaleslist.xsddhxmh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="采购订单行项目ID" prop="cgddhxmid"
            ><el-input
              v-model="addsaleslist.cgddhxmid"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="物资编码" prop="wzbm"
            ><el-input
              v-model="addsaleslist.wzbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="物资名称" prop="wzmc"
            ><el-input
              v-model="addsaleslist.wzmc"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="物资单位" prop="wzdw"
            ><el-input
              v-model="addsaleslist.wzdw"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="物资数量" prop="wzsl"
            ><el-input
              v-model="addsaleslist.wzsl"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据拥有方" prop="sjyyf"
            ><el-input
              v-model="addsaleslist.sjyyf"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据可见方" prop="sjkjf"
            ><el-input
              v-model="addsaleslist.sjkjf"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据来源" prop="sjly"
            ><el-input
              v-model="addsaleslist.sjly"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="来源数据创建时间" prop="lysjcjsj"
            ><el-input
              v-model="addsaleslist.lysjcjsj"
              style="width: 90%"
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
      title="修改子合同"
      :visible.sync="editSalesDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="form"
          :model="editsaleslist"
          label-width="150px"
          size="small"
        >
          <el-form-item label="采购方总部编码" prop="cgfzbbm"
            ><el-input
              v-model="editsaleslist.cgfzbbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="子合同编号" prop="zhtbh"
            ><el-input
              v-model="editsaleslist.zhtbh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="子合同名称" prop="zhtmc"
            ><el-input
              v-model="editsaleslist.zhtmc"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="供应航编码" prop="gysbm"
            ><el-input
              v-model="editsaleslist.gysbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="采购方公司编码" prop="cgfgsbm"
            ><el-input
              v-model="editsaleslist.cgfgsbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="采购方公司名称" prop="cgfgsmc"
            ><el-input
              v-model="editsaleslist.cgfgsmc"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="采购方公司省份" prop="cgfgssf"
            ><el-input
              v-model="editsaleslist.cgfgssf"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="品类编码" prop="plbm"
            ><el-input
              v-model="editsaleslist.plbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="种类编码" prop="zlbm"
            ><el-input
              v-model="editsaleslist.zlbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售订单状态" prop="xsddzt"
            ><el-input
              v-model="editsaleslist.xsddzt"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售订单行项目号" prop="xsddhxmh"
            ><el-input
              v-model="editsaleslist.xsddhxmh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="采购订单行项目ID" prop="cgddhxmid"
            ><el-input
              v-model="editsaleslist.cgddhxmid"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="物资编码" prop="wzbm"
            ><el-input
              v-model="editsaleslist.wzbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="物资名称" prop="wzmc"
            ><el-input
              v-model="editsaleslist.wzmc"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="物资单位" prop="wzdw"
            ><el-input
              v-model="editsaleslist.wzdw"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="物资数量" prop="wzsl"
            ><el-input
              v-model="editsaleslist.wzsl"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据拥有方" prop="sjyyf"
            ><el-input
              v-model="editsaleslist.sjyyf"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据可见方" prop="sjkjf"
            ><el-input
              v-model="editsaleslist.sjkjf"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据来源" prop="sjly"
            ><el-input
              v-model="editsaleslist.sjly"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="来源数据创建时间" prop="lysjcjsj"
            ><el-input
              v-model="editsaleslist.lysjcjsj"
              style="width: 90%"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBomDialogVisible = false">取 消</el-button>
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
      salesForm: {
        cgfzbbm: '',
        zhtbh: '',
        gysbm: '',
      },
      tableList: [
        {
          cgfzbbm: '1',
          zhtbh: '2323232343',
          zhtmc: '34567',
          gysbm: '1234',
          cgfgsbm: 'djfa',
          cgfgsmc: 'dsfd',
          cgfgssf: '北京',
          plbm: 'asg',
          zlbm: 'sd',
          xsddzt: 1,
          xsddhxmh: '元',
          cgddhxmid: '10000',
          wzbm: 'sdgafg',
          wzmc: '2020-1-2',
          wzdw: '2002-1-20',
          wzsl: 'adsj',
          sjyyf: '123456789',
          sjkjf: 'dsjadkj',
          sjly: 'skajlgj;sd',
          lysjcjsj: 'jsajld',
        },
      ],
      addsaleslist: {
        cgfzbbm: '',
        zhtbh: '',
        zhtmc: '',
        gysbm: '',
        cgfgsbm: '',
        cgfgsmc: '',
        cgfgssf: '',
        plbm: '',
        zlbm: '',
        xsddzt: '',
        xsddhxmh: '',
        cgddhxmid: '',
        wzbm: '',
        wzmc: '',
        wzdw: '',
        wzsl: '',
        sjyyf: '',
        sjkjf: '',
        sjly: '',
        lysjcjsj: '',
      },
      currentPage: 1,
      editsaleslist: {
        cgfzbbm: '',
        zhtbh: '',
        zhtmc: '',
        gysbm: '',
        cgfgsbm: '',
        cgfgsmc: '',
        cgfgssf: '',
        plbm: '',
        zlbm: '',
        xsddzt: '',
        xsddhxmh: '',
        cgddhxmid: '',
        wzbm: '',
        wzmc: '',
        wzdw: '',
        wzsl: '',
        sjyyf: '',
        sjkjf: '',
        sjly: '',
        lysjcjsj: '',
      },
      tableTitle: [
        { label: '采购方总部编码', prop: 'cgfzbbm' },
        { label: '子合同编号', prop: 'zhtbh' },
        { label: '子合同名称', prop: 'zhtmc' },
        { label: '供应商编码', prop: 'gysbm' },
        { label: '采购方公司编码', prop: 'cgfgsbm' },
        { label: '采购方公司名称', prop: 'cgfgsmc' },
        { label: '采购方公司省份', prop: 'cgfgssf' },
        { label: '品类编码', prop: 'plbm' },
        { label: '种类编码', prop: 'zlbm' },
        { label: '销售订单状态', prop: 'xsddzt' },
        { label: '销售订单行项目号', prop: 'xsddhxmh' },
        { label: '采购订单行项目ID', prop: 'cgddhxmid' },
        { label: '物资编码', prop: 'wzbm' },
        { label: '物资名称', prop: 'wzmc' },
        { label: '物资单位', prop: 'wzdw' },
        { label: '物资数量', prop: 'wzsl' },
        { label: '数据拥有方', prop: 'sjyyf' },
        { label: '数据可见方', prop: 'sjkjf' },
        { label: '数据来源', prop: 'sjly' },
        { label: '来源数据创建时间', prop: 'lysjcjsj' },
      ],
      addSalesDialogVisible: false,
      editSalesDialogVisible: false,
      tableAmountData: [],
    }
  },
  created() {},
  methods: {
    modifySalesOrder() {
      if (this.tableAmountData.length === 0) {
        return
      } else {
        this.editsaleslist = this.tableAmountData[0]
        this.editSalesDialogVisible = true
      }
    },
    deleteSalesOrder() {
      this.tableList = this.tableList.filter((item) => {
        return this.tableAmountData.indexOf(item) === -1
      })
    },
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
          export_json_to_excel(tHeader, data, '子合同')
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },
    addsales() {
      this.addSalesDialogVisible = true
    },
    handleSelectionChange(val) {
      this.tableAmountData = val
      console.log(this.tableAmountData)
    },
    edit(data) {
      this.editsaleslist = data
      this.editSalesDialogVisible = true
    },
    delet(index) {
      this.tableList.splice(index, 1)
    },
    submit() {
      this.addSalesDialogVisible = false
    },

    search() {},
    reset() {
      this.$refs.purchasForm.resetFields()
    },
  },
}
</script>
<style lang="scss" scoped>
.export {
  text-decoration: none;
  color: white;
}
.el-dialog-div {
  height: 500px;
  overflow: auto;
}
</style>