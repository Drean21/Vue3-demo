<!--通用页眉组件-->
<template>
  <footer>
    <div class="center">
      <span>Copyright&nbsp;©{{ startYear }}-{{ currentYear }}&nbsp;{{ author }}&nbsp;</span>
      <span v-if="icpNumber" class="icp-number">
        <a href="http://beian.miit.gov.cn" target="_blank">{{ icpNumber }}</a>
      </span>
    </div>
  </footer>
</template>
<script lang="ts" setup>

interface PageFooterProps {
  startYear: number;
  author: string;
  icpNumber?: string;
}

const props = defineProps<PageFooterProps>();

const currentYear = new Date().getFullYear();
</script>
<style lang="less" scoped>
footer {
  background-color: #f3f4f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  .center {
    text-align: center;
    color: #4e77ab;
    a {
      text-decoration: none;
      color: #4979ff;
    }
  }
}
</style>
