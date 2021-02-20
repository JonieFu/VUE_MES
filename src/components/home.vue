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
      <el-aside class="aside" :width="computeAsideWidth">
        <div class="logoToggle" @click="toggleCollapse">|||</div>
        <el-menu
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
      <el-main class="main"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      menulist: [
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
          id: 3,
          children: [
            { authName: 'BOM清单', id: 20, path: 'bom' },
            { authName: '字典设置', id: 23, path: 'dict' },
            { authName: '基础数据配置', id: 21, path: 'configuration' },
            { authName: '基础数据维护', id: 22, path: 'maintenance' },
            { authName: '工艺路线', id: 25, path: 'process' },
          ],
        },
        {
          authName: '业务模块',
          id: 2,
          children: [
            { authName: '合同管理', id: 23, path: 'contract' },
            { authName: '子合同管理', id: 25, path: 'sales_order' },
            { authName: '采购单', id: 41, path: 'purchas_order' },
            { authName: '退货单', id: 42, path: 'return_order' },
          ],
        },
        {
          authName: '物料管理',
          id: 4,
          children: [
            { authName: '重点原材料库存', id: 33, path: 'raw' },
            { authName: '物料入库', id: 31, path: 'itemIn' },
            { authName: '物料出库', id: 32, path: 'itemOut' },
          ],
        },
        {
          authName: '生产管理',
          id: 7,
          children: [
            { authName: '初较', id: 71, path: 'cj' },
            { authName: '上电初检', id: 72, path: 'sdcj' },
            { authName: '耐压', id: 73, path: 'ny' },
            { authName: '复校', id: 74, path: 'fj' },
            { authName: '图像结论表', id: 75, path: 'txjlb' },
            { authName: '生产订单', id: 76, path: 'scdd' },
            { authName: '豆码对比', id: 77, path: 'dmdb' },
            { authName: '排产计划', id: 78, path: 'pcjh' },
            { authName: '生产数据豆码', id: 79, path: 'scsjdm' },
            { authName: '生产数据来源', id: 80, path: 'scsjly' },
            { authName: '工单', id: 81, path: 'gd' },
            { authName: '报工信息', id: 82, path: 'bgxx' },
          ],
        },
        {
          authName: '质量管理',
          id: 5,
          children: [
            { authName: '压敏电阻', id: 51, path: 'ymdz' },
            { authName: '光电耦合器', id: 52, path: 'gdohq' },
            { authName: '晶体谐振器', id: 53, path: 'jtxzq' },
            { authName: '瞬变二极管', id: 54, path: 'sbejg' },
            { authName: '电池', id: 55, path: 'dc' },
            { authName: '液晶', id: 56, path: 'yj' },
            { authName: '电流互感器', id: 57, path: 'dlhgq' },
            { authName: '成品检测', id: 58, path: 'cpjc' },
          ],
        },
        {
          authName: '设备管理',
          id: 6,
          children: [
            { authName: '设备故障管理', id: 61, path: 'sbgzgl' },
            { authName: '设备日常维护', id: 62, path: 'sbrcwh' },
          ],
        },
      ],
      iconsObj: {
        1: 'iconfont icon-xitongguanli',
        2: 'iconfont icon-shuju',
        3: 'iconfont icon-caigou',
        4: 'iconfont icon-caigou',
        5: 'iconfont icon-shujubaobiao',
        6: 'iconfont icon-shujubaobiao',
        7: 'iconfont icon-shujubaobiao',
      },
      isCollapse: false,
      activePath: '',
    }
  },
  computed: {
    computeAsideWidth() {
      return this.isCollapse ? '75px' : '240px'
    },
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
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  mounted() {
    const main = document.querySelector('.main')
    const aside = document.querySelector('.aside')
    let height = document.body.clientHeight
    main.style.height = height - 60 + 'px'
    aside.style.height = height - 60 + 'px'
    window.addEventListener('resize', () => {
      height = document.body.clientHeight
      main.style.height = height - 60 + 'px'
      aside.style.height = height - 60 + 'px'
    })
  },
}
</script>
<style lang="scss" scoped>
.home_container {
  height: 100%;
}

.holder::-webkit-scrollbar {
  display: none;
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
  overflow-y: scroll;
  overflow-x: hidden;
  .logoToggle {
    color: white;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .el-menu {
    border-right: none;
  }
}
.iconfont {
  margin-right: 10px;
}
.el-main {
  background: #e8ecef;
}
</style>