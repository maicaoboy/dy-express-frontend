<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :type="type"
    :visible.sync="isVisible"
    top="50px"
  >
    <el-container>
      <el-aside background-color="fff8eb">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#6a8d6d"
          text-color="#fff"
          active-text-color="#fff8eb"
          @select="handelSelect"
        >
          <el-menu-item index="transportTaskDetail">
            <i class="el-icon-transportTask" />
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item index="transportTaskLineDetail">
            <i class="el-icon-location" />
            <span slot="title">运输任务线轨迹详情</span>
          </el-menu-item>
          <el-menu-item index="transportOrderDetail">
            <i class="el-icon-location" />
            <span slot="title">运单详情</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-form v-if="transportTaskisVisible" ref="form" :model="transportTask" :rules="rules" label-position="right" label-width="100px">
          <el-form-item :label="$t('table.transportTask.transportTaskNo')" prop="id">
            <el-input v-model="transportTask.id" :disabled="true" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.truckId')" prop="id">
            <el-input v-model="transportTask.truckId" :disabled="true" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.status')" prop="status">
            <el-input v-model="transportTask.status" :disabled="true" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.assignStatus')" prop="status">
            <el-input v-model="transportTask.assignedStatus" :disabled="true" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.startAgencyId')" prop="transportTaskType">
            <el-input v-model="transportTask.startAgencyId" :disabled="true" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.endAgencyId')" prop="transportTaskType">
            <el-input v-model="transportTask.endAgencyId" :disabled="true" />
          </el-form-item>
        </el-form>
        <el-form v-if="transportOrderisVisible" ref="orderform" :model="transportTask" label-position="right" label-width="100px">
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
            <el-table-column :label="$t('table.transportTask.transportNo')" align="center" prop="code" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.transportOrderIds }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.transportTask.createTime')" align="center" prop="code" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" :label="$t('table.transportTask.status')" :formatter="transportTaskStatusFormater" />
            <el-table-column prop="assignStatus" :label="$t('table.transportTask.assignStatus')" :formatter="transportTaskAssignStatusFormater" />
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
          </el-table>
          <pagination
            v-show="tableData.total>0"
            :limit.sync="pagination.size"
            :page.sync="pagination.current"
            :total="Number(tableData.total)"
            @pagination="fetch"
          />
        </el-form>
        <el-form v-if="transportLineisVisible" ref="lineform" :model="transportTask" label-position="right" label-width="100px">
          <el-form-item :label="$t('table.transportTask.transportTripId')" prop="id">
            <el-input v-model="transportTask.transportTripsId" :disabled="true" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.truckId')" prop="id">
            <el-input v-model="transportTask.truckId" :disabled="true" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.planDepartureTime')" prop="transportTaskType">
            <el-input v-model="transportTask.planDepartureTime" :disabled="true" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.actualDepartureTime')" prop="transportTaskType">
            <el-input v-model="transportTask.actualDepartureTime" :disabled="true" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.planArrivalTime')" prop="transportTaskType">
            <el-input v-model="transportTask.actualArrivalTime" :disabled="true" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.actualArrivalTime')" prop="transportTaskType">
            <el-input v-model="transportTask.actualArrivalTime" :disabled="true" />
          </el-form-item>
        </el-form>
        <template v-if="transportLineisVisible">
          <baidu-map class="map" center="北京" zoom="10">
            <bm-driving :start="start" :end="end" :auto-viewport="true" :policy="BMAP_DRIVING_POLICY_LEAST_DISTANCE" />
          </baidu-map>
        </template>
      </el-main>
    </el-container>
    <div slot="footer" class="dialog-footer">
      <el-button plain type="warning" @click="isVisible = false">
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>

import TransportTaskApi from '@/api/TransportTask'
import Pagination from '@/components/Pagination'
import AreaApi from '@/api/Area'

export default {
  name: 'TransportTaskDetail',
  components: {
    Pagination
  },
  props: {
    type: {
      type: String,
      default: 'add'
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: '查看详情',
      transportTask: {},
      transportTaskisVisible: true,
      transportLineisVisible: false,
      transportOrderisVisible: false,
      loading: false,
      tableData: {
        total: 0
      },
      // 默认经纬度
      start: {
        lng: 116.301934,
        lat: 39.977552
      },
      tableKey: 0,
      end: {
        lng: 116.508328,
        lat: 39.919141
      },
      rules: {
        status: {
          required: true,
          message: this.$t('rules.require'),
          trigger: 'blur'
        }
      },
      pagination: {
        size: 10,
        current: 1
      },
      BaiduMapAK: 'BaiduMapAK'
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    setTransportTasks(transportTask) {
      this.transportTask = { ...transportTask }
    },
    setStart() {
      AreaApi.get(this.transportTask.startAgencyId).then(response => {
        const res = response.data
        if (res.isSuccess) {
          this.start.lat = res.data.lat
          this.start.lng = res.data.lng
        }
      })
    },
    setEnd() {
      AreaApi.get(this.transportTask.endAgencyId).then(response => {
        const res = response.data
        if (res.isSuccess) {
          this.end.lat = res.data.lat
          this.end.lng = res.data.lng
        }
      })
    },
    detailFetch(params = {}) {
      const that = this // 存储this
      console.log(this)
      console.log(that)
      this.loading = true
      params.id = this.transportTask.id
      params.pageSize = this.pagination.size
      params.page = this.pagination.current
      // console.log(params)
      TransportTaskApi.findByPage(params).then(response => {
        const res = response.data
        console.log(res)
        this.loading = false
        this.tableData = res
      })
    },
    handelSelect(index) {
      if (index === 'transportTaskDetail') {
        this.transportTaskisVisible = true
        this.transportLineisVisible = false
        this.transportOrderisVisible = false
      } else if (index === 'transportTaskLineDetail') {
        this.transportTaskisVisible = false
        this.transportLineisVisible = true
        this.transportOrderisVisible = false
        this.setStart()
        this.setEnd()
      } else if (index === 'transportOrderDetail') {
        this.transportTaskisVisible = false
        this.transportLineisVisible = false
        this.transportOrderisVisible = true
        this.detailFetch()
      }
    },
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
    transportTaskAssignStatusFormater(row, column) {
      if (row.status === 1) {
        return '待分配'
      } else if (row.status === 2) {
        return '已分配'
      } else if (row.status === 3) {
        return '待人工分配'
      } else {
        return '未知'
      }
    }
  }
}
</script>

<style>
.map {
  width: 100%;
  height: 400px;
}
</style>

