<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.order.orderNo') }}: </label>
            <el-input
              v-model="queryParams.id"
              :placeholder="$t('table.order.orderNo')"
              class="filter-item search-item"
              clearable
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.order.orderStatus') }}: </label>
            <template>
              <el-select v-model="queryParams.status" :placeholder="$t('table.select')">
                <el-option
                  v-for="item in orderStatusOptions"
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
            <label style="color:#909399;font-weight:500;">{{ $t('table.order.payStatus') }}: </label>
            <template>
              <el-select v-model="queryParams.paymentStatus" :placeholder="$t('table.select')">
                <el-option
                  v-for="item in payStatusOptions"
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
            <label style="color:#909399;font-weight:500;">{{ $t('table.order.senderName') }}: </label>
            <el-input
              v-model="queryParams.senderName"
              :placeholder="$t('table.order.senderName')"
              class="filter-item search-item"
              clearable
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.order.senderPhone') }}: </label>
            <el-input
              v-model="queryParams.senderPhone"
              :placeholder="$t('table.order.senderPhone')"
              class="filter-item search-item"
              clearable
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.order.senderAddress') }}: </label>
            <el-cascader
              v-model="queryParams.senderAddress"
              size="large"
              :options="provinceAndCityData"
            />
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.order.receiverName') }}: </label>
            <el-input
              v-model="queryParams.receiverName"
              :placeholder="$t('table.order.receiverName')"
              class="filter-item search-item"
              clearable
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.order.receiverPhone') }}: </label>
            <el-input
              v-model="queryParams.receiverPhone"
              :placeholder="$t('table.order.receiverPhone')"
              class="filter-item search-item"
              clearable
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.order.receiverAddress') }}: </label>
            <el-cascader
              v-model="queryParams.receiverAddress"
              size="large"
              :options="provinceAndCityData"
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
        v-has-permission="['order:add']"
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
        <el-table-column :label="$t('table.order.orderNo')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.order.transportNo')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.transportNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.order.orderTime')" align="center" prop="code" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('table.order.orderStatus')" :formatter="orderStatusFormater" />
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
        <el-table-column :label="$t('table.order.senderAddress')" :formatter="senderAddressFormater" align="center" prop="code" width="200" />
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
        <el-table-column :label="$t('table.order.receiverAddress')" :formatter="receiverAddressFormater" align="center" prop="code" width="200" />
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
      <order-edit
        ref="edit"
        :dialog-visible="dialog.isVisible"
        :order-status-options="orderStatusOptions"
        :order-type-options="orderTypeOptions"
        :pay-status-options="payStatusOptions"
        :type="dialog.type"
        @close="editClose"
        @success="editSuccess"
      />
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import OrderEdit from './Edit'
import orderApi from '@/api/Order.js'
import { provinceAndCityData, codeToText } from 'element-china-area-data'

export default {
  name: 'RoleManage',
  components: { Pagination, OrderEdit },
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
      orderTypeOptions: [],
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
      orderApi.page(params).then(response => {
        const res = response.data
        this.loading = false
        console.log(res.data)
        this.tableData = res.data
      })
    },
    handleEdit(row) {
      // console.log(row)
      this.$refs.edit.setOrder(row)
      this.dialog.type = 'edit'
      this.dialog.isVisible = true
    },
    handleAdd() {
      this.$refs.edit.initOrder()
      this.dialog.type = 'add'
      this.dialog.isVisible = true
    },
    initOptions() {
      /**
     * 订单状态: 23000为待取件,23001为已取件，23002为网点自寄，23003为网点入库，
     * 23004为待装车，23005为运输中，23006为网点出库，23007为待派送，23008为派送中，
     * 23009为已签收，23010为拒收，230011为已取消
     */
      this.orderStatusOptions = [
        {
          label: '待取件',
          value: 23000
        },
        {
          label: '已取件',
          value: 23001
        },
        {
          label: '网点自寄',
          value: 23002
        },
        {
          label: '网点入库',
          value: 23003
        },
        {
          label: '待装车',
          value: 23004
        },
        {
          label: '运输中',
          value: 23005
        },
        {
          label: '网点出库',
          value: 23006
        },
        {
          label: '待派送',
          value: 23007
        },
        {
          label: '派送中',
          value: 23008
        },
        {
          label: '已签收',
          value: 23009
        },
        {
          label: '拒收',
          value: 23010
        },
        {
          label: '已取消',
          value: 23011
        }
      ]
      /**
     * 订单类型，1为同城订单，2为城际订单
     */
      this.orderTypeOptions = [
        {
          label: '同城订单',
          value: 1
        },
        {
          label: '城际订单',
          value: 2
        }
      ]
      this.payStatusOptions = [
        {
          label: '未支付',
          value: 1
        },
        {
          label: '已支付',
          value: 2
        }
      ]
    },
    /**
     * 订单状态: 23000为待取件,23001为已取件，23002为网点自寄，23003为网点入库，
     * 23004为待装车，23005为运输中，23006为网点出库，23007为待派送，23008为派送中，
     * 23009为已签收，23010为拒收，230011为已取消
     */
    orderStatusFormater(row, column) {
      if (row.status === 23000) {
        return '待取件'
      } else if (row.status === 23001) {
        return '已取件'
      } else if (row.status === 23002) {
        return '网点自寄'
      } else if (row.status === 23003) {
        return '网点入库'
      } else if (row.status === 23004) {
        return '待装车'
      } else if (row.status === 23005) {
        return '运输中'
      } else if (row.status === 23006) {
        return '网点出库'
      } else if (row.status === 23007) {
        return '待派送'
      } else if (row.status === 23008) {
        return '派送中'
      } else if (row.status === 23009) {
        return '已签收'
      } else if (row.status === 23010) {
        return '拒收'
      } else if (row.status === 23011) {
        return '已取消'
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

