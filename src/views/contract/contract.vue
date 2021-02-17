<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>业务模块</el-breadcrumb-item>
      <el-breadcrumb-item>合同管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form size="small" :model="searchInput" label-width="100px">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="商务合同编号">
              <el-input
                v-model="searchInput.bussiness_contract_code"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="合同编号">
              <el-input v-model="searchInput.contract_code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="合同名称">
              <el-input
                v-model="searchInput.bussiness_contract_code"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="small">搜索</el-button>
            <el-button type="primary" size="small"
              ><router-link :to="{ name: 'ContractAdd' }" class="add"
                >新增</router-link
              ></el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column
          align="center"
          label="序号"
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          v-for="n in 9"
          :prop="tableProp[n - 1]"
          :label="tableLabelData[n - 1]"
          :key="n - 1"
        ></el-table-column>
        <el-table-column align="center" label="操作" class="handle">
          <template scope="{$index,row}">
            <el-row>
              <el-col>
                <router-link
                  :to="{
                    name: 'ContractReview',
                    params: { data: reviewMessage, contractIndex: $index },
                  }"
                >
                  <el-button
                    type="priamary"
                    size="mini"
                    @click="review($index, row)"
                  >
                    审查</el-button
                  >
                </router-link>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <router-link
                  :to="{
                    name: 'ContractEdit',
                    params: { data: reviewMessage, contractIndex: $index },
                  }"
                >
                  <el-button
                    size="mini"
                    type="primary"
                    @click="edit($index, row)"
                    >编辑</el-button
                  >
                </router-link>
              </el-col>
            </el-row>
            <el-row>
              <el-col
                ><el-button
                  size="mini"
                  type="danger"
                  @click="removeRow($index, row)"
                  >删除</el-button
                ></el-col
              >
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      lableList: ['商务合同编号', '合同编号', '合同名称'],
      searchInput: {
        bussiness_contract_code: '',
        contract_code: '',
        contract_name: '',
      },
      tableLabelData: [
        '商务合同编号',
        '合同编号',
        '中标批次',
        '招标单位',
        '合同甲方单位',
        '中标时间',
        '合同签订结束日期',
        '中标数量',
        '状态',
      ],
      tableProp: [
        'BUSINESS_CONTRACT_CODE',
        'CONTRACT_CODE',
        'BIDDING_BATCH',
        'BIDDING_POSITION',
        'BIDDING_PARTY_A',
        'BIDDING_TIME',
        'END_TIME',
        'BIDDING_COUNT',
        'STATE',
      ],
      tableData: [
        {
          CONTRACT_NAME: 'MES系统',
          BUSINESS_CONTRACT_CODE: 'GSD23124',
          CONTRACT_CODE: '1234567',
          BIDDING_POSITION: '京仪研究总院',
          BIDDING_PARTY_A: '京仪北方',
          BIDDING_BATCH: '34',
          BIDDING_TIME: '2020-1-1',
          END_TIME: '2022-1-1',
          BIDDING_COUNT: '1',
          SOFTWARE_VERSION: '1.0.1',
          HARDWARE_VERSION: '1.2.1',
          PRODUCT_DETAIL_CODE: '567890',
          INTERNAL_CONTROL_CODE: '5463',
          STATE: '待审核',
        },
        {
          CONTRACT_NAME: 'MES系统',
          BUSINESS_CONTRACT_CODE: 'GSD23124',
          CONTRACT_CODE: '1234567',
          BIDDING_POSITION: '京仪研究总院',
          BIDDING_PARTY_A: '京仪北方',
          BIDDING_BATCH: '34',
          BIDDING_TIME: '2020-1-1',
          END_TIME: '2022-1-1',
          BIDDING_COUNT: '1',
          SOFTWARE_VERSION: '1.0.1',
          HARDWARE_VERSION: '1.2.1',
          PRODUCT_DETAIL_CODE: '567890',
          INTERNAL_CONTROL_CODE: '5463',
          STATE: '待审核',
        },
        {
          CONTRACT_NAME: 'MES系统',
          BUSINESS_CONTRACT_CODE: 'GSD23124',
          CONTRACT_CODE: '1234567',
          BIDDING_POSITION: '京仪研究总院',
          BIDDING_PARTY_A: '京仪北方',
          BIDDING_BATCH: '34',
          BIDDING_TIME: '2020-1-1',
          END_TIME: '2022-1-1',
          BIDDING_COUNT: '1',
          SOFTWARE_VERSION: '1.0.1',
          HARDWARE_VERSION: '1.2.1',
          PRODUCT_DETAIL_CODE: '567890',
          INTERNAL_CONTROL_CODE: '5463',
          STATE: '待审核',
        },
        {
          CONTRACT_NAME: 'MES系统',
          BUSINESS_CONTRACT_CODE: 'GSD23124',
          CONTRACT_CODE: '1234567',
          BIDDING_POSITION: '京仪研究总院',
          BIDDING_PARTY_A: '京仪北方',
          BIDDING_BATCH: '34',
          BIDDING_TIME: '2020-1-1',
          END_TIME: '2022-1-1',
          BIDDING_COUNT: '1',
          SOFTWARE_VERSION: '1.0.1',
          HARDWARE_VERSION: '1.2.1',
          PRODUCT_DETAIL_CODE: '567890',
          INTERNAL_CONTROL_CODE: '5463',
          STATE: '待审核',
        },
      ],
      tableDataAmount: [],
      visible: false,
      editVisible: false,
      reviewMessage: {},
    }
  },
  created() {},
  methods: {
    removeRow(index, row) {
      this.tableData.splice(index, 1)
      this.messageNotification('删除成功')
    },
    edit(index, row) {
      this.reviewMessage = this.tableData[index]
    },
    review(index, row) {
      this.reviewMessage = this.tableData[index]
    },
    handleSelectionChange(data) {
      this.tableDataAmount = data
    },
  },
}
</script>
<style lang="scss" scoped>
.add {
  text-decoration: none;
  color: white;
}
</style>