<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物料管理</el-breadcrumb-item>
      <el-breadcrumb-item>物料出库</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="itemOfForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="出库单号" label-width="70px" prop="rkdh"
              ><el-input v-model="SearchForm.rkdh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="出库单名称" label-width="90px" prop="rkdmc"
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
            prop="ckdh"
            label="出库单号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ckdmc"
            label="出库单名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ckclmc"
            label="出库材料名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ckclsl"
            label="出库材料数量"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jldw"
            label="计量单位"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="scddbh"
            label="生产订单编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="scddmc"
            label="生产订单名称"
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
            prop="Bomwlmc"
            label="BOM物料名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="bomggxh"
            label="BOM规格型号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="bomsh"
            label="BOM色号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="bomcz"
            label="BOM材质"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="bomggdw"
            label="BOM规格单位"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="bomscyl"
            label="BOM生产用量"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="bomjjdw"
            label="BOM计价单位"
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
      title="添加出库单"
      :visible.sync="addLibraryDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="itemOfForm" :model="additemOfForm" label-width="130px">
          <el-form-item label="出库单号" prop="ckdh"
            ><el-input v-model="additemOfForm.ckdh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="出库单名称" prop="ckdmc"
            ><el-input v-model="additemOfForm.ckdmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="出库材料名称" prop="ckclmc"
            ><el-input v-model="additemOfForm.ckclmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="出库材料数量" prop="ckclsl"
            ><el-input v-model="additemOfForm.ckclsl" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="计量单位" prop="jldw"
            ><el-input v-model="additemOfForm.jldw" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="生产订单编号" prop="scddbh"
            ><el-input v-model="additemOfForm.scddbh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="生产订单名称" prop="scddmc"
            ><el-input v-model="additemOfForm.scddmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="采购订单编号" prop="cgddbh"
            ><el-input v-model="additemOfForm.cgddbh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="采购订单名称" prop="cgddmc"
            ><el-input v-model="additemOfForm.cjr" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="创建人" prop="cjr"
            ><el-input v-model="additemOfForm.cjr" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="cjsj"
            ><el-input v-model="additemOfForm.cjsj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="更新时间" prop="gxsj"
            ><el-input v-model="additemOfForm.gxsj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="BOM编号" prop="bombh"
            ><el-input v-model="additemOfForm.bombh" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="BOM物料名称" prop="Bomwlmc"
            ><el-input
              v-model="additemOfForm.Bomwlmc"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM规格型号" prop="bomggxh"
            ><el-input
              v-model="additemOfForm.bomggxh"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM色号" prop="bomsh"
            ><el-input v-model="additemOfForm.bomsh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="BOM材质" prop="bomcz"
            ><el-input v-model="additemOfForm.bomcz" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="BOM规格单位" prop="bomggdw"
            ><el-input
              v-model="additemOfForm.bomggdw"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM生产用量" prop="bomscyl"
            ><el-input
              v-model="additemOfForm.bomscyl"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="BOM计价单位" prop="bomjjdw"
            ><el-input
              v-model="additemOfForm.bomjjdw"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="供货单位" prop="ghdw"
            ><el-input v-model="additemOfForm.ghdw" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="供货日期" prop="ghrq"
            ><el-input v-model="additemOfForm.ghrq" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="交货日期" prop="jhrq"
            ><el-input v-model="additemOfForm.jhrq" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="供货联系人" prop="ghlxr"
            ><el-input v-model="additemOfForm.ghlxr" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="供货商联系电话" prop="ghslxdh"
            ><el-input
              v-model="additemOfForm.ghslxdh"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="shdz"
            ><el-input v-model="additemOfForm.shdz" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="销售订单号" prop="xsddh"
            ><el-input v-model="additemOfForm.xsddh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="销售订单名称" prop="xsddmc"
            ><el-input v-model="additemOfForm.xsddmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="bz"
            ><el-input v-model="additemOfForm.bz" placeholder=""></el-input>
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
        ckdh: '',
        ckdmc: '',
        cgddbh: '',
        cgddmc: '',
      },
      tableList: [
        {
          ckdh: 'ds',
          ckdmc: 'sdf',
          ckclmc: 'sdf',
          ckclsl: 'saf',
          jldw: 'sdf',
          scddbh: 'jlgk',
          scddmc: 'dsgz',
          cgddbh: 'fg',
          cgddmc: 'zcx',
          cjr: 'dfg',
          cjsj: 'xd',
          gxsj: 'sdf',
          bombh: 'dsf',
          Bomwlmc: 'sdf',
          bomggxh: 'sdf',
          bomsh: 'sdf',
          bomcz: 'sdfs',
          bomggdw: 'sdf',
          bomscyl: 'sdfs',
          bomjjdw: 'sdfsd',
          ghdw: 'sdfs',
          ghrq: 'fgdsf',
          jhrq: 'sdf',
          ghlxr: 'sdfs',
          ghslxdh: 'dfsdf',
          shdz: 'dsfdgf',
          xsddh: 'dsfd',
          xsddmc: 'dsfd',
          bz: 'sdsf',
        },
      ],
      currentPage: 1,
      href: '',
      addLibraryDialogVisible: false,
      additemOfForm: {
        ckdh: '',
        ckdmc: '',
        ckclmc: '',
        ckclsl: '',
        jldw: '',
        scddbh: '',
        scddmc: '',
        cgddbh: '',
        cgddmc: '',
        cjr: '',
        cjsj: '',
        gxsj: '',
        bombh: '',
        Bomwlmc: '',
        bomggxh: '',
        bomsh: '',
        bomcz: '',
        bomggdw: '',
        bomscyl: '',
        bomjjdw: '',
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
  },
  methods: {
    export() {},
    search() {},
    reset() {
      this.$refs.itemOfForm.resetFields()
    },
    addlibrary() {
      this.addLibraryDialogVisible = true
    },
    submit() {
      console.log('1234343')
      this.addLibraryDialogVisible = false
      console.log(this.$refs.itemOfForm)
      this.$refs.itemOfForm.resetFields()
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