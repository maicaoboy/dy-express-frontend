<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParams.receiver"
        :placeholder="$t('table.smsSendStatus.receiver')"
        class="filter-item search-item"
      />
      <el-input
        v-model="queryParams.bizId"
        :placeholder="$t('table.smsSendStatus.bizId')"
        class="filter-item search-item"
      />
      <el-input
        v-model="queryParams.ext"
        :placeholder="$t('table.smsSendStatus.ext')"
        class="filter-item search-item"
      />
      <el-button class="filter-item" plain type="primary" @click="search">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" plain type="warning" @click="reset">
        {{ $t('table.reset') }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      ref="table"
      v-loading="loading"
      :data="tableData.records"
      border
      fit
      style="width: 100%;"
      @filter-change="filterChange"
      @selection-change="onSelectChange"
      @sort-change="sortChange"
    >
      <el-table-column align="center" type="selection" width="40px" />
      <el-table-column
        :label="$t('table.smsSendStatus.receiver')"
        :show-overflow-tooltip="true"
        align="center"
        prop="receiver"
        width="120px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.receiver }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :filter-multiple="false"
        :filters="sendStatusFilters"
        :label="$t('table.smsSendStatus.sendStatus')"
        :show-overflow-tooltip="true"
        align="center"
        column-key="sendStatus"
        prop="sendStatus"
        width="100px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.sendStatus.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.smsSendStatus.bizId')"
        :show-overflow-tooltip="true"
        align="center"
        prop="bizId"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.bizId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.smsSendStatus.ext')"
        :show-overflow-tooltip="true"
        align="center"
        prop="ext"
        width="150px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.ext }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.smsSendStatus.code')"
        :show-overflow-tooltip="true"
        align="center"
        prop="code"
        width="120px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.smsSendStatus.message')"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.message }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.smsSendStatus.fee')" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.fee }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.createTime')"
        align="center"
        prop="createTime"
        sortable="custom"
        width="170px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
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
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import smsSendStatusApi from '@/api/SmsSendStatus.js'
import { converEnum } from '@/utils/utils'

export default {
  name: 'SmsSendStatusManage',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const map = {
        false: 'danger',
        true: 'success'
      }
      return map[status] || 'success'
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: {
        isVisible: false,
        type: 'add'
      },
      tableKey: 0,
      // total: 0,
      queryParams: {
        taskId: 0
      },
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
      }
    }
  },
  computed: {
    sendStatusFilters() {
      return converEnum(this.$store.state.common.enums.SendStatus)
    },
    isVisible: {
      get() {
        return this.dialogVisible
      },
      set() {
        // this.close()
        // this.reset()
      }
    }
  },
  mounted() {
    // this.fetch()
  },
  methods: {
    onSelectChange(selection) {
      this.selection = selection
    },
    search() {
      this.fetch({
        ...this.queryParams,
        ...this.sort
      })
    },
    setTaskId(taskId) {
      this.queryParams.taskId = taskId
      this.fetch({
        ...this.queryParams,
        ...this.sort
      })
    },
    reset() {
      const taskId = this.queryParams.taskId
      this.queryParams = { taskId: taskId }
      this.sort = {}
      this.$refs.table.clearSort()
      this.$refs.table.clearFilter()
      this.search()
    },
    clearSelections() {
      this.$refs.table.clearSelection()
    },
    fetch(params = {}) {
      this.loading = true
      params.size = this.pagination.size
      params.current = this.pagination.current
      smsSendStatusApi.page(params).then(response => {
        const res = response.data
        this.loading = false
        this.tableData = res.data
      })
    },
    sortChange(val) {
      this.sort.field = val.prop
      this.sort.order = val.order
      this.sort.transport = val.transport
      this.sort.transportTask = val.transportTask
      this.search()
    },
    filterChange(filters) {
      for (const key in filters) {
        this.queryParams[key] = filters[key][0]
      }
      this.search()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
