<template>
  <div class="app-container">
    <div style="margin: 40px;" />
    <el-form :inline="true" :label-position="labelPosition" label-width="80px" :model="formdata">
      <el-row>
        <el-col :span="5">
          <el-form-item :inline="true" :label="$t('table.deliverapp.id')">
            <el-input v-model="formdata.id" :placeholder="$t('table.deliverapp.searchid')" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('table.deliverapp.taskType')">
            <el-select v-model="formdata.taskType" :placeholder="$t('table.deliverapp.searchtaskType')">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('table.deliverapp.status')">
            <el-select v-model="formdata.status" :placeholder="$t('table.deliverapp.searchstatus')">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('table.deliverapp.signStatus')">
            <el-select v-model="formdata.signStatus" :placeholder="$t('table.deliverapp.searchsignStatus')">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="margin:5px 30px">
      <!-- <el-button
        v-has-permission="['order:add']"
        style="background-color: #8dc149;color: #fff;border-radius: 5px;border-color: #DCDFE6;"
        @click="handleAdd()"
      >
        {{ $t('table.add') }}
      </el-button> -->
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
        v-if="!loading"
        ref="table"
        v-loading="loading"
        :data="tableData.records"
        :header-cell-style="{background:'#FCFBFF',border:'0'}"
        fit
        style="width: 100%;"
      >
        <el-table-column :formatter="taskTypeFormatter" label="任务类型" />
        <el-table-column :formatter="statusFormatter" label="任务状态" />
        <el-table-column :formatter="senderAddressFormater" label="发件人地址" />
        <el-table-column prop="order.senderName" label="发件人姓名" />
        <el-table-column prop="order.senderPhone" label="发件人电话" />
        <el-table-column :formatter="receiverAddressFormater" label="收件人地址" />
        <el-table-column prop="order.receiverName" label="收件人姓名" />
        <el-table-column prop="order.receiverPhone" label="收件人电话" />
        <el-table-column :formatter="signStatusFormatter" label="签收状态" />
        <!-- <el-table-column prop="agencyId" label="网点ID" /> -->
        <el-table-column prop="estimatedStartTime" label="预计开始时间" />
        <el-table-column prop="actualStartTime" label="实际开始时间" />
        <el-table-column prop="estimatedEndTime" label="预计完成时间" />
        <el-table-column prop="actualEndTime" label="实际完成时间" />
        <el-table-column prop="confirmTime" label="确认时间" />
        <el-table-column prop="cancelTime" label="取消时间" />
        <!-- <el-table-column prop="assignedStatus" label="任务分配状态" /> -->
        <el-table-column prop="mark" label="备注" />
        <el-table-column prop="createTime" label="任务创建时间" />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.taskType==1&&scope.row.status!=4&&scope.row.status!=5" type="text" size="small" @click="handleTask(scope.row)">
              确认已取件
            </el-button>
            <el-button v-if="scope.row.taskType==2&&scope.row.status!=4&&scope.row.status!=5" type="text" size="small" @click="handleTask(scope.row)">
              确认已派送
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
    </el-card>
  </div>
</template>

<script>
import pickupDispatchApi from '@/api/PickupDispatch'
import orderApi from '@/api/Order'
import Pagination from '@/components/Pagination'
import { provinceAndCityData, codeToText } from 'element-china-area-data'

export default {
  components: { Pagination },
  data() {
    return {
      provinceAndCityData,
      codeToText,
      viewtype: 1,
      labelPosition: 'right',
      formdata: {
        id: '',
        taskType: '',
        courierId: ''
      },
      loading: true,
      tableData: {
        total: 0
      },
      pagination: {
        size: 10,
        current: 1
      },
      /**
     * 任务类型，1为取件任务，2为派件任务
     */
      options: [
        {
          value: 1,
          label: '取件任务'
        },
        {
          value: 2,
          label: '派件任务'
        }
      ]
    }
  },
  // watch: {
  //   viewtype(newValue, oldValue) {
  //     if (newValue === 2) {
  //       // 在viewtype变为2时执行你的操作
  //       console.log('点击事件被触发')
  //     }
  //   }
  // },
  mounted() {
    this.fetch()
  },
  methods: {
    search() {
      this.fetch({
        ...this.formdata,
        ...this.pagination
      })
    },
    reset() {
      this.formdata = {}
      this.search()
    },
    add() {
      this.dialog.type = 'add'
      this.dialog.isVisible = true
      this.$refs.edit.setTransportlineType({})
    },
    fetch(params = {}) {
      const that = this // 存储this
      // console.log(this.$store.state.account.user.id)
      that.loading = true
      params.pageSize = this.pagination.size
      params.page = this.pagination.current
      // TODO按快递员的id获取订单
      // params.courierId = this.$store.state.account.user.id
      pickupDispatchApi.findByPage(params).then(response => {
        const res = response.data
        console.log(res)
        that.tableData = res.data
        for (let i = 0; i < that.tableData.records.length; i++) {
          that.tableData.records[i].order = {}
          orderApi.findbyid(that.tableData.records[i].orderId).then(response => {
            const res = response.data.data
            that.tableData.records[i].order = res
            if (i === that.tableData.records.length - 1) that.loading = false
          })
        }
      })
      // this.loading = false
    },
    senderAddressFormater(row, column) {
      return codeToText[row.order.senderProvinceId] + codeToText[row.order.senderCityId] + codeToText[row.order.senderCountyId] + row.order.senderAddress
    },
    receiverAddressFormater(row, column) {
      return codeToText[row.order.receiverProvinceId] + codeToText[row.order.receiverCityId] + codeToText[row.order.receiverCountyId] + row.order.receiverAddress
    },
    taskTypeFormatter(row, column) {
      if (row.taskType === 1) {
        return '取件任务'
      } else if (row.taskType === 2) {
        return '派件任务'
      }
    },
    statusFormatter(row, column) {
      /**
     * 任务状态，1为待执行（对应 待上门和须交接）、2为进行中（该状态暂不使用，属于保留状态）、3为待确认（对应 待妥投和须交件）、4为已完成、5为已取消
     */
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
      }
    },
    signStatusFormatter(row, column) {
      /**
     * 签收状态，1为未签收、2为已签收、3为拒签
     */
      if (row.signStatus === 1) {
        return '未签收'
      } else if (row.signStatus === 2) {
        return '已签收'
      } else if (row.signStatus === 3) {
        return '拒签'
      }
    },
    handleTask(row) {
      if (row.taskType === 1) {
        this.$confirm('确认已取件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          pickupDispatchApi.update({
            id: row.id,
            status: 4,
            actualEndTime: this.getTimeNow()
          }).then(response => {
            const res = response.data
            if (res.isSuccess) {
              this.$message({
                message: this.$t('tips.editSuccess'),
                type: 'success'
              })
              this.fetchData()
            } else {
              this.$message.error(res.message)
            }
          }).catch((response) => { // 失败
            if (response === 'cancel') {
              this.$message.warning('已取消')
            }
          })
        })
      } else if (row.taskType === 2) {
        this.$confirm('确认已派送?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          pickupDispatchApi.update({
            id: row.id,
            status: 4,
            actualEndTime: this.getTimeNow()
          }).then(response => {
            const res = response.data
            if (res.isSuccess) {
              this.$message({
                message: this.$t('tips.editSuccess'),
                type: 'success'
              })
              this.fetchData()
            } else {
              this.$message.error(res.message)
            }
          }).catch((response) => { // 失败
            if (response === 'cancel') {
              this.$message.warning('已取消')
            }
          })
        })
      }
    },
    getTimeNow() {
      // 获取当前时间
      var currentDate = new Date()

      // 格式化日期
      var year = currentDate.getFullYear()
      var month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
      var day = ('0' + currentDate.getDate()).slice(-2)

      // 格式化时间
      var hours = ('0' + currentDate.getHours()).slice(-2)
      var minutes = ('0' + currentDate.getMinutes()).slice(-2)
      var seconds = ('0' + currentDate.getSeconds()).slice(-2)

      // 生成格式化的当前时间
      var formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
      return formattedTime
    }
  }
}
</script>

<style>

</style>
