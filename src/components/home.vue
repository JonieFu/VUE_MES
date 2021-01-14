<template>
  <el-container class="home_container">
    <el-header
      ><div>
        <img src="../assets/mes.png" />
        <span>MES系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <div @click="toggleCollapse">|||</div>
        <el-menu
          style="width: 200px"
          :unique-opened="true"
          active-text-color="#409EFF"
          text-color="#fff"
          :collapse="isCollapse"
          background-color="#333744"
          :collapse-transition="false"
          :default-active="activePath"
          router
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span slot="title">{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + item2.path"
              v-for="item2 in item.children"
              :key="item2.id"
              @click="saveNavState('/' + item2.path)"
            >
              <i class="el-icon-menu"></i>
              <span>{{ item2.authName }}</span></el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      menulist: [
        {
          authName: '用户管理',
          id: 0,
          children: [
            {
              authName: '用户列表',
              id: 100,
              path: 'user',
            },
          ],
        },
        {
          authName: '权限管理',
          id: 1,
          children: [
            { authName: '部门管理', id: 11, path: 'department' },
            { authName: '员工管理', id: 12, path: 'employee' },
            { authName: '公司管理', id: 13, path: 'company' },
            { authName: '角色管理', id: 14, path: 'role' },
            { authName: '菜单管理', id: 15, path: 'menu' },
          ],
        },
        {
          authName: '基础数据',
          id: 2,
          children: [
            { authName: '基础数据配置', id: 21, path: 'configuration' },
            { authName: '基础数据维护', id: 22, path: 'maintenance' },
          ],
        },
        {
          authName: '合同管理',
          id: 3,
          children: [{ authName: '合同管理', id: 31, path: 'contract' }],
        },
        {
          authName: '采购管理',
          id: 4,
          children: [
            { authName: '采购单', id: 41, path: 'purchas_order' },
            { authName: '退货单', id: 42, path: 'return_order' },
          ],
        },
      ],
      iconsObj: {
        0: 'iconfont icon-user',
        1: 'iconfont icon-xitongguanli',
        2: 'iconfont icon-shuju',
        3: 'iconfont icon-hetong',
        4: 'iconfont icon-caigou',
      },
      isCollapse: false,
      activePath: '',
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },

    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
  },
}
</script>
<style lang="scss" scoped>
.home_container {
  height: 100%;
}
.el-header {
  background: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    img {
      margin-left: 30px;
      width: 45px;
    }
    span {
      color: white;
      margin-left: 10px;
    }
  }
}
.el-aside {
  background: #303440;
  div {
    color: white;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
}
.iconfont {
  margin-right: 10px;
}
</style>