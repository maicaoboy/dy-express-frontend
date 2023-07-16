<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.driverwork.id') }}: </label>
            <el-input
              v-model="queryParams.id"
              :placeholder="$t('table.driverwork.id')"
              class="filter-item search-item"
              clearable
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.driverwork.driverName') }}: </label>
            <el-input
              v-model="driverName"
              :placeholder="$t('table.driverwork.driverName')"
              class="filter-item search-item"
              clearable
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.driverwork.status') }}</label>
            <template>
              <el-select v-model="queryParams.status" :placeholder="$t('table.select')">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-card shadow="never" style="margin-top: 10px;">
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
      <el-table
        :key="tableKey"
        ref="table"
        v-loading="loading"
        :data="tableData.records"
        :header-cell-style="{background:'#FCFBFF',border:'0'}"
        fit
        style="width: 100%;"
      >
        <el-table-column
          type="index"
          :label="$t('table.serial')"
          align="center"
        />
        <!--作业编号-->
        <el-table-column
          prop="id"
          :label="$t('table.driverwork.id')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <!--司机姓名-->
        <el-table-column
          prop="id"
          :label="$t('table.driverwork.driverName')"
          align="center"
          :formatter="getDriverName"
        >
        </el-table-column>
        <!--计划发车时间-->
        <el-table-column
          prop="id"
          :label="$t('table.driverwork.startTime')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.planDepartureTime }}</span>
          </template>
        </el-table-column>
        <!--实际到达时间-->
        <el-table-column
          prop="id"
          :label="$t('table.driverwork.endTime')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.actualArrivalTime }}</span>
          </template>
        </el-table-column>
        <!--运输任务单编号-->
        <el-table-column
          prop="id"
          :label="$t('table.driverwork.taskTransportId')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.taskTransportId }}</span>
          </template>
        </el-table-column>
        <!--作业状态-->
        <el-table-column
          prop="name"
          :label="$t('table.driverwork.status')"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="getStatusTagType(scope.row.status)">{{ scope.row.status | statusText }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.operation')"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
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
        :total="Number(tableData.total)"
        @pagination="fetch"
      />
    </el-card>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination/index.vue'
import DriverWorkApi from '@/api/DriverWork'
import userApi from '@/api/User'
export default {
  components: {
    Pagination
  },
  filters: {
    statusText(status) {
      // 根据状态码转换为相应的文字
      switch (status) {
        case 1:
          return '待提货'
        case 2:
          return '进行中'
        case 3:
          return '已完成'
        default:
          return '未知状态'
      }
    }
  },
  created() {
    this.fetch()
  },
  watch: {
    driverName() {
      this.getDriverId()
    }
  },
  data() {
    return {
      tableKey: 0,
      loading: false,
      tableData: {},
      queryParams: {
        driverId: ''
      },
      driverUserData: [],
      driverName: '',
      pagination: {
        current: 1,
        size: 10
      },
      sort: {},
      statusOptions: [
        {
          value: 1,
          label: '待提货'
        },
        {
          value: 2,
          label: '进行中'
        },
        {
          value: 3,
          label: '已完成'
        }
      ]
    }
  },
  methods: {
    fetch(params = {}) {
      this.loading = true
      params.pageSize = this.pagination.size
      params.page = this.pagination.current
      DriverWorkApi.page(params).then(response => {
        const res = response.data
        this.loading = false
        this.tableData = res.data
      })
      userApi.list({
        orgId: '1129427750227018145',
        stationId: '1129427834431865377'
      }) // 获取司机用户
        .then(response => {
          const res = response.data
          this.driverUserData = res.data
        })
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
    getStatusTagType(status) {
      switch (status) {
        case 1:
          return 'danger' // 绿色
        case 2:
          return 'primary' //
        case 3:
          return 'success' // 红色
        default:
          return 'primary' // 默认颜色
      }
    },
    getDriverName(row) {
      const driver = this.driverUserData.find(item => item.id === row.driverId)
      return driver ? driver.name : ''
    },
    getDriverId() {
      const driver = this.driverUserData.find(item => item.name === this.driverName)
      this.queryParams.driverId = driver ? driver.id : ''
    }
  }
}
</script>
