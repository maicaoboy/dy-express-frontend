<template>
  <div class="app-container">
    <div class="filter-container">
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.orderNo') }}</label>
      <el-input
        v-model="queryParams.orderNo"
        :placeholder="$t('table.order.orderNo')"
        class="filter-item search-item"
        clearable
      />
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.orderStatus') }}</label>
      <template>
        <el-select v-model="queryParams.orderStatus" placeholder="$t('table.select')">
          <el-option
            v-for="item in orderStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.payStatus') }}</label>
      <template>
        <el-select v-model="queryParams.payStatus" placeholder="$t('table.select')">
          <el-option
            v-for="item in payStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.senderName') }}</label>
      <el-input
        v-model="queryParams.senderName"
        :placeholder="$t('table.order.senderName')"
        class="filter-item search-item"
        clearable
      />
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.senderPhone') }}</label>
      <el-input
        v-model="queryParams.senderPhone"
        :placeholder="$t('table.order.senderPhone')"
        class="filter-item search-item"
        clearable
      />
      <!-- TODO地址级联查询 -->
      <!-- <label style="color:#909399;font-weight:500;">{{ $t('table.order.senderAddress') }}</label> -->

      <label style="color:#909399;font-weight:500;">{{ $t('table.order.receverName') }}</label>
      <el-input
        v-model="queryParams.receverName"
        :placeholder="$t('table.order.receverName')"
        class="filter-item search-item"
        clearable
      />
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.receverPhone') }}</label>
      <el-input
        v-model="queryParams.receverPhone"
        :placeholder="$t('table.order.receverPhone')"
        class="filter-item search-item"
        clearable
      />
      <!-- // TODO地址级联查询
      <label style="color:#909399;font-weight:500;">{{ $t('table.order.receiverAddress') }}</label> -->

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
        :key="tableKey"
        ref="table"
        v-loading="loading"
        :data="tableData.records"
        :header-cell-style="{background:'#FCFBFF',border:'0'}"
        fit
        style="width: 100%;"
        @selection-change="onSelectChange"
        @sort-change="sortChange"
      >
        <el-table-column type="index" width="50" :label="$t('table.serial')" />
        <el-table-column :label="$t('table.order.orderNo')" align="center" prop="code" width="200px">
          <template slot-scope="scope">
            <span>{{ scope.row.orderNo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.order.orderTime')"
          :show-overflow-tooltip="true"
          align="center"
          prop="name"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.role.describe')"
          :show-overflow-tooltip="true"
          align="center"
          prop="describe"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.describe }}</span>
          </template>
        </el-table-column>
        <!--
          <el-table-column :label="$t('table.role.dsType')" align="center" width="100px">
            <template slot-scope="scope">
              <span>{{ scope.row.dsType.desc }}</span>
            </template>
          </el-table-column>
          -->
        <el-table-column :label="$t('table.role.readonly')" align="center" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.readonly ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :filter-method="filterStatus"
          :filters="[{ text: $t('common.status.valid'), value: true }, { text: $t('common.status.invalid'), value: false }]"
          :label="$t('table.role.status')"
          class-name="status-col"
          width="70px"
        >
          <template slot-scope="{row}">
            <el-tag
              :type="row.status | statusFilter"
            >
              {{ row.status ? $t('common.status.valid') : $t('common.status.invalid') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.createTime')"
          align="center"
          prop="createTime"
          sortable="custom"
          width="160px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.operation')"
          align="center"
          class-name="small-padding fixed-width"
          width="150px"
        >
          <template slot-scope="{row}">
            <i v-hasPermission="['role:update']" style="color:#009EFF;" @click="edit(row)">编辑</i>
            <el-divider direction="vertical" />
            <el-dropdown v-has-any-permission="['role:delete','role:auth','role:config']">
              <span class="el-dropdown-link" style="color:#009EFF;">
                {{ $t('table.more') }}
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-hasPermission="['role:delete']"
                  icon="el-icon-delete"
                  style="color: #8dc149;"
                  @click.native="singleDelete(row)"
                >
                  删除
                </el-dropdown-item>
                <el-dropdown-item
                  v-hasPermission="['role:auth']"
                  icon="el-icon-user"
                  style="color: #009EFF;"
                  @click.native="authUser(row)"
                >
                  授权
                </el-dropdown-item>
                <el-dropdown-item
                  v-hasPermission="['role:config']"
                  icon="el-icon-setting"
                  style="color: #009EFF;"
                  @click.native="authResource(row)"
                >
                  配置
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-link
              v-has-no-permission="['role:update','role:delete','role:auth','role:config']"
              class="no-perm"
            >
              {{ $t('tips.noPermission') }}
            </el-link>
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
      <role-edit
        ref="edit"
        :dialog-visible="dialog.isVisible"
        :type="dialog.type"
        @close="editClose"
        @success="editSuccess"
      />
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import RoleEdit from './Edit'
import roleApi from '@/api/Role.js'

export default {
  name: 'RoleManage',
  components: { Pagination, RoleEdit },
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
      orderStatusOptions: [],
      payStatusOptions: []
    }
  },
  computed: {},
  mounted() {
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
    onSelectChange(selection) {
      this.selection = selection
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
    exportExcel() {
      this.$message({
        message: '待完善',
        type: 'warning'
      })
    },
    singleDelete(row) {
      this.$refs.table.toggleRowSelection(row, true)
      this.batchDelete()
    },
    batchDelete() {
      if (!this.selection.length) {
        this.$message({
          message: this.$t('tips.noDataSelected'),
          type: 'warning'
        })
        return
      }
      this.$confirm(this.$t('tips.confirmDelete'), this.$t('common.tips'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      })
        .then(() => {
          const ids = []
          this.selection.forEach(u => {
            ids.push(u.id)
          })
          this.delete(ids)
        })
        .catch(() => {
          this.clearSelections()
        })
    },
    clearSelections() {
      this.$refs.table.clearSelection()
    },
    delete(ids) {
      roleApi.delete({ ids: ids }).then(response => {
        const res = response.data
        if (res.isSuccess) {
          this.$message({
            message: this.$t('tips.deleteSuccess'),
            type: 'success'
          })
        }
        this.search()
      })
    },
    add() {
      this.dialog.type = 'add'
      this.dialog.isVisible = true
      this.$refs.edit.setRole(false)
    },
    edit(row) {
      this.$refs.edit.setRole(row)
      this.dialog.type = 'edit'
      this.dialog.isVisible = true
    },
    fetch(params = {}) {
      this.loading = true
      params.size = this.pagination.size
      params.current = this.pagination.current
      if (this.queryParams.timeRange) {
        params.startCreateTime = this.queryParams.timeRange[0]
        params.endCreateTime = this.queryParams.timeRange[1]
      }
      roleApi.page(params).then(response => {
        const res = response.data
        this.loading = false
        this.tableData = res.data
      })
    },
    sortChange(val) {
      this.sort.field = val.prop
      this.sort.order = val.order
      this.search()
    },
    initOptions() {
      this.orderStatusOptions = [
        {
          label: '待取件',
          value: '0'
        },
        {
          label: '已取件',
          value: '1'
        },
        {
          label: '已取消',
          value: '2'
        }
      ]
      this.payStatusOptions = [
        {
          label: '未支付',
          value: '0'
        },
        {
          label: '已支付',
          value: '1'
        }
      ]
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

