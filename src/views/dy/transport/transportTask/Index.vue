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
                  v-for="item in transportTaskAssignStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
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
        :data="tableData.items"
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
        <el-table-column :label="$t('table.transportTask.createTime')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('table.transportTask.status')" :formatter="transportTaskStatusFormater" />
        <el-table-column prop="assignStatus" :label="$t('table.transportTask.assignStatus')" :formatter="transportTaskAssignStatusFormater" />
        <el-table-column prop="loadStatus" :label="$t('table.transportTask.loadStatus')" :formatter="transportTaskLoadStatusFormater" />
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
        <el-table-column :label="$t('table.transportTask.planDepartureTime')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.planDepartureTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transportTask.actualDepartureTime')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.actualDepartureTime }}</span>
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
            <el-button type="text" size="small" @click="detail(scope.$index, scope.row)">
              {{ $t('table.details') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="tableData.counts>0"
        :limit.sync="pagination.size"
        :page.sync="pagination.current"
        :total="Number(tableData.counts)"
        @pagination="fetch"
      />
      <transportTask-edit
        ref="edit"
        :dialog-visible="dialog.isVisible"
        :transport-task-status-options="transportTaskStatusOptions"
        :transport-task-assign-status-options="transportTaskAssignStatusOptions"
        :transport-task-load-status-options="transportTaskLoadStatusOptions"
        :type="dialog.type"
        @close="editClose"
        @success="editSuccess"
      />
      <transportTask-detail
        ref="transportTaskDetail"
        :is-visible="detailForm.isVisible"
        @close="editClose">
      </transportTask-detail>
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import TransportTaskEdit from '@/views/dy/transport/transportTask/Edit.vue'
import TransportTaskDetail from '@/views/dy/transport/transportTask/Detail.vue'
import TransportTaskApi from '@/api/TransportTask.js'
import { provinceAndCityData, codeToText } from 'element-china-area-data'
import { Message } from 'element-ui'

export default {
  name: 'TransportTaskIndex',
  components: { Pagination, TransportTaskEdit, TransportTaskDetail },
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
      transportTaskListisVisible: true,
      transportTaskDetailisVisible: false,
      tableData: {
        total: 0
      },
      detailForm: {
        isVisible: false
      },
      pagination: {
        size: 10,
        current: 1
      },
      transportTaskStatusOptions: [],
      transportTaskAssignStatusOptions: [],
      transportTaskLoadStatusOptions: []
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
    detail(index, row) {
      this.detailForm.isVisible = true
      this.$refs.transportTaskDetail.setTransportTasks(row)
      console.log(this.$refs)
    },
    fetch(params = {}) {
      const that = this // 存储this
      console.log(this)
      console.log(that)
      this.loading = true
      params.pageSize = this.pagination.size
      params.page = this.pagination.current
      TransportTaskApi.findByPage(params).then(response => {
        const res = response.data
        console.log(res)
        this.loading = false
        this.tableData = res
      })
    },
    handleEdit(row) {
      // console.log(row)
      if (row.assignedStatus === 2) {
        this.dialog.type = 'edit'
        this.dialog.isVisible = false
        Message.error('运输任务单状态为已分配，无法修改')
      } else {
        this.$refs.edit.setTransportTask(row)
        this.dialog.type = 'edit'
        this.dialog.isVisible = true
      }
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
      this.transportTaskAssignStatusOptions = [
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
      this.transportTaskLoadStatusOptions = [
        {
          label: '半载',
          value: 1
        },
        {
          label: '满载',
          value: 2
        },
        {
          label: '空载',
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
    transportTaskLoadStatusFormater(row, column) {
      if (row.loadingStatus === 1) {
        return '半载'
      } else if (row.loadingStatus === 2) {
        return '满载'
      } else if (row.loadingStatus === 3) {
        return '空载'
      } else {
        return '未知'
      }
    },
    transportTaskAssignStatusFormater(row, column) {
      if (row.assignedStatus === 1) {
        return '待分配'
      } else if (row.assignedStatus === 2) {
        return '已分配'
      } else if (row.assignedStatus === 3) {
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

