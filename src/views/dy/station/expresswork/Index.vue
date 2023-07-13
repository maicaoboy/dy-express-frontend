<template>
  <div>
    <!-- 搜索表单 -->
    <el-form :model="searchForm" label-width="120px" @submit.native.prevent>
      <el-form-item label="快递员ID">
        <el-input v-model="searchForm.courierId" placeholder="请输入快递员ID" />
      </el-form-item>
      <el-form-item label="任务分配状态">
        <el-select v-model="searchForm.assignedStatus" placeholder="请选择">
          <el-option v-for="item in assignedStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="任务类型">
        <el-select v-model="searchForm.taskType" placeholder="请选择">
          <el-option v-for="item in taskTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="任务状态">
        <el-select v-model="searchForm.status" placeholder="请选择">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="签收状态">
        <el-select v-model="searchForm.signStatus" placeholder="请选择">
          <el-option v-for="item in signStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">
          搜索
        </el-button>
        <el-button @click="resetSearchForm">重置</el-button>
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
      <el-table-column prop="agencyId" label="网点ID" />
      <el-table-column prop="courierId" label="快递员ID" />
      <el-table-column prop="estimatedStartTime" label="预计开始时间" />
      <el-table-column prop="actualStartTime" label="实际开始时间" />
      <el-table-column prop="estimatedEndTime" label="预计完成时间" />
      <el-table-column prop="actualEndTime" label="实际完成时间" />
      <el-table-column prop="confirmTime" label="确认时间" />
      <el-table-column prop="cancelTime" label="取消时间" />
      <el-table-column prop="mark" label="备注" />
      <el-table-column prop="createTime" label="任务创建时间" />
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="pagination.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
// import axios from 'axios' // assuming you have axios installed
import AxiosApi from '@/api/AxiosApi'
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
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
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
      AxiosApi({
        url: '/work/pickup-dispatch-task/page',
        method: 'post',
        data: {
          ...this.searchForm,
          pageNum: this.pagination.currentPage,
          pageSize: this.pagination.pageSize
        }
      }).then(response => {
        console.log(response)
        if (response.data.code === 0) {
          this.tableData = response.data.data.records
          this.pagination.total = +response.data.data.total
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
      this.pagination.currentPage = val
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
    }
  }
}
</script>
