<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.transportTask.transportTaskNo') }}: </label>
            <el-input
              v-model="queryParams.id"
              :placeholder="$t('table.transportTask.transportTaskNo')"
              class="filter-item search-item"
              clearable
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.transportTask.status') }}: </label>
            <template>
              <el-select v-model="queryParams.status" :placeholder="$t('table.select')">
                <el-option
                  v-for="item in transportTaskStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.transportTask.assignStatus') }}: </label>
            <template>
              <el-select v-model="queryParams.assignedStatus" :placeholder="$t('table.select')">
                <el-option
                  v-for="item in transportTaskAssignSatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.transportTask.transportNo') }}: </label>
            <el-input
              v-model="queryParams.transportNo"
              :placeholder="$t('table.transportTask.transportNo')"
              class="filter-item search-item"
              clearable
            />
          </div>
        </el-col>
      </el-row>

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
      <el-button
        v-has-permission="['transportTask:add']"
        style="background-color: #8dc149;color: #fff;border-radius: 5px;border-color: #DCDFE6;"
        @click="handleAdd()"
      >
        {{ $t('table.add') }}
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
      >
        <el-table-column type="index" width="50" :label="$t('table.serial')" />
        <el-table-column :label="$t('table.transportTask.transportTaskNo')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transportTask.transportNo')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.transportNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transportTask.createTime')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('table.transportTask.status')" :formatter="transportTaskStatusFormater" />
        <el-table-column prop="assignStatus" :label="$t('table.transportTask.assignStatus')" :formatter="AssignStatusFormater" />
        <el-table-column :label="$t('table.transportTask.startAgencyId')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.startAgencyId }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transportTask.endAgencyId')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.endAgencyId }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transportTask.transportTripId')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.transportTripsId }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transportTask.planDepatureTime')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.planDepatureTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transportTask.actualDepatureTime')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.actualDepatureTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transportTask.planArrivalTime')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.planArrivalTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transportTask.actualArrivalTime')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.actualArrivalTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transportTask.planPickUpTime')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row. planPickUpGoodsTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transportTask.actualPickUpTime')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.actualPickUpGoodsTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transportTask.planDeliveryTime')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.planDeliveryTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transportTask.actualDeliveryTime')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.actualDeliveryTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">
              {{ $t('table.edit') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="tableData.total>0"
        :limit.sync="pagination.size"
        :page.sync="pagination.current"
        :total="Number(tableData.total)"
        @pagination="fetch"
      />
      <transportTask-edit
        ref="edit"
        :dialog-visible="dialog.isVisible"
        :transportTask-status-options="transportTaskStatusOptions"
        :transportTask-assign-status-options="transportTaskAssignSatusOptions"
        :type="dialog.type"
        @close="editClose"
        @success="editSuccess"
      />
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import TransportTaskEdit from './Edit'
import TransportTaskApi from '@/api/TransportTask.js'
import { provinceAndCityData, codeToText } from 'element-china-area-data'

export default {
  name: 'RoleManage',
  components: { Pagination, TransportTaskEdit },
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
      codeToText,
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
      transportTaskStatusOptions: [],
      transportTaskAssignSatusOptions: []
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
    add() {
      this.dialog.type = 'add'
      this.dialog.isVisible = true
      this.$refs.edit.setRole(false)
    },
    fetch(params = {}) {
      this.loading = true
      params.pageSize = this.pagination.size
      params.page = this.pagination.current
      // console.log(params)
      TransportTaskApi.pageresponse(params).then(response => {
        const res = response.data
        this.loading = false
        this.tableData = res.data
      })
    },
    handleEdit(row) {
      // console.log(row)
      this.$refs.edit.setTransportTask(row)
      this.dialog.type = 'edit'
      this.dialog.isVisible = true
    },
    handleAdd() {
      this.$refs.edit.initTransportTask()
      this.dialog.type = 'add'
      this.dialog.isVisible = true
    },
    initOptions() {
      /**
     * 运输任务单状态: 1为待执行,2为进行中，23002为待确认，
     * 4为已完成，5为已取消
     */
      this.transportTaskStatusOptions = [
        {
          label: '待执行',
          value: 1
        },
        {
          label: '进行中',
          value: 2
        },
        {
          label: '待确认',
          value: 3
        },
        {
          label: '已完成',
          value: 4
        },
        {
          label: '已取消',
          value: 5
        }
      ]
      /**
     * 运输任务分配状态，1为待分配，2为已分配，3为待人工分配
     */
      this.transportTaskAssignSatusOptions = [
        {
          label: '待分配',
          value: 1
        },
        {
          label: '已分配',
          value: 2
        },
        {
          label: '待人工分配',
          value: 3
        }
      ]
    },
    /**
     * 运输任务单状态: 1为待执行,2为进行中，23002为待确认，
     * 4为已完成，5为已取消
     */
    transportTaskStatusFormater(row, column) {
      if (row.status === 1) {
        return '待执行'
      } else if (row.status === 2) {
        return '进行中'
      } else if (row.status === 3) {
        return '待确认'
      } else if (row.status === 4) {
        return '已完成'
      } else if (row.status === 5) {
        return '已取消'
      } else {
        return '未知'
      }
    },
    AssignStatusFormater(row, column) {
      if (row.status === 23000) {
        return '待分配'
      } else if (row.status === 23001) {
        return '已分配'
      } else if (row.status === 23002) {
        return '待人工分配'
      } else {
        return '未知'
      }
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

