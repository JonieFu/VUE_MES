<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>生产订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="libraryForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="生产订单号" label-width="90px" prop="scddh"
              ><el-input v-model="SearchForm.scddh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="排产计划编码"
              label-width="100px"
              prop="pcjhbm"
              ><el-input v-model="SearchForm.pcjhbm"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="排产名称" label-width="70px" prop="pcmc"
              ><el-input v-model="SearchForm.pcmc"></el-input></el-form-item
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
            prop="scddh"
            label="生产订单号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="plbm"
            label="品类编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="pcjhbm"
            label="排产计划编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="pcmc"
            label="排产名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cplx"
            label="产品类型"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="rwh"
            label="任务号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="scsl"
            label="生产数量"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="scddzt"
            label="生产订单状态"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jhkssj"
            label="计划开始时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jhwcsj"
            label="计划完成时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sjkssj"
            label="实际开始时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sjwcsj"
            label="实际完成时间"
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
            prop="gxr"
            label="更新人"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gxsj"
            label="更新时间"
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
      title="添加生产订单"
      :visible.sync="addLibraryDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="rawform" :model="addlibraryForm" label-width="130px">
          <el-form-item label="生产订单号" prop="scddh"
            ><el-input v-model="addlibraryForm.scddh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="品类编码" prop="plbm"
            ><el-input v-model="addlibraryForm.plbm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="排产计划编码" prop="pcjhbm"
            ><el-input
              v-model="addlibraryForm.pcjhbm"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="排产名称" prop="pcmc"
            ><el-input v-model="addlibraryForm.pcmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="产品类型" prop="cplx"
            ><el-input v-model="addlibraryForm.cplx" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="任务号" prop="rwh"
            ><el-input v-model="addlibraryForm.rwh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="生产数量" prop="scsl"
            ><el-input v-model="addlibraryForm.scsl" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="生产订单状态" prop="scddzt"
            ><el-input
              v-model="addlibraryForm.scddzt"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="计划开始时间" prop="jhkssj"
            ><el-input
              v-model="addlibraryForm.jhkssj"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="计划完成时间" prop="jhwcsj"
            ><el-input
              v-model="addlibraryForm.jhwcsj"
              placeholder=""
            ></el-input>
          </el-form-item>

          <el-form-item label="实际开始时间" prop="sjkssj"
            ><el-input
              v-model="addlibraryForm.sjkssj"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="实际完成时间" prop="sjwcsj"
            ><el-input
              v-model="addlibraryForm.sjwcsj"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="创建人" prop="cjr"
            ><el-input v-model="addlibraryForm.cjr" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="cjsj"
            ><el-input v-model="addlibraryForm.cjsj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="更新人" prop="gxr"
            ><el-input v-model="addlibraryForm.gxr" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="更新时间" prop="gxsj"
            ><el-input v-model="addlibraryForm.gxsj" placeholder=""></el-input>
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
        scddh: '',
        pcjhbm: '',
        pcmc: '',
      },
      tableList: [
        {
          scddh: '',
          plbm: '',
          pcjhbm: '',
          pcmc: '',
          cplx: '',
          rwh: '',
          scsl: '',
          scddzt: '',
          jhkssj: '',
          jhwcsj: '',
          sjkssj: '',
          sjwcsj: '',
          cjr: '',
          cjsj: '',
          gxr: '',
          gxsj: '',
        },
      ],
      currentPage: 1,
      href: '',
      addLibraryDialogVisible: false,
      addlibraryForm: {
        scddh: '',
        plbm: '',
        pcjhbm: '',
        pcmc: '',
        cplx: '',
        rwh: '',
        scsl: '',
        scddzt: '',
        jhkssj: '',
        jhwcsj: '',
        sjkssj: '',
        sjwcsj: '',
        cjr: '',
        cjsj: '',
        gxr: '',
        gxsj: '',
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