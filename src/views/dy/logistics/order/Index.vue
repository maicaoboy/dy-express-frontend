<template>
  <div class="app-container">
    <div class="filter-container">
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.orderNo') }}: </label>
      <el-input
        v-model="queryParams.orderNo"
        :placeholder="$t('table.order.orderNo')"
        class="filter-item search-item"
        clearable
      />
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.orderStatus') }}: </label>
      <template>
        <el-select v-model="queryParams.orderStatus" :placeholder="$t('table.select')">
          <el-option
            v-for="item in orderStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.payStatus') }}: </label>
      <template>
        <el-select v-model="queryParams.payStatus" :placeholder="$t('table.select')">
          <el-option
            v-for="item in payStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.senderName') }}: </label>
      <el-input
        v-model="queryParams.senderName"
        :placeholder="$t('table.order.senderName')"
        class="filter-item search-item"
        clearable
      />
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.senderPhone') }}: </label>
      <el-input
        v-model="queryParams.senderPhone"
        :placeholder="$t('table.order.senderPhone')"
        class="filter-item search-item"
        clearable
      />
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.senderAddress') }}: </label>
      <el-cascader
        v-model="selectedSenderAddress"
        size="large"
        :options="provinceAndCityData"
      />
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.receiverName') }}: </label>
      <el-input
        v-model="queryParams.receiverName"
        :placeholder="$t('table.order.receiverName')"
        class="filter-item search-item"
        clearable
      />
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.receiverPhone') }}: </label>
      <el-input
        v-model="queryParams.receiverPhone"
        :placeholder="$t('table.order.receiverPhone')"
        class="filter-item search-item"
        clearable
      />
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.receiverAddress') }}: </label>
      <el-cascader
        v-model="selectedReceiverAddress"
        size="large"
        :options="provinceAndCityData"
      />
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
    </div>
    <el-card shadow="never" style="margin-top: 10px;">
      <el-table
        :key="tableKey"
        ref="table"
        v-loading="loading"
        :data="tableData.records"
        :header-cell-style="{background:'#FCFBFF',border:'0'}"
        fit
        style="width: 100%;"
        @selection-change="onSelectChange"
        @sort-change="sortChange"
      >
        <el-table-column type="index" width="50" :label="$t('table.serial')" />
        <el-table-column :label="$t('table.order.orderNo')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.orderNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.order.transportNo')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.transportNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.order.orderTime')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.orderTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.order.orderStatus')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.orderStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.order.senderName')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.senderName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.order.senderPhone')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.senderPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.order.senderAddress')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.senderAddress }}</span>
          </template>
          <el-table-column :label="$t('table.order.receiverName')" align="center" prop="code" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.receiverName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.order.receiverPhone')" align="center" prop="code" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.receiverPhone }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.order.receiverAddress')" align="center" prop="code" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.receiverAddress }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">
                查看
              </el-button>
              <el-button type="text" size="small">
                编辑
              </el-button>
            </template>
          </el-table-column>

          <pagination
            v-show="tableData.total>0"
            :limit.sync="pagination.size"
            :page.sync="pagination.current"
            :total="Number(tableData.total)"
            @pagination="fetch"
          />
          <role-edit
            ref="edit"
            :dialog-visible="dialog.isVisible"
            :type="dialog.type"
            @close="editClose"
            @success="editSuccess"
          />
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import RoleEdit from './Edit'
import orderApi from '@/api/Order.js'
import { provinceAndCityData } from 'element-china-area-data'

export default {
  name: 'RoleManage',
  components: { Pagination, RoleEdit },
  filters: {
    statusFilter(status) {
      const map = {
        false: 'danger',
        true: 'success'
      }
      return map[status] || 'success'
    }
  },
  data() {
    return {
      provinceAndCityData,
      dialog: {
        isVisible: false,
        type: 'add'
      },
      tableKey: 0,
      // total: 0,
      queryParams: {},
      sort: {},
      selection: [],
      // 以下已修改
      loading: false,
      tableData: {
        total: 0
      },
      pagination: {
        size: 10,
        current: 1
      },
      orderStatusOptions: [],
      payStatusOptions: [],
      selectedSenderAddress: [],
      selectedReceiverAddress: []
    }
  },
  computed: {},
  mounted() {
    this.initOptions()
    this.fetch()
  },
  methods: {
    filterStatus(value, row) {
      return row.status === value
    },
    editClose() {
      this.dialog.isVisible = false
    },
    editSuccess() {
      this.search()
    },
    onSelectChange(selection) {
      this.selection = selection
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
    exportExcel() {
      this.$message({
        message: '待完善',
        type: 'warning'
      })
    },
    singleDelete(row) {
      this.$refs.table.toggleRowSelection(row, true)
      this.batchDelete()
    },
    batchDelete() {
      if (!this.selection.length) {
        this.$message({
          message: this.$t('tips.noDataSelected'),
          type: 'warning'
        })
        return
      }
      this.$confirm(this.$t('tips.confirmDelete'), this.$t('common.tips'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      })
        .then(() => {
          const ids = []
          this.selection.forEach(u => {
            ids.push(u.id)
          })
          this.delete(ids)
        })
        .catch(() => {
          this.clearSelections()
        })
    },
    clearSelections() {
      this.$refs.table.clearSelection()
    },
    delete(ids) {
      orderApi.delete({ ids: ids }).then(response => {
        const res = response.data
        if (res.isSuccess) {
          this.$message({
            message: this.$t('tips.deleteSuccess'),
            type: 'success'
          })
        }
        this.search()
      })
    },
    add() {
      this.dialog.type = 'add'
      this.dialog.isVisible = true
      this.$refs.edit.setRole(false)
    },
    edit(row) {
      this.$refs.edit.setRole(row)
      this.dialog.type = 'edit'
      this.dialog.isVisible = true
    },
    fetch(params = {}) {
      this.loading = true
      params.pageSize = this.pagination.size
      params.page = this.pagination.current
      console.log(params)
      orderApi.page(params).then(response => {
        const res = response.data
        this.loading = false
        this.tableData = res.data
      })
    },
    sortChange(val) {
      this.sort.field = val.prop
      this.sort.order = val.order
      this.search()
    },
    initOptions() {
      this.orderStatusOptions = [
        {
          label: '待取件',
          value: '0'
        },
        {
          label: '已取件',
          value: '1'
        },
        {
          label: '已取消',
          value: '2'
        }
      ]
      this.payStatusOptions = [
        {
          label: '未支付',
          value: '0'
        },
        {
          label: '已支付',
          value: '1'
        }
      ]
    }
  }
}
</script>
  <style lang="scss">
  .search-role {
    background-color: #8dc149;
    color: #fff;
    border-radius: 5px;
  }
  .reset-role {
    background-color: #fff;
    color: #000;
    border-radius: 5px;
  }
  .el-table {
    border: 1px solid #f7f6f9;
  }
  .el-table tr,
  .el-table td {
    border-top: 0;
    border-right: 0;
    border-bottom: 1px solid #f7f6f9;
  }
  </style>

