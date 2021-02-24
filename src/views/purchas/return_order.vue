<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>业务模块</el-breadcrumb-item>
      <el-breadcrumb-item>退货单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="purchasForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="采购单号" label-width="70px" prop="purchasNum"
              ><el-input
                v-model="SearchForm.purchasNum"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="采购单名称"
              label-width="90px"
              prop="purchasName"
              ><el-input
                v-model="SearchForm.purchasName"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="BOM编号" label-width="80px" prop="BOMName"
              ><el-input v-model="SearchForm.BOMName"></el-input></el-form-item
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
            <el-button type="primary" size="mini" @click="addReturnOrder"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="modifyReturnOrder"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="danger" size="mini" @click="deleteReturnOrder"
              >批量删除</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button
              type="primary"
              size="mini"
              @click="exportData"
              style="margin-left: 24px"
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
            prop="cgdh"
            label="采购单号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cgdmc"
            label="采购单名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="bombh"
            label="BOM编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="wlmc"
            label="BOM物料名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ggxh"
            label="BOM规格型号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sh"
            label="BOM色号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cz"
            label="BOM材质"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ggdw"
            label="BOM规格单位"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="scyl"
            label="BOM生产用量"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jjdw"
            label="BOM计价单位"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="xcgsl"
            label="需采购数量"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ghdw"
            label="供货单位"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ghrq"
            label="供货日期"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jhrq"
            label="交货日期"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ghlxr"
            label="供货商联系人"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ghslxdh"
            label="供货商联系电话"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="shdz"
            label="收货地址"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="xsddh"
            label="销售订单号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="xsddmc"
            label="销售订单名称"
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
            prop="gxsj"
            label="更新时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="bz"
            label="备注"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="150px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                style="width: 50px; padding: 7px 0"
                @click="edit(row)"
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
      title="添加采购单"
      :visible.sync="addReturnOrderVisibleDialog"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="form"
          :model="addReturnOrderList"
          label-width="150px"
          size="small"
        >
          <el-form-item label="采购单号" prop="cgdh"
            ><el-input
              v-model="addReturnOrderList.cgdh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="采购单名称" prop="cgdmc"
            ><el-input
              v-model="addReturnOrderList.cgdmc"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM编号" prop="bombh"
            ><el-input
              v-model="addReturnOrderList.bombh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM物料名称" prop="wlmc"
            ><el-input
              v-model="addReturnOrderList.wlmc"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM规格型号" prop="ggxh"
            ><el-input
              v-model="addReturnOrderList.ggxh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM色号" prop="sh"
            ><el-input
              v-model="addReturnOrderList.sh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM材质" prop="cz"
            ><el-input
              v-model="addReturnOrderList.cz"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM规格单位" prop="ggdw"
            ><el-input
              v-model="addReturnOrderList.ggdw"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM生产用量" prop="scyl"
            ><el-input
              v-model="addReturnOrderList.scyl"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM计价单位" prop="jjdw"
            ><el-input
              v-model="addReturnOrderList.jjdw"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="需采购数量" prop="xcgsl"
            ><el-input
              v-model="addReturnOrderList.xcgsl"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="供货单位" prop="ghdw"
            ><el-input
              v-model="addReturnOrderList.ghdw"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="供货日期" prop="ghrq"
            ><el-input
              v-model="addReturnOrderList.ghrq"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="交货日期" prop="jhrq"
            ><el-input
              v-model="addReturnOrderList.jhrq"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="供应商联系人" prop="ghlxr"
            ><el-input
              v-model="addReturnOrderList.ghlxr"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="供应商联系电话" prop="ghslxdh"
            ><el-input
              v-model="addReturnOrderList.ghslxdh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="shdz"
            ><el-input
              v-model="addReturnOrderList.shdz"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售订单号" prop="xsddh"
            ><el-input
              v-model="addReturnOrderList.xsddh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售订单名称" prop="xsddmc"
            ><el-input
              v-model="addReturnOrderList.xsddmc"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="cjsj"
            ><el-input
              v-model="addReturnOrderList.cjsj"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建人" prop="cjr"
            ><el-input
              v-model="addReturnOrderList.cjr"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="更新时间" prop="gxsj"
            ><el-input
              v-model="addReturnOrderList.gxsj"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="bz"
            ><el-input
              v-model="addReturnOrderList.bz"
              style="width: 90%"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addReturnOrderVisibleDialog = false"
          >取 消</el-button
        >
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改采购单"
      :visible.sync="editReturnOrderVisibleDialog"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="form"
          :model="editReturnOrderList"
          label-width="150px"
          size="small"
        >
          <el-form-item label="采购单号" prop="cgdh"
            ><el-input
              v-model="editReturnOrderList.cgdh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="采购单名称" prop="cgdmc"
            ><el-input
              v-model="editReturnOrderList.cgdmc"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM编号" prop="bombh"
            ><el-input
              v-model="editReturnOrderList.bombh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM物料名称" prop="wlmc"
            ><el-input
              v-model="editReturnOrderList.wlmc"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM规格型号" prop="ggxh"
            ><el-input
              v-model="editReturnOrderList.ggxh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM色号" prop="sh"
            ><el-input
              v-model="editReturnOrderList.sh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM材质" prop="cz"
            ><el-input
              v-model="editReturnOrderList.cz"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM规格单位" prop="ggdw"
            ><el-input
              v-model="editReturnOrderList.ggdw"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM生产用量" prop="scyl"
            ><el-input
              v-model="editReturnOrderList.scyl"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM计价单位" prop="jjdw"
            ><el-input
              v-model="editReturnOrderList.jjdw"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="需采购数量" prop="xcgsl"
            ><el-input
              v-model="editReturnOrderList.xcgsl"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="供货单位" prop="ghdw"
            ><el-input
              v-model="editReturnOrderList.ghdw"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="供货日期" prop="ghrq"
            ><el-input
              v-model="editReturnOrderList.ghrq"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="交货日期" prop="jhrq"
            ><el-input
              v-model="editReturnOrderList.jhrq"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="供应商联系人" prop="ghlxr"
            ><el-input
              v-model="editReturnOrderList.ghlxr"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="供应商联系电话" prop="ghslxdh"
            ><el-input
              v-model="editReturnOrderList.ghslxdh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="shdz"
            ><el-input
              v-model="editReturnOrderList.shdz"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售订单号" prop="xsddh"
            ><el-input
              v-model="editReturnOrderList.xsddh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售订单名称" prop="xsddmc"
            ><el-input
              v-model="editReturnOrderList.xsddmc"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="cjsj"
            ><el-input
              v-model="editReturnOrderList.cjsj"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建人" prop="cjr"
            ><el-input
              v-model="editReturnOrderList.cjr"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="更新时间" prop="gxsj"
            ><el-input
              v-model="editReturnOrderList.gxsj"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="bz"
            ><el-input
              v-model="editReturnOrderList.bz"
              style="width: 90%"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editReturnOrderVisibleDialog = false"
          >取 消</el-button
        >
        <el-button type="primary">确 定</el-button>
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
        purchasNum: '',
        purchasName: '',
        BOMName: '',
      },
      tableList: [
        {
          cgdh: '1',
          cgdmc: '电气表',
          bombh: '34567',
          wlmc: '螺丝',
          ggxh: '25*25',
          sh: '银色',
          cz: '不锈钢',
          ggdw: 'mm',
          scyl: '100',
          jjdw: '元',
          xcgsl: '10000',
          ghdw: 'sdgafg',
          ghrq: '2020-1-2',
          jhrq: '2002-1-20',
          ghlxr: 'adsj',
          ghslxdh: '123456789',
          shdz: 'dsjadkj',
          xsddh: 'skajlgj;sd',
          xsddmc: 'jsajld',
          cjsj: 'asfg',
          cjr: 'dgf',
          gxsj: 'asd',
          bz: 'sfd',
        },
      ],
      currentPage: 1,
      addReturnOrderVisibleDialog: false,
      editReturnOrderVisibleDialog: false,
      addReturnOrderList: {
        cgdh: '',
        cgdmc: '',
        bombh: '',
        wlmc: '',
        ggxh: '',
        sh: '',
        cz: '',
        ggdw: '',
        scyl: '',
        jjdw: '',
        xcgsl: '',
        ghdw: '',
        ghrq: '',
        jhrq: '',
        ghlxr: '',
        ghslxdh: '',
        shdz: '',
        xsddh: '',
        xsddmc: '',
        cjsj: '',
        cjr: '',
        gxsj: '',
        bz: '',
      },
      editReturnOrderList: {
        cgdh: '',
        cgdmc: '',
        bombh: '',
        wlmc: '',
        ggxh: '',
        sh: '',
        cz: '',
        ggdw: '',
        scyl: '',
        jjdw: '',
        xcgsl: '',
        ghdw: '',
        ghrq: '',
        jhrq: '',
        ghlxr: '',
        ghslxdh: '',
        shdz: '',
        xsddh: '',
        xsddmc: '',
        cjsj: '',
        cjr: '',
        gxsj: '',
        bz: '',
      },
      tableAmountData: [],
      tableTitle: [
        { label: '采购单号', prop: 'cgdh' },
        { label: '采购单名称', prop: 'cgdmc' },
        { label: 'BOM编号', prop: 'bombh' },
        { label: 'BOM物料名称', prop: 'wlmc' },
        { label: 'BOM规格型号', prop: 'ggxh' },
        { label: 'BOM色号', prop: 'sh' },
        { label: 'BOM材质', prop: 'cz' },
        { label: 'BOM规格单位', prop: 'ggdw' },
        { label: 'BOM生产用量', prop: 'scyl' },
        { label: 'BOM计价单位', prop: 'jjdw' },
        { label: '需采购数量', prop: 'xcgsl' },
        { label: '供货单位', prop: 'ghdw' },
        { label: '供货日期', prop: 'ghrq' },
        { label: '交货日期', prop: 'jhrq' },
        { label: '供货商联系人', prop: 'ghlxr' },
        { label: '供货商联系电话', prop: 'ghslxdh' },
        { label: '收货地址', prop: 'shdz' },
        { label: '销售订单号', prop: 'xsddh' },
        { label: '销售订单名称', prop: 'xsddmc' },
        { label: '创建时间', prop: 'cjsj' },
        { label: '创建人', prop: 'cjr' },
        { label: '备注', prop: 'bz' },
      ],
    }
  },
  created() {},
  methods: {
    handleSelectionChange(val) {
      this.tableAmountData = val
    },
    addReturnOrder() {
      this.addReturnOrderVisibleDialog = true
    },
    modifyReturnOrder() {
      if (this.tableAmountData.length === 0) {
        return
      } else {
        this.editReturnOrderList = this.tableAmountData[0]
        this.editReturnOrderVisibleDialog = true
      }
    },
    deleteReturnOrder() {
      this.tableList = this.tableList.filter((item) => {
        return this.tableAmountData.indexOf(item) === -1
      })
    },
    edit(row) {
      this.editReturnOrderList = row
      this.editReturnOrderVisibleDialog = true
    },
    delet(index) {
      this.tableList.splice(index, 1)
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
          export_json_to_excel(tHeader, data, '退货单')
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
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
</style>