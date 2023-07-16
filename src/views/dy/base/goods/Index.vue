<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.goodsTypeSearch.name') }}: </label>
            <el-input
              v-model="queryParams.name"
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
              <el-select v-model="queryParams.truckTypeId" :placeholder="$t('table.select')">
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
        @click="add"
      >
        {{ $t('table.goodsType.add') }}
      </el-button>
      <!--表单-->
      <el-table
        :key="tableKey"
        ref="table"
        v-loading="loading"
        :data="tableData.items"
        :header-cell-style="{background:'#FCFBFF',border:'0'}"
        fit
        style="width: 100%;"
      >
        <el-table-column
          type="index"
          :label="$t('table.serial')"
          align="center"
        />
        <!--货物编码-->
        <el-table-column
          prop="id"
          :label="$t('table.goodsType.code')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <!--货物名称-->
        <el-table-column
          prop="name"
          :label="$t('table.goodsType.name')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <!--货物的装车种类-->
        <el-table-column
          prop="updateTime"
          :label="$t('table.goodsType.truckType')"
          align="center"
        >
          <template slot-scope="scope">
            <div  class="tag-list">
              <el-tag v-for="(item, index) in scope.row.truckTypeNames" :key="index" type="success">{{ item }} </el-tag>
            </div>
          </template>
        </el-table-column>
        <!--货物的默认体积-->
        <el-table-column
          prop="volume"
          :label="$t('table.goodsType.defaultVolume')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.defaultVolume }}</span>
          </template>
        </el-table-column>
        <!--货物的默认重量-->
        <el-table-column
          prop="weight"
          :label="$t('table.goodsType.defaultWeight')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.defaultWeight }}</span>
          </template>
        </el-table-column>
        <!--货物的描述-->
        <el-table-column
          prop="remark"
          :label="$t('table.goodsType.describe')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('table.goodsType.operate')"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="edit(scope.$index, scope.row)"
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
      <pagination
        v-show="true"
        :limit.sync="pagination.size"
        :page.sync="pagination.current"
        :total="Number(tableData.counts)"
        @pagination="fetch"
      />
      <edit-form
        ref="edit"
        :is-visible="dialog.isVisible"
        :type="dialog.type"
        :truck-type-options="truckTypeOptions"
        @close="editClose"
        @handelAdd="handelAdd"
        @handelEdit="handelEdit"
      />
    </el-card>
  </div>
</template>
<script>
import GoodsInfoApi from '@/api/GoodsInfo'
import EditForm from '@/views/dy/base/goods/EditForm.vue'
import Pagination from '@/components/Pagination'
import truckTypeApi from '@/api/TruckType'
export default {
  components: {
    EditForm, Pagination
  },
  data() {
    return {
      queryParams: {},
      truckTypeOptions: [],
      tableData: {
        counts: '0'
      },
      loading: false,
      pagination: {
        size: 10,
        current: 1
      },
      tableKey: 0,
      sort: {},
      dialog: {
        isVisible: false,
        type: 'add'
      }
    }
  },
  mounted() {
    this.fetch()
    this.inittruckTypeOptions()
  },
  methods: {
    fetch(params = {}) {
      this.loading = true
      params.pageSize = this.pagination.size
      params.page = this.pagination.current
      // console.log(params)
      GoodsInfoApi.page(params).then(response => {
        const res = response.data
        this.loading = false
        this.tableData = res
      })
      truckTypeApi.page(params).then(response => {
        const res = response.data
        // 将res.item()数组中的每个对象的id和name属性取出来，组成一个新的数组
        this.truckTypeOptions = res.items.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
      })
    },
    editClose() {
      this.dialog.isVisible = false
    },
    add() {
      this.dialog.type = 'add'
      this.dialog.isVisible = true
    },
    handelAdd(good) {
      GoodsInfoApi.save(good).then(response => {
        const res = response.data
        if (res.isSuccess) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.dialog.isVisible = false
          this.search()
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    editSuccess() {
      this.search()
    },
    search() {
      this.fetch({
        ...this.queryParams,
        ...this.sort
      })
    },
    reset() {
      this.queryParams = {}
      this.sort = {}
      this.$refs.table.clearSort()
      this.$refs.table.clearFilter()
      this.search()
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除id为：' + row.id + '的货物类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          GoodsInfoApi.delete(row).then(response => {
            const res = response.data
            if (res.msg === 'success') {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.search()
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          })
        })
        .catch(() => {})
    },
    edit(index, row) {
      this.dialog.type = 'edit'
      this.dialog.isVisible = true
      this.$refs.edit.setGood(row)
    },
    handelEdit(good) {
      GoodsInfoApi.update(good).then(response => {
        const res = response.data
        if (res.isSuccess) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.dialog.isVisible = false
          this.search()
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style>
.addtype-button {
  padding-top: 10px;     /* 设置按钮的上边界宽度为 10px */
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* 设置标签之间的间隔 */
}
</style>
