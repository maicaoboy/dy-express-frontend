<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">司机名称: </label>
            <el-input
              :placeholder="司机名称"
              class="filter-item search-item"
              clearable
            />
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
        添加司机信息
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
        <!--司机编号-->
        <el-table-column
          prop="id"
          :label="$t('table.driver.id')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <!--司机姓名-->
        <el-table-column
          prop="name"
          :label="$t('table.driver.name')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <!--司机电话-->
        <el-table-column
          prop="updateTime"
          :label="$t('table.driver.phone')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <!--所属机构-->
        <el-table-column
          prop="volume"
          :label="$t('table.driver.org')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.defaultVolume }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('table.operation')"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="edit(scope.$index, scope.row)"
            >
              查看详情
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
        @close="editClose"
      />
    </el-card>
  </div>
</template>
<script>
import DriverApi from '@/api/Driver'
import EditForm from '@/views/dy/base/goods/EditForm.vue'
import Pagination from '@/components/Pagination'

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
      dialog: {
        isVisible: false,
        type: 'add'
      }
    }
  },
  mounted() {
    this.initOptions()
    this.fetch()
  },
  methods: {
    fetch(params = {}) {
      this.loading = true
      params.pageSize = this.pagination.size
      params.page = this.pagination.current
      // console.log(params)
      DriverApi.page(params).then(response => {
        const res = response.data
        this.loading = false
        this.tableData = res
      })
    },
    editClose() {
      this.dialog.isVisible = false
    },
    add() {
      this.dialog.type = 'add'
      this.dialog.isVisible = true
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
    handleDelete(index, row) {
      this.$confirm('此操作将删除id为：' + row.id + '的货物类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          DriverApi.delete(row).then(response => {
            const res = response.data
            if (res.isSuccess) {
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
      this.$nextTick(() => {
        this.$refs.edit.init(row)
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
</style>
