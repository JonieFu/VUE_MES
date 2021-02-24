<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>BOM清单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="searchRef" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item
              label="销售订单编号"
              label-width="100px"
              prop="orderNum"
              ><el-input v-model="SearchForm.orderNum"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="销售订单名称"
              label-width="100px"
              prop="orderName"
              ><el-input
                v-model="SearchForm.orderName"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="物料名称" label-width="70px" prop="itemName"
              ><el-input v-model="SearchForm.itemName"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="规格型号" label-width="70px" prop="ggxh"
              ><el-input v-model="SearchForm.ggxh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="材质" label-width="40px" prop="material"
              ><el-input v-model="SearchForm.material"></el-input></el-form-item
          ></el-col>
          <el-col :span="3">
            <el-button type="primary" size="small">搜索</el-button>
            <el-button type="warning" size="small" @click="reset"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-card>
        <el-row :gutter="30">
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="addBOM"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="modifyBOM"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="danger" size="mini" @click="deleteBOM"
              >批量删除</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button
              style="margin-left: 24px"
              type="primary"
              size="mini"
              @click="exportData"
            >
              导出
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
            prop="bomnum"
            label="BOM编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="xsnum"
            label="销售订单编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="xsname"
            label="销售订单名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="wl"
            label="物料名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gg"
            label="规格型号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cz"
            label="材质"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sh"
            label="色号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ggdw"
            label="规格单位"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="scyl"
            label="生产用量"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jjdw"
            label="计价单位"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="200px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="edit(row, $index)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="remove($index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="aa">总共{{ tableList.length }}条记录</div>
      </el-card>
      <el-dialog
        title="添加BOM清单"
        :visible.sync="addBomDialogVisible"
        width="50%"
      >
        <div class="el-dialog-div">
          <el-form ref="form" :model="addForm" label-width="100px">
            <el-form-item label="BOM编号" prop="bomnum"
              ><el-input v-model="addForm.bomnum" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="销售订单编号" prop="xsnum"
              ><el-input v-model="addForm.xsnum" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="销售订单名称" prop="xsname"
              ><el-input v-model="addForm.xsname" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="物料名称" prop="wl"
              ><el-input v-model="addForm.wl" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="规格型号" prop="gg"
              ><el-input v-model="addForm.gg" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="材质" prop="cz"
              ><el-input v-model="addForm.cz" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="色号" prop="sh"
              ><el-input v-model="addForm.sh" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="规格单位" prop="ggdw"
              ><el-input v-model="addForm.ggdw" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="生产用量" prop="scyl"
              ><el-input v-model="addForm.scyl" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="计价单位" prop="jjdw"
              ><el-input v-model="addForm.jjdw" placeholder=""></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addBomDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑BOM清单"
        :visible.sync="editBomDialogVisible"
        width="50%"
      >
        <div class="el-dialog-div">
          <el-form ref="form" :model="editForm" label-width="100px">
            <el-form-item label="BOM编号" prop="bomnum"
              ><el-input v-model="editForm.bomnum" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="销售订单编号" prop="xsnum"
              ><el-input v-model="editForm.xsnum" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="销售订单名称" prop="xsname"
              ><el-input v-model="editForm.xsname" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="物料名称" prop="wl"
              ><el-input v-model="editForm.wl" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="规格型号" prop="gg"
              ><el-input v-model="editForm.gg" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="材质" prop="cz"
              ><el-input v-model="editForm.cz" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="色号" prop="sh"
              ><el-input v-model="editForm.sh" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="规格单位" prop="ggdw"
              ><el-input v-model="editForm.ggdw" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="生产用量" prop="scyl"
              ><el-input v-model="editForm.scyl" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="计价单位" prop="jjdw"
              ><el-input v-model="editForm.jjdw" placeholder=""></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addBomDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      SearchForm: {
        orderNum: '',
        orderName: '',
        itemName: '',
        ggxh: '',
        material: '',
      },
      tableList: [
        {
          bomnum: '111111',
          xsnum: 'djas123',
          xsname: 'asd1234',
          wl: '纽扣',
          gg: 'bmh25*25',
          cz: '塑料',
          sh: '白色',
          ggdw: '个',
          scyl: '100',
          jjdw: '元',
        },
        {
          bomnum: '111111',
          xsnum: 'djas123',
          xsname: 'asd1234',
          wl: '纽扣',
          gg: 'bmh25*25',
          cz: '塑料',
          sh: '白色',
          ggdw: '个',
          scyl: '100',
          jjdw: '元',
        },
        {
          bomnum: '111111',
          xsnum: 'djas123',
          xsname: 'asd1234',
          wl: '纽扣',
          gg: 'bmh25*25',
          cz: '塑料',
          sh: '白色',
          ggdw: '个',
          scyl: '100',
          jjdw: '元',
        },
        {
          bomnum: '111111',
          xsnum: 'djas123',
          xsname: 'asd1234',
          wl: '纽扣',
          gg: 'bmh25*25',
          cz: '塑料',
          sh: '白色',
          ggdw: '个',
          scyl: '100',
          jjdw: '元',
        },
      ],
      tableTitle: [
        { label: 'BOM编号', prop: 'bomnum' },
        { label: '销售订单编号', prop: 'xsnum' },
        { label: '销售订单名称', prop: 'xsname' },
        { label: '物料名称', prop: 'wl' },
        { label: '规格型号', prop: 'gg' },
        { label: '材质', prop: 'cz' },
      ],
      addBomDialogVisible: false,
      editBomDialogVisible: false,
      addForm: {
        bomnum: '',
        xsnum: '',
        xsname: '',
        wl: '',
        gg: '',
        cz: '',
        sh: '',
        ggdw: '',
        scyl: '',
        jjdw: '',
      },
      editForm: {
        bomnum: '',
        xsnum: '',
        xsname: '',
        wl: '',
        gg: '',
        cz: '',
        sh: '',
        ggdw: '',
        scyl: '',
        jjdw: '',
      },
      tableAmountData: [],
    }
  },
  created() {},
  methods: {
    handleSelectionChange(val) {
      this.tableAmountData = val
      console.log(this.tableAmountData)
    },
    modifyBOM() {
      if (this.tableAmountData.length === 0) {
        return
      } else {
        this.editForm = this.tableAmountData[0]
        this.editBomDialogVisible = true
      }
    },
    deleteBOM() {
      this.tableList = this.tableList.filter((item) => {
        return this.tableAmountData.indexOf(item) === -1
      })
    },
    remove(index) {
      this.tableList.splice(index, 1)
    },
    edit(data, index) {
      console.log(data)
      this.editForm = data
      console.log(this.editForm)
      this.editBomDialogVisible = true
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
          export_json_to_excel(tHeader, data, 'BOM清单')
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },
    reset() {
      this.$refs.searchRef.resetFields()
    },
    addBOM() {
      this.addBomDialogVisible = true
    },
    submit() {
      this.addBomDialogVisible = false
      this.$refs.form.resetFields()
    },
  },
}
</script>
<style lang="scss" scoped>
.aa {
  margin-top: 10px;
}
.el-dialog-div {
  height: 500px;
  overflow: auto;
}
</style>