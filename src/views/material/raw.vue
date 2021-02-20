<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物料管理</el-breadcrumb-item>
      <el-breadcrumb-item>重点原材料库存</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="rawForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item
              label="采购方总部编码"
              label-width="110px"
              prop="cgfzbbm"
              ><el-input v-model="SearchForm.cgfzbbm"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="供应商编码" label-width="90px" prop="gysbm"
              ><el-input v-model="SearchForm.gysbm"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="原材料名称" label-width="90px" prop="yclmc"
              ><el-input v-model="SearchForm.yclmc"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="原材料描述" label-width="90px" prop="yclms"
              ><el-input v-model="SearchForm.yclms"></el-input></el-form-item
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
            <el-button type="primary" size="mini" @click="addRaw"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="modifyRaw"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="danger" size="mini" @click="deleteRaw"
              >批量删除</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini" style="margin-left: 24px">
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
            prop="gysmc"
            label="供应商名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gysbm"
            label="供应商编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="yclmc"
            label="原材料名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ycldw"
            label="原材料单位"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="yclms"
            label="原材料描述"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="yclgys"
            label="原材料供应商"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="yclzzs"
            label="原材料制造商"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="pl"
            label="品类"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="zl"
            label="种类"
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
          <el-table-column
            align="center"
            prop="sjkjf"
            label="数据可见方"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="150px">
            <template slot-scope="">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                style="width: 50px; padding: 7px 0"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                style="width: 50px; padding: 7px 0"
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
      title="添加重点原材料"
      :visible.sync="addRawDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="rawform" :model="addrawForm" label-width="130px">
          <el-form-item label="采购方总部编码" prop="cgfzbbm"
            ><el-input v-model="addrawForm.cgfzbbm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" prop="gysmc"
            ><el-input v-model="addrawForm.gysmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="供应商编码" prop="gysbm"
            ><el-input v-model="addrawForm.gysbm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="原材料名称" prop="yclmc"
            ><el-input v-model="addrawForm.yclmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="原材料单位" prop="ycldw"
            ><el-input v-model="addrawForm.ycldw" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="原材料描述" prop="yclms"
            ><el-input v-model="addrawForm.yclms" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="原材料供应商" prop="yclgys"
            ><el-input v-model="addrawForm.yclgys" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="原材料制造商" prop="yclzzs"
            ><el-input v-model="addrawForm.yclzzs" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="品类" prop="pl"
            ><el-input v-model="addrawForm.pl" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="种类" prop="zl"
            ><el-input v-model="addrawForm.zl" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="数据来源" prop="sjly"
            ><el-input v-model="addrawForm.sjly" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="来源数据创建时间" prop="lysjcjsj"
            ><el-input v-model="addrawForm.lysjcjsj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="数据可见方" prop="sjkjf"
            ><el-input v-model="addrawForm.sjkjf" placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBomDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加重点原材料"
      :visible.sync="editRawDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="rawform" :model="editrawForm" label-width="130px">
          <el-form-item label="采购方总部编码" prop="cgfzbbm"
            ><el-input v-model="editrawForm.cgfzbbm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" prop="gysmc"
            ><el-input v-model="editrawForm.gysmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="供应商编码" prop="gysbm"
            ><el-input v-model="editrawForm.gysbm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="原材料名称" prop="yclmc"
            ><el-input v-model="editrawForm.yclmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="原材料单位" prop="ycldw"
            ><el-input v-model="editrawForm.ycldw" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="原材料描述" prop="yclms"
            ><el-input v-model="editrawForm.yclms" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="原材料供应商" prop="yclgys"
            ><el-input v-model="editrawForm.yclgys" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="原材料制造商" prop="yclzzs"
            ><el-input v-model="editrawForm.yclzzs" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="品类" prop="pl"
            ><el-input v-model="editrawForm.pl" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="种类" prop="zl"
            ><el-input v-model="editrawForm.zl" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="数据来源" prop="sjly"
            ><el-input v-model="editrawForm.sjly" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="来源数据创建时间" prop="lysjcjsj"
            ><el-input v-model="editrawForm.lysjcjsj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="数据可见方" prop="sjkjf"
            ><el-input v-model="editrawForm.sjkjf" placeholder=""></el-input>
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
      SearchForm: {
        cgfzbbm: '',
        gysbm: '',
        yclmc: '',
        yclms: '',
      },
      tableList: [
        {
          cgfzbbm: 'DSF234567',
          gysmc: 'dasdgsg',
          gysbm: '234765',
          yclmc: 'asf',
          ycldw: '个',
          yclms: 'dsag',
          yclgys: 'gfdg',
          yclzzs: 'sfdsgg',
          pl: 'asfd',
          zl: 'asd',
          sjly: 'asdf',
          lysjcjsj: 'safd',
          sjkjf: 'adf',
        },
      ],
      currentPage: 1,
      href: '',
      addRawDialogVisible: false,
      editRawDialogVisible: false,
      addrawForm: {
        cgfzbbm: '',
        gysmc: '',
        gysbm: '',
        yclmc: '',
        ycldw: '',
        yclms: '',
        yclgys: '',
        yclzzs: '',
        pl: '',
        zl: '',
        sjly: '',
        lysjcjsj: '',
        sjkjf: '',
      },
      editrawForm: {
        cgfzbbm: '',
        gysmc: '',
        gysbm: '',
        yclmc: '',
        ycldw: '',
        yclms: '',
        yclgys: '',
        yclzzs: '',
        pl: '',
        zl: '',
        sjly: '',
        lysjcjsj: '',
        sjkjf: '',
      },
      tableAmountData: [],
    }
  },
  created() {
    this.href = window.location.href
    console.log(this.href)
  },
  methods: {
    modifyRaw() {
      if (this.tableAmountData.length === 0) {
        return
      } else {
        this.editrawForm = this.tableAmountData[0]
        this.editRawDialogVisible = true
      }
    },
    handleSelectionChange(val) {
      this.tableAmountData = val
      console.log(this.tableAmountData)
    },
    search() {},
    reset() {
      this.$refs.rawForm.resetFields()
    },
    submit() {
      this.addRawDialogVisible = false
      this.$refs.rawform.resetFields()
    },
    addRaw() {
      this.addRawDialogVisible = true
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
  margin: auto;
  .el-input {
    width: 90%;
  }
}
</style>