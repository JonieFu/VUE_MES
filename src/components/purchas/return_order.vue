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
            <el-button type="primary" size="mini">添加</el-button>
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
      href: '',
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