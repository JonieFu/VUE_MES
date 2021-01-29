<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>业务模块</el-breadcrumb-item>
      <el-breadcrumb-item>销售订单</el-breadcrumb-item>
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
            ><el-form-item label="销售订单号" label-width="90px" prop="xsdd"
              ><el-input v-model="salesForm.xsdd"></el-input></el-form-item
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
            <el-button type="primary" size="mini">
              <a class="export" href="" download="haha.html">导出</a>
            </el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableList"
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
      title="添加销售订单"
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
          <el-form-item label="采购方总部编码" prop="bomnum"
            ><el-input
              v-model="addsaleslist.cgfzbbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售订单编号" prop="xsnum"
            ><el-input
              v-model="addsaleslist.xsddh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售订单名称" prop="xsname"
            ><el-input
              v-model="addsaleslist.xsddmc"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="物料名称" prop="wl"
            ><el-input
              v-model="addsaleslist.gysbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="规格型号" prop="gg"
            ><el-input
              v-model="addsaleslist.cgfgsbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="材质" prop="cz"
            ><el-input
              v-model="addsaleslist.cgfgsmc"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="色号" prop="sh"
            ><el-input
              v-model="addsaleslist.cgfgssf"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="规格单位" prop="ggdw"
            ><el-input
              v-model="addsaleslist.plbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="生产用量" prop="scyl"
            ><el-input
              v-model="addsaleslist.zlbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="计价单位" prop="jjdw"
            ><el-input
              v-model="addsaleslist.xsddzt"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售订单状态" prop="jjdw"
            ><el-input
              v-model="addsaleslist.xsddhxmh"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售订单行项目ID" prop="jjdw"
            ><el-input
              v-model="addsaleslist.cgddhxmid"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="物料编码" prop="jjdw"
            ><el-input
              v-model="addsaleslist.wzbm"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="物资名称" prop="jjdw"
            ><el-input
              v-model="addsaleslist.wzmc"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="物资单位" prop="jjdw"
            ><el-input
              v-model="addsaleslist.wzdw"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="物资数量" prop="jjdw"
            ><el-input
              v-model="addsaleslist.wzsl"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据拥有方" prop="jjdw"
            ><el-input
              v-model="addsaleslist.sjyyf"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据可见方" prop="jjdw"
            ><el-input
              v-model="addsaleslist.sjkjf"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据来源" prop="jjdw"
            ><el-input
              v-model="addsaleslist.sjly"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="来源数据创建时间" prop="jjdw"
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
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      salesForm: {
        cgfzbbm: '',
        xsdd: '',
        gysbm: '',
      },
      tableList: [
        {
          cgfzbbm: '1',
          xsddh: '2323232343',
          xsddmc: '34567',
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
        xsddh: '',
        xsddmc: '',
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
      href: '',
      addSalesDialogVisible: false,
    }
  },
  created() {},
  methods: {
    addsales() {
      this.addSalesDialogVisible = true
    },
    submit() {
      this.addSalesDialogVisible = false
    },
    export() {},
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