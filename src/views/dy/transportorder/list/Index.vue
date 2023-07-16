<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.transport.transportNo') }}: </label>
            <el-input
              v-model="queryParams.id"
              :placeholder="$t('table.transport.transportNo')"
              class="filter-item search-item"
              clearable
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.transport.transportStatus') }}: </label>
            <template>
              <el-select v-model="queryParams.status" :placeholder="$t('table.select')">
                <el-option
                  v-for="item in transportStatusOptions"
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
            <label style="color:#909399;font-weight:500;">{{ $t('table.transport.schedulingStatus') }}: </label>
            <template>
              <el-select v-model="queryParams.schedulingStatus" :placeholder="$t('table.select')">
                <el-option
                  v-for="item in transportSchedulingStatusOptions"
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
        v-has-permission="['transport:add']"
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
        <el-table-column :label="$t('table.transport.transportNo')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transport.orderNo')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.orderId }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transport.transportTime')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('table.transport.transportStatus')" :formatter="transportStatusFormater" />
        <el-table-column prop="schedulingStatus" :label="$t('table.transport.schedulingStatus')" :formatter="transportSchedulingStatusFormater" />
        <el-table-column :label="$t('table.transport.senderName')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.senderName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transport.senderPhone')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.senderPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transport.senderAddress')" :formatter="senderAddressFormater" align="center" prop="code" width="200" />
        <el-table-column :label="$t('table.transport.receiverName')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.receiverName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transport.receiverPhone')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.receiverPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.transport.receiverAddress')" :formatter="receiverAddressFormater" align="center" prop="code" width="200" />
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
      <transport-edit
        ref="edit"
        :dialog-visible="dialog.isVisible"
        :transport-status-options="transportStatusOptions"
        :transport-scheduling-status-options="transportSchedulingStatusOptions"
        :type="dialog.type"
        @close="editClose"
        @success="editSuccess"
      />
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import TransportEdit from './Edit'
import transportApi from '@/api/TransportOrder.js'
import { provinceAndCityData, codeToText } from 'element-china-area-data'

export default {
  name: 'RoleManage',
  components: { Pagination, TransportEdit },
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
      transportSchedulingStatusOptions: [],
      transportStatusOptions: [],
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
      transportApi.findbypage(params).then(response => {
        const res = response.data
        this.loading = false
        this.tableData = res.data
      })
    },
    handleEdit(row) {
      // console.log(row)
      this.$refs.edit.setTransport(row)
      this.dialog.type = 'edit'
      this.dialog.isVisible = true
    },
    handleAdd() {
      this.$refs.edit.initTransport()
      this.dialog.type = 'add'
      this.dialog.isVisible = true
    },
    initOptions() {
      /**
       * 运单状态: 1为新建，2为运输中
       * 3为已装车，发往x转运中心，4为到达终端网点
       */
      this.transportStatusOptions = [
        {
          label: '新建',
          value: 1
        },
        {
          label: '运输中',
          value: 2
        },
        {
          label: '已装车，发往x转运中心',
          value: 3
        },
        {
          label: '到达终端网点',
          value: 4
        }
      ]
      /**
       * 运单调度状态，1为待调度，2为未匹配线路，3为已调度
       */
      this.transportSchedulingStatusOptions = [
        {
          label: '待调度',
          value: 1
        },
        {
          label: '未匹配线路',
          value: 2
        },
        {
          label: '已调度',
          value: 3
        }
      ]
    },
    /**
     * 运单状态: 1为新建，2为运输中
     * 3为已装车，发往x转运中心，4为到达终端网点
     */
    transportStatusFormater(row, column) {
      if (row.status === 1) {
        return '新建'
      } else if (row.status === 2) {
        return '运输中'
      } else if (row.status === 3) {
        return '已装车，发往x转运中心'
      } else if (row.status === 4) {
        return '到达终端网点'
      } else {
        return '未知'
      }
    },

    transportSchedulingStatusFormater(row, column) {
      if (row.status === 1) {
        return '待调度'
      } else if (row.status === 2) {
        return '未匹配线路'
      } else if (row.status === 3) {
        return '已调度'
      } else {
        return '未知'
      }
    },
    senderAddressFormater(row, column) {
      return codeToText[row.senderProvinceId] + codeToText[row.senderCityId] + codeToText[row.receiverCountyId] + row.senderAddress
    },
    receiverAddressFormater(row, column) {
      return codeToText[row.receiverProvinceId] + codeToText[row.receiverCityId] + codeToText[row.receiverCountyId] + row.receiverAddress
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

