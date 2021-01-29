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
        <el-row>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="addBOM"
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
      addBomDialogVisible: false,
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
    }
  },
  created() {
    var link = document.getElementsByClassName('export')
    console.log(link)
  },
  methods: {
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