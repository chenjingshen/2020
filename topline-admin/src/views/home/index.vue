<template>
  <el-container class="myContainer">
    <!-- 侧边栏 -->
    <el-aside width="200px" class="myAside">Aside</el-aside>
    <!-- 右边 -->
    <el-main class="myMain"
      ><el-container>
        <el-header class="myMainHeagder">Header</el-header>
        <el-main>Main</el-main>
      </el-container></el-main
    >
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.myContainer {
  height: 100%;
  .myAside {
    background-color: #323745;
  }
  .myMain {
      padding: 0;
    .myMainHeagder {
      background-color: pink;
    }
  }
}
</style>
