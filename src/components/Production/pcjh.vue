<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>排产计划</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="libraryForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="入库单号" label-width="70px" prop="rkdh"
              ><el-input v-model="SearchForm.rkdh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="入库单名称" label-width="90px" prop="rkdmc"
              ><el-input v-model="SearchForm.rkdmc"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="采购订单编号"
              label-width="100px"
              prop="cgddbh"
              ><el-input v-model="SearchForm.cgddbh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="采购订单名称"
              label-width="100px"
              prop="cgddmc"
              ><el-input v-model="SearchForm.cgddmc"></el-input></el-form-item
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
            <el-button type="primary" size="mini" @click="addlibrary"
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
            prop="rkdh"
            label="入库单号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="rkdmc"
            label="入库单名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="rkclmc"
            label="入库材料名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="bcrkclsl"
            label="本次入库材料数量"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="zkcsl"
            label="总库存数量"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jldw"
            label="计量单位"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cgddbh"
            label="采购订单编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cgddmc"
            label="采购订单名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cjr"
            label="创建人"
          ></el-table-column
          ><el-table-column
            align="center"
            prop="cjsj"
            label="创建时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gxsj"
            label="更新时间"
          ></el-table-column>

          <el-table-column
            align="center"
            prop="bombh"
            label="BOM编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="BOMwlmc"
            label="BOM物料名称"
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
            label="供货联系人"
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
            prop="bz"
            label="备注"
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
      title="添加入库单"
      :visible.sync="addLibraryDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="rawform" :model="addlibraryForm" label-width="130px">
          <el-form-item label="入库单号" prop="rkdh"
            ><el-input v-model="addlibraryForm.rkdh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="入库单名称" prop="gysmc"
            ><el-input v-model="addlibraryForm.rkdmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="入库材料名称" prop="rkclmc"
            ><el-input
              v-model="addlibraryForm.rkclmc"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="本次入库材料数量" prop="bcrkclsl"
            ><el-input
              v-model="addlibraryForm.bcrkclsl"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="总库存数量" prop="zkcsl"
            ><el-input v-model="addlibraryForm.zkcsl" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="计量单位" prop="jldw"
            ><el-input v-model="addlibraryForm.jldw" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="采购订单编号" prop="cgddbh"
            ><el-input
              v-model="addlibraryForm.cgddbh"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="采购订单名称" prop="cgddmc"
            ><el-input
              v-model="addlibraryForm.cgddmc"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="创建人" prop="cjr"
            ><el-input v-model="addlibraryForm.cjr" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="cjsj"
            ><el-input v-model="addlibraryForm.cjsj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="更新时间" prop="gxsj"
            ><el-input v-model="addlibraryForm.gxsj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="BOM编号" prop="bombh"
            ><el-input v-model="addlibraryForm.bombh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="BOM物料名称" prop="BOMwlmc"
            ><el-input
              v-model="addlibraryForm.BOMwlmc"
              placeholder=""
            ></el-input>
          </el-form-item>

          <el-form-item label="供货单位" prop="ghdw"
            ><el-input
              v-model="addlibraryForm.BOMwlmc"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="供货日期" prop="ghrq"
            ><el-input v-model="addlibraryForm.ghrq" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="交货日期" prop="jhrq"
            ><el-input v-model="addlibraryForm.jhrq" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="供货联系人" prop="ghlxr"
            ><el-input v-model="addlibraryForm.ghlxr" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="供货商联系电话" prop="ghslxdh"
            ><el-input
              v-model="addlibraryForm.ghslxdh"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="shdz"
            ><el-input v-model="addlibraryForm.shdz" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="销售订单号" prop="xsddh"
            ><el-input v-model="addlibraryForm.xsddh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="销售订单名称" prop="xsddmc"
            ><el-input
              v-model="addlibraryForm.xsddmc"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="bz"
            ><el-input v-model="addlibraryForm.bz" placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addLibraryDialogVisible = false">取 消</el-button>
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
        rkdh: '',
        rkdmc: '',
        cgddbh: '',
        cgddmc: '',
      },
      tableList: [
        {
          rkdh: 'ds',
          rkdmc: 'sdf',
          rkclmc: 'sdf',
          bcrkclsl: 'saf',
          zkcsl: 'sdf',
          jldw: 'jlgk',
          cgddbh: 'dsgz',
          cgddmc: 'fg',
          cjr: 'zcx',
          cjsj: 'dfg',
          gxsj: 'xd',
          bombh: 'sdf',
          BOMwlmc: 'sdf',
          ghdw: 'sdf',
          ghrq: 'sdf',
          jhrq: 'sdfs',
          ghlxr: 'sdf',
          ghslxdh: 'sdfs',
          shdz: 'sdfsd',
          xsddh: 'sdfs',
          xsddmc: 'sdf',
          bz: 'sdfs',
        },
      ],
      currentPage: 1,
      href: '',
      addLibraryDialogVisible: false,
      addlibraryForm: {
        rkdh: '',
        rkdmc: '',
        rkclmc: '',
        bcrkclsl: '',
        zkcsl: '',
        jldw: '',
        cgddbh: '',
        cgddmc: '',
        cjr: '',
        cjsj: '',
        gxsj: '',
        bombh: '',
        BOMwlmc: '',
        ghdw: '',
        ghrq: '',
        jhrq: '',
        ghlxr: '',
        ghslxdh: '',
        shdz: '',
        xsddh: '',
        xsddmc: '',
        bz: '',
      },
    }
  },
  created() {
    this.href = window.location.href
    console.log(this.href)
  },
  methods: {
    export() {},
    search() {},
    reset() {
      this.$refs.libraryForm.resetFields()
    },
    addlibrary() {
      this.addLibraryDialogVisible = true
    },
    submit() {
      this.addLibraryDialogVisible = false
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