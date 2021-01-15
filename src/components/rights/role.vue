<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary">添加角色</el-button>
      <el-table :data="roleList" border>
        <el-table-column type="expand">
          <template slot-scope="{ row }">
            <el-row
              :class="['bottom', i1 === 0 ? 'top' : '', 'vcenter']"
              :key="item1.id"
              v-for="(item1, i1) in row.children"
            >
              <el-col :span="5">
                <el-tag
                  closable
                  :disable-transitions="false"
                  @close="removeTag"
                >
                  {{ item1.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  :class="[i2 === 0 ? '' : 'top', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="8">
                    <el-tag
                      @close="removeTag"
                      type="success"
                      closable
                      :disable-transitions="false"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="16">
                    <el-tag
                      @close="removeTag"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      :disable-transitions="false"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          type="index"
          label="#"
        ></el-table-column>
        <el-table-column
          align="center"
          label="角色名称"
          prop="roleName"
        ></el-table-column>
        <el-table-column
          align="center"
          label="角色描述"
          prop="roleDesc"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
            <el-button type="warning" icon="el-icon-setting" size="mini"
              >分配权限</el-button
            >
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
      roleList: [
        {
          roleName: '管理员',
          id: 1,
          roleDesc: '系统管理员',
          children: [
            {
              authName: '商品管理',
              id: 11,
              children: [
                {
                  authName: '商品分类',
                  id: 111,
                  children: [
                    {
                      id: 1111,
                      authName: '添加分类',
                    },
                  ],
                },
              ],
            },
            {
              authName: '权限管理',
              id: 12,
              children: [
                {
                  authName: '角色列表',
                  id: 121,
                  children: [
                    {
                      authName: '角色授权',
                      id: 1211,
                    },
                    {
                      id: 1212,
                      authName: '取消角色授权',
                    },
                  ],
                },
                {
                  authName: '角色列表2',
                  id: 1212,
                  children: [
                    {
                      authName: '角色授权2',
                      id: 1212,
                    },
                    {
                      id: 1213,
                      authName: '取消角色授权2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          roleName: '采购员',
          id: 2,
          roleDesc: '负责采购',
          children: [
            {
              authName: '采购管理',
              id: 21,
              children: [
                {
                  authName: '采购单管理',
                  id: 211,
                  children: [
                    {
                      authName: '退货单管理',
                      id: 2111,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }
  },
  created() {},
  methods: {
    async removeTag() {
      const result = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => {
        return err
      })
      console.log(result)
    },
  },
}
</script>
<style lang="scss" scoped>
.el-tag {
  margin: 7px;
}
.bottom {
  border-bottom: 1px solid #eee;
}
.top {
  border-top: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>