<template>
  <div>
    <!-- 搜索表单 -->
    <el-form :model="searchForm" label-width="120px" @submit.native.prevent>
      <el-row>
        <el-col :span="12">
          <el-form-item label="任务分配状态">
            <el-select v-model="searchForm.assignedStatus" placeholder="请选择">
              <el-option v-for="item in assignedStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任务类型">
            <el-select v-model="searchForm.taskType" placeholder="请选择">
              <el-option v-for="item in taskTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

<!--      </el-row>-->
<!--      <el-row>-->
        <el-col :span="12">
          <el-form-item label="任务状态">
            <el-select v-model="searchForm.status" placeholder="请选择">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="签收状态">
            <el-select v-model="searchForm.signStatus" placeholder="请选择">
              <el-option v-for="item in signStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="search">
          搜索
        </el-button>
        <el-button @click="resetSearchForm">重置</el-button>
        <!-- 添加快递作业的按钮，点击后弹出添加对话框 -->
        <el-button type="primary" @click="handleAddWork">添加快递作业</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格显示 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="orderId" label="关联订单id" />
      <el-table-column label="任务类型">
        <template slot-scope="scope">
          <span>{{ getTaskTypeLabel(scope.row.taskType) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务状态">
        <template slot-scope="scope">
          <span>{{ getStatusLabel(scope.row.status) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务分配状态">
        <template slot-scope="scope">
          <span>{{ getAssignedStatusLabel(scope.row.assignedStatus) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="签收状态">
        <template slot-scope="scope">
          <span>{{ getSignStatusLabel(scope.row.signStatus) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="agencyName" label="网点名称" />
      <el-table-column prop="courierName" label="快递员" />
      <el-table-column prop="estimatedStartTime" label="预计开始时间" />
      <el-table-column prop="actualStartTime" label="实际开始时间" />
      <el-table-column prop="estimatedEndTime" label="预计完成时间" />
      <el-table-column prop="actualEndTime" label="实际完成时间" />
      <el-table-column prop="confirmTime" label="确认时间" />
      <el-table-column prop="cancelTime" label="取消时间" />
      <el-table-column prop="mark" label="备注" />
      <el-table-column prop="createTime" label="任务创建时间" />
<!--      添加分配快递员按钮  -->
<!--      <el-table-column label="分配快递员">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="primary" size="mini" @click="handleAssignCourier(scope.row)">分配快递员</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      编辑操作   -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="pagination.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog
      title="添加快递作业"
      :visible.sync="addExpressWorkDialogVisible"
      width="80%"
      :before-close="resetAddExpressWorkForm">

      <el-form :model="newExpressWorkForm" label-width="120px">

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="关联订单id">
              <el-input v-model="newExpressWorkForm.orderId" placeholder="请输入关联订单id" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务类型">
              <el-select v-model="newExpressWorkForm.taskType" placeholder="请选择">
                <el-option v-for="item in taskTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="任务状态">
              <el-select v-model="newExpressWorkForm.status" placeholder="请选择">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务分配状态">
              <el-select v-model="newExpressWorkForm.assignedStatus" placeholder="请选择">
                <el-option v-for="item in assignedStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="签收状态">
              <el-select v-model="newExpressWorkForm.signStatus" placeholder="请选择">
                <el-option v-for="item in signStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
<!--            下拉框选择网点     -->
            <el-form-item label="网点">
<!--              网点为树状态结构，数据存在orgList当中    -->
              <el-select v-model="newExpressWorkForm.agencyId" placeholder="请选择">
                <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
<!--            下拉框选择快递员    -->
            <el-form-item label="快递员">
              <el-select v-model="newExpressWorkForm.courierId" placeholder="请选择">
                <el-option v-for="item in courierList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计开始时间">
              <el-date-picker
                v-model="dateStore.estimatedStartTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="实际开始时间">
<!--              pattern = "yyyy-MM-dd HH:mm:ss"  -->
              <el-date-picker
                v-model="dateStore.actualStartTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计完成时间">
              <el-date-picker
                v-model="dateStore.estimatedEndTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="实际完成时间">
              <el-date-picker
                v-model="dateStore.actualEndTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认时间">
              <el-date-picker
                v-model="dateStore.confirmTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="取消时间">
              <el-date-picker
                v-model="dateStore.cancelTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input v-model="newExpressWorkForm.mark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="addExpressWork">保存</el-button>
          <el-button type="primary" @click="quitAddExpressWork">取消</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

  </div>
</template>

<script>
// import axios from 'axios' // assuming you have axios installed
import AxiosApi from '@/api/AxiosApi'
import moment from 'moment'
import menuApi from '@/api/Menu'
import orgApi from '@/api/Org'
export default {
  data() {
    return {
      searchForm: {
        courierId: '',
        assignedStatus: null,
        taskType: null,
        status: null,
        signStatus: null
      },
      tableData: [],
      taskTypeOptions: [ // the options for task type dropdown
        { value: 1, label: '取件任务' },
        { value: 2, label: '派件任务' }
      ],
      statusOptions: [ // the options for status dropdown
        { value: 1, label: '待执行' },
        { value: 2, label: '进行中' },
        { value: 3, label: '进行中' },
        { value: 4, label: '已完成' },
        { value: 5, label: '已取消' }
      ],
      assignedStatusOptions: [ // the options for assigned status dropdown
        { value: 1, label: '未分配' },
        { value: 2, label: '已分配' },
        { value: 3, label: '待人工分配' }
      ],
      signStatusOptions: [ // the options for sign status dropdown
        { value: 1, label: '已签收' },
        { value: 2, label: '拒收' }
      ],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      dateStore: {
        estimatedStartTime: '',
        actualStartTime: '',
        estimatedEndTime: '',
        actualEndTime: '',
        confirmTime: '',
        cancelTime: ''
      },
      // eslint-disable-next-line vue/no-dupe-keys
      newExpressWorkForm: {
        id: '',
        courierId: '',
        assignedStatus: '',
        taskType: '',
        status: '',
        signStatus: '',
        agencyId: '',
        estimatedStartTime: '',
        actualStartTime: '',
        estimatedEndTime: '',
        actualEndTime: '',
        confirmTime: '',
        cancelTime: '',
        mark: ''
      },
      blankForm: {
        id: '',
        courierId: '',
        assignedStatus: '',
        taskType: '',
        status: '',
        signStatus: '',
        agencyId: '',
        estimatedStartTime: '',
        actualStartTime: '',
        estimatedEndTime: '',
        actualEndTime: '',
        confirmTime: '',
        cancelTime: '',
        mark: ''
      },
      addExpressWorkDialogVisible: false,
      agencyIdOptions: [],
      orgList: null,
      orgMap: {},
      courierList: [{
        id: '12341324124',
        name: '张三'
      }, {
        id: '3214132432',
        name: '李四'
      }, {
        id: '12344124',
        name: '王五'
      }],
      courierMap: {
        '12341324124': '张三',
        '3214132432': '李四',
        '12344124': '王五'
      }
    }
  },
  watch: {

  },
  created() {
    this.search()
  },
  methods: {
    getTaskTypeLabel(taskType) {
      const taskTypeOption = this.taskTypeOptions.find(option => option.value === taskType)
      return taskTypeOption ? taskTypeOption.label : '未知任务类型'
    },
    getStatusLabel(status) {
      const statusOption = this.statusOptions.find(option => option.value === status)
      return statusOption ? statusOption.label : '未知状态'
    },
    getAssignedStatusLabel(assignedStatus) {
      const assignedStatusOption = this.assignedStatusOptions.find(option => option.value === assignedStatus)
      return assignedStatusOption ? assignedStatusOption.label : '未知分配状态'
    },
    getSignStatusLabel(signStatus) {
      const signStatusOption = this.signStatusOptions.find(option => option.value === signStatus)
      return signStatusOption ? signStatusOption.label : '未知签收状态'
    },
    search() {
      // axios.post('/api/work/page', {
      //   ...this.searchForm,
      //   pageNum: this.pagination.currentPage,
      //   pageSize: this.pagination.pageSize
      // }).then(response => {
      //   if (response.data.code === 200) {
      //     this.tableData = response.data.data.records
      //     this.pagination.total = response.data.data.total
      //   } else {
      //     this.$message.error('获取数据失败')
      //   }
      // })
      orgApi.list().then(response => {
        if (response.data.code === 0) {
          this.orgList = response.data.data
          this.orgMap = new Map()
          this.orgList.forEach(item => {
            this.agencyIdOptions.push({
              value: item.id,
              label: item.name
            })
            this.orgMap.set(item.id, item.name)
          })
          AxiosApi({
            url: '/work/pickup-dispatch-task/page',
            method: 'post',
            data: {
              ...this.searchForm,
              pageNum: this.pagination.page,
              pageSize: this.pagination.pageSize
            }
          }).then(response => {
            console.log(response)
            if (response.data.code === 0) {
              this.tableData = response.data.data.records
              this.pagination.total = +response.data.data.total
              //   对tableData中插入agencyName
              this.tableData.forEach(item => {
                item.agencyName = this.orgMap.get(item.agencyId)
                item.courierName = this.courierMap[item.courierId]
              })
            } else {
              this.$message.error('获取数据失败')
            }
          })
        } else {
          this.$message.error('获取数据失败')
        }
      })
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.search()
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.search()
    },
    resetSearchForm() {
      this.searchForm = {
        courierId: '',
        assignedStatus: null,
        taskType: null,
        status: null,
        signStatus: null
      }
      this.search()
    },
    addExpressWork() {
      // 将dateStore中的数据转化为Date格式并放入到newExpressWorkForm中
      for (const key in this.dateStore) {
        if (this.dateStore.hasOwnProperty(key)) {
          this.newExpressWorkForm[key] = this.dateStore[key] ? moment(this.dateStore[key]).format('YYYY-MM-DD HH:mm:ss') : ''
        }
      }
      console.log(this.newExpressWorkForm)
      AxiosApi({
        url: '/work/pickup-dispatch-task/addOrder',
        method: 'post',
        data: this.newExpressWorkForm
      }).then(response => {
        if (response.data.code === 0) {
          this.$message.success('添加成功')
          this.addExpressWorkDialogVisible = false
          this.search()
        } else {
          this.$message.error('添加失败')
        }
      })
    },
    quitAddExpressWork() {
      this.addExpressWorkDialogVisible = false
    },
    handleEdit(row) {
      this.addExpressWorkDialogVisible = true
      this.newExpressWorkForm = row
      //   更新dataStore中数据
      for (const key in this.dateStore) {
        if (this.dateStore.hasOwnProperty(key)) {
        //   转化为Date格式
          this.dateStore[key] = this.newExpressWorkForm[key] ? moment(this.newExpressWorkForm[key], 'YYYY-MM-DD HH:mm:ss').toDate() : ''
        }
      }
    },
    handleAddWork() {
      this.addExpressWorkDialogVisible = true
      this.newExpressWorkForm = this.blankForm
    },
    resetAddExpressWorkForm() {
      console.log(this.newExpressWorkForm)
      this.newExpressWorkForm = this.blankForm
      this.addExpressWorkDialogVisible = false
    },
    getCourierList() {
      // AxiosApi({
      //   url: '/authority/user/courier/listByStationId/?stationId=' + this.newExpressWorkForm.agencyId,
      //   method: 'get',
      // }).then(response => {
      //   console.log("con:  ", response)
      //   if (response.data.code === 0) {
      //     this.$message.success('查询成功')
      //     //   将查询到的数据放入courierList中
      //     const tmp = []
      //     response.data.data.forEach(item => {
      //       tmp.push({
      //         value: item.id,
      //         label: item.name
      //       })
      //     })
      //     this.courierList = tmp
      //     console.log("courier", this.courierList)
      //   } else {
      //     this.$message.error('查询失败')
      //   }
      // })
    }
  }
}
</script>
