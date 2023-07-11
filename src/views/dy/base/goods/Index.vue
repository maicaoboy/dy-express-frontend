<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.goodsTypeSearch.name') }}: </label>
            <el-input
              :placeholder="$t('table.goodsTypeSearch.name')"
              class="filter-item search-item"
              clearable
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.goodsType.truckType') }}</label>
            <template>
              <el-select :placeholder="$t('table.select')">
                <el-option
                  v-for="item in truckTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </div>
        </el-col>
        <el-button
          style="background-color: #8dc149;color: #fff;border-radius: 5px;border-color: #DCDFE6;"
          @click="search"
        >
          {{ $t('table.search') }}
        </el-button>
        <el-button
          style="background-color: #fff;color: #606266;border-radius: 5px;border-color: #DCDFE6;"
          @click="reset"
        >
          {{ $t('table.reset') }}
        </el-button>
      </el-row>
    </div>
    <el-card shadow="never" style="margin-top: 10px;">
      <el-button
        class="addtype-button"
        style="background-color: #8dc149;color: #fff;border-radius: 5px;border-color: #DCDFE6;"
        @click="reset"
      >
        {{ $t('table.goodsType.add') }}
      </el-button>
      <el-table
        :key="tableKey"
        ref="table"
        :header-cell-style="{background:'#FCFBFF',border:'0'}"
        fit
        style="width: 100%;"
      >
        <el-table-column
          type="index"
          :label="$t('table.serial')"
          align="center"
          width="150"
        />
        <el-table-column
          prop="code"
          :label="$t('table.goodsType.code')"
          align="center"
          width="150"
        />
        <el-table-column
          prop="unit"
          :label="$t('table.goodsType.name')"
          align="center"
          width="150"
        />
        <el-table-column
          prop="updateTime"
          :label="$t('table.goodsType.truckType')"
          align="center"
          width="150"
        />
        <el-table-column
          prop="volume"
          :label="$t('table.goodsType.defaultVolume')"
          align="center"
          width="150"
        />
        <el-table-column
          prop="weight"
          :label="$t('table.goodsType.defaultWeight')"
          align="center"
          width="150"
        />
        <el-table-column
          prop="remark"
          :label="$t('table.goodsType.describe')"
          align="center"
          width="150"
        />
        <el-table-column
          prop="createTime"
          :label="$t('table.goodsType.operate')"
          fixed="right"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryParams: {},
      truckTypeOptions: []
    }
  },
  initOptions() {
    this.truckTypeOptions = [
      { label: '货车', value: 0 },
      { label: '卡车', value: 1 },
      { label: '冷藏车', value: 2 }
    ]
  }
}
</script>
<style>
.addtype-button {
  padding-top: 10px;     /* 设置按钮的上边界宽度为 10px */
  padding-bottom: 10px;
  margin-bottom: 10px;
}
</style>
