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
            <el-button type="primary" size="mini">
              <a class="export">导出</a>
            </el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableList"
          border
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
            label="最后跟新人"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="200px">
            <template>
              <el-button type="primary" icon="el-icon-edit" size="mini"
                >编辑</el-button
              >
              <el-button type="danger" icon="el-icon-delete" size="mini"
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
      @close="closeDialog"
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
          lchz: '装配-->测试工序-->集成测试工序-->焊接',
          cjsj: '2020-12-9',
          cjr: 'admin',
          zhcjsj: '2020-12-23',
          zhgxr: 'admin',
        },
      ],
      currentPage: 1,
      processDialogVisible: false,
      addProcessList: {
        process_code: '',
        descript: '',
        draws: '',
        user: '',
        newUser: '',
      },
      checkList: [],
    }
  },
  created() {},
  methods: {
    closeDialog() {
      this.$refs.addprocess.resetFields()
      this.checkList = []
    },
    clear() {
      console.log('清空')
      this.checkList = []
    },
    addProcess() {
      this.processDialogVisible = true
    },
    reset() {
      this.$refs.addprocess.resetFields()
    },
    search() {
      console.log('搜索')
    },
    checkboxChange() {
      let str = ''
      if (this.checkList.length === 0) {
        this.addProcessList.draws = ''
        return
      }
      this.checkList.forEach((item, index) => {
        if (index === this.checkList.length - 1) {
          str = str + item
          this.addProcessList.draws = str
          return
        }
        item = item + '-->'
        str = str + item
      })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>