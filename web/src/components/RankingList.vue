<template>
  <div class="rank-wrapper">
    <el-table :data="rankData" class="rank-table" style="width: 100%">
      <el-table-column prop="rank" label="排名" :min-width="30"></el-table-column> <!-- 将宽度设置为自适应 -->
      <el-table-column prop="avatar" label="用户" :min-width="80">
        <template #default="{ row }">
          <el-avatar :src="row.avatar || defaultAvatar" size="small"></el-avatar>
          <span class="user-name">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="solved" label="做题数"></el-table-column>
      <el-table-column prop="accuracy" label="正确率"></el-table-column>
    </el-table>
    <span class="statement">仅公示排名在前30的同学，努力上榜吧骚年！</span>
  </div>
</template>

<script setup lang="ts">
import { ElAvatar, ElTable, ElTableColumn } from "element-plus";
import { ref } from "vue";
import { getRankData } from "../server/index";

const defaultAvatar =
  "https://ts4.cn.mm.bing.net/th?id=OIP-C.hOMFI0yrQet18nDai_190AAAAA&w=212&h=212&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2";
const rankData = ref([]);

const loadData = async () => {
  try {
    const res = await getRankData();
    rankData.value = res.data;
  } catch (e) {
    console.error(e);
  }
};

loadData();
</script>

<style scoped lang="less">
.rank-wrapper {
  width: 100%;
  overflow: auto;
}

.rank-table {
  width: calc(100% + 10px);
  height: 100vh
}

.user-name {
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  // width: calc(100% - 60px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.statement{
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  width: 100%;
}
</style>
