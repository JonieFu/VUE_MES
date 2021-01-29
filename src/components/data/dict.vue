<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>字典设置</el-breadcrumb-item>
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
            <el-button type="primary" size="mini" @click="addDict"
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
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        >
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column
            align="center"
            prop="dictNum"
            label="字典主键"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="dictName"
            label="字典名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="dictType"
            label="字典类型"
          ></el-table-column>
          <el-table-column align="center" prop="dictStatus" label="状态">
            <template slot-scope="{ row }">
              <el-tag v-if="row.dictStatus === 1"> 正常</el-tag>
              <el-tag v-if="row.dictStatus === 0" type="info"> 不正常</el-tag>
            </template></el-table-column
          >
          <el-table-column
            align="center"
            prop="Note"
            label="备注"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="dictTmie"
            label="创建时间"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="300px">
            <template slot-scope="{ row }">
              <el-button type="primary" icon="el-icon-edit" size="mini"
                >编辑</el-button
              >
              <el-button type="warning" icon="el-icon-notebook-1" size="mini"
                ><router-link
                  :to="{
                    name: 'DictList',
                    params: {
                      dictName: row.dictName,
                      dictStatus: row.dictStatus === 1 ? '正常' : '不正常',
                    },
                  }"
                  class="list"
                  >列表</router-link
                ></el-button
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
      title="添加字典"
      :visible.sync="addDictDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="form"
          :model="adddictlist"
          label-width="150px"
          size="small"
        >
          <el-form-item label="字典主键"
            ><el-input style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="字典名称"
            ><el-input style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="字典类型"
            ><el-input style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="状态"
            ><el-input style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="备注"
            ><el-input style="width: 90%"></el-input> </el-form-item
          ><el-form-item label="创建时间"
            ><el-input style="width: 90%"></el-input>
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
        dictName: '',
        dictType: '',
        dictStatus: '',
        dictTime: [],
      },
      tableList: [
        {
          dictNum: '1',
          dictName: '用户性别',
          dictType: 'sys_user_sex',
          dictStatus: 1,
          Note: '用户性别列表',
          dictTmie: '2020-12-23',
        },
      ],
      adddictlist: {},
      currentPage: 1,
      addDictDialogVisible: false,
    }
  },
  created() {},
  methods: {
    submit() {},
    addDict() {
      this.addDictDialogVisible = true
    },
    reset() {
      this.$refs.searcDicthRef.resetFields()
    },
    search() {
      console.log(this.SearchForm)
    },
  },
}
</script>
<style lang="scss" scoped>
.list {
  text-decoration: none;
  color: white;
}
</style>