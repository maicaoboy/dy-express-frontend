<template>
  <div class="app-container">
    <div class="filter-container">
      <label style="color:#909399;font-weight:500;">操作人：</label>
      <el-input
        v-model="queryParams.userName"
        :placeholder="$t('table.optLog.userName')"
        class="filter-item search-item"
        clearable
      />
      <label style="color:#909399;font-weight:500;">IP：</label>
      <el-input
        v-model="queryParams.requestIp"
        :placeholder="$t('table.optLog.requestIp')"
        class="filter-item search-item"
        clearable
      />
      <label style="color:#909399;font-weight:500;">创建时间：</label>
      <el-date-picker
        v-model="queryParams.timeRange"
        :range-separator="null"
        :start-placeholder="$t('table.createTime')"
        class="filter-item search-item date-range-item"
        format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        style="width:300px;"
        value-format="yyyy-MM-dd HH:mm:ss"
      />
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
      <el-dropdown
        v-has-any-permission="['optLog:delete','optLog:export']"
        class="filter-item"
        trigger="click"
      >
        <el-button
          style="height:40px;margin-top:6px;background-color: #fff;color: #606266;border-color: #DCDFE6"
        >
          {{ $t('table.more') }}
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-has-permission="['optLog:delete']"
            @click.native="batchDelete"
          >
            {{ $t('table.delete') }}
          </el-dropdown-item>
          <el-dropdown-item
            v-has-permission="['optLog:export']"
            @click.native="exportExcel"
          >
            {{ $t('table.export') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
        @filter-change="filterChange"
        @selection-change="onSelectChange"
        @sort-change="sortChange"
      >
        <el-table-column align="center" type="selection" width="40px" />
        <el-table-column
          :label="$t('table.optLog.userName')"
          :show-overflow-tooltip="true"
          align="center"
          prop="userName"
          width="100px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.optLog.requestUri')"
          :show-overflow-tooltip="true"
          align="left"
          min-width="120px"
          prop="requestUri"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.requestUri }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :filter-multiple="false"
          :filters="httpMethodFilters"
          :label="$t('table.optLog.httpMethod')"
          :show-overflow-tooltip="true"
          align="center"
          column-key="httpMethod"
          prop="httpMethod"
          width="100px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.httpMethod.desc }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.optLog.requestIp')"
          :show-overflow-tooltip="true"
          align="center"
          prop="requestIp"
          width="100px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.requestIp }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.optLog.description')"
          :show-overflow-tooltip="true"
          align="center"
          min-width="100px"
          prop="description"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>

        <el-table-column
          :filter-multiple="false"
          :filters="typeFilters"
          :label="$t('table.optLog.type')"
          :show-overflow-tooltip="true"
          align="center"
          column-key="type"
          prop="type"
          width="80px"
        >
          <template slot-scope="scope">
            <span>
              <el-badge
                :type="(scope.row.type && scope.row.type.code == 'OPT')? 'success':'danger' "
                class="item"
                is-dot
              />
              {{ scope.row.type.desc }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.optLog.actionMethod')"
          :show-overflow-tooltip="true"
          align="center"
          min-width="120px"
          prop="actionMethod"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.classPath + '.' + scope.row.actionMethod }}</span>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('table.optLog.startTime')"
          :show-overflow-tooltip="true"
          align="center"
          prop="startTime"
          sortable="custom"
          width="170px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.startTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.optLog.consumingTime')"
          :show-overflow-tooltip="true"
          align="center"
          prop="consumingTime"
          width="110px"
        >
          <template slot-scope="{row}">
            <el-tag :type="row.consumingTime | timeFilter">
              {{ transTime(row.consumingTime) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :formatter="uaForamt" label="终端 | 浏览器" prop="ua" width="120" />
        <el-table-column
          :label="$t('table.operation')"
          align="center"
          class-name="small-padding fixed-width"
          width="110px"
        >
          <template slot-scope="{row}">
            <i
              v-has-permission="['optLog:delete']"
              style="color: #009EFF;"
              @click="singleDelete(row)"
            >修改</i>
            <el-divider direction="vertical" />
            <i v-has-permission="['optLog:view']" style="color: #009EFF;" @click="onView(row)">查看</i>
            <el-link
              v-has-no-permission="['optLog:delete','optLog:view']"
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
    </el-card>

    <el-drawer
      v-model="currentRow"
      :before-close="closeDrawer"
      :visible.sync="drawer"
      direction="rtl"
    >
      <div slot="title" class="clearfix">
        <el-badge
          :type="(currentRow.type && currentRow.type.code == 'OPT')? 'success':'danger' "
          class="item"
          is-dot
        />
        {{ currentRow.type ? currentRow.type.desc : '' }}
        {{ currentRow.requestUri }}
      </div>
      <el-scrollbar style="height: 100%;">
        <el-card class="box-card">
          <div class="box-item">
            <span class="field-label">执行方法:</span>
            <aside>{{ currentRow.classPath + '.' + currentRow.actionMethod + '()' }}</aside>
          </div>

          <div class="box-item">
            <span class="field-label">请求参数:</span>
            <aside style>
              {{ currentRow.params }}
            </aside>
          </div>

          <div class="box-item">
            <span class="field-label">响应信息:</span>
            <aside style>
              <pre style="white-space: pre-wrap;">{{ currentRow.result ? JSON.stringify(JSON.parse(currentRow.result), null, 4) : '' }}</pre>
            </aside>
          </div>
          <div v-if="currentRow.type && currentRow.type['code']==='EX'" class="box-item">
            <span class="field-label">错误信息:</span>
            <aside>{{ currentRow.exDetail }}</aside>
          </div>
        </el-card>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { readUserAgent } from '@/utils/utils'
import optLogApi from '@/api/OptLog.js'

export default {
  name: 'OptLog',
  components: { Pagination },
  filters: {
    timeFilter(time) {
      if (time < 500) {
        return 'success'
      } else if (time < 1000) {
        return ''
      } else if (time < 1500) {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  },
  data() {
    return {
      tableKey: 0,
      loading: false,
      queryParams: {
        type: null,
        httpMethod: null
      },
      sort: {},
      selection: [],
      tableData: {},
      pagination: {
        size: 10,
        current: 1
      },
      drawer: false,
      currentRow: {}
    }
  },
  computed: {
    typeFilters() {
      return this.conver(this.$store.state.common.enums.LogType)
    },
    httpMethodFilters() {
      return this.conver(this.$store.state.common.enums.HttpMethod)
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    conver(obj) {
      const list = []
      if (obj) {
        for (const key in obj) {
          list.push({
            text: obj[key],
            value: key
          })
        }
      }
      return list
    },
    onSelectChange(selection) {
      this.selection = selection
    },
    exportExcel() {},
    // filterHttpMethod (value, row) {
    //   return row.httpMethod.code === value
    // },
    // filterStatus (value, row) {
    //   return row.type.code === value
    // },
    fetch(params = {}) {
      params.current = this.pagination.current
      params.size = this.pagination.size
      if (this.queryParams.timeRange) {
        params.startCreateTime = this.queryParams.timeRange[0]
        params.endCreateTime = this.queryParams.timeRange[1]
      }
      this.loading = true

      optLogApi.page(params).then(response => {
        const res = response.data
        this.loading = false
        this.tableData = res.data
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
          const logIds = this.selection.map(item => item.id)
          this.delete(logIds)
        })
        .catch(() => {
          this.clearSelections()
        })
    },
    clearSelections() {
      this.$refs.table.clearSelection()
    },
    delete(logIds) {
      optLogApi.delete({ ids: logIds }).then(response => {
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
    transTime(time) {
      return `${time} ms`
    },
    sortChange(val) {
      this.sort.field = val.prop
      this.sort.order = val.order
      this.search()
    },
    filterChange(filters) {
      for (const key in filters) {
        this.queryParams[key] = filters[key][0]
      }
      this.search()
    },
    onView(row) {
      this.currentRow = row
      this.drawer = true
    },
    closeDrawer(done) {
      done()
      this.currentRow = {}
    },
    uaForamt(row) {
      const ua = readUserAgent(row.ua)
      return ua.terminal + '  |  ' + ua.browser
    }
  }
}
</script>
<style lang="scss">
.el-table {
  border: 1px solid #f7f6f9;
}
.el-table tr,
.el-table td {
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #f7f6f9;
}
.item {
  margin-top: 7px;
}
.drawer-item {
  margin-top: 6px;
}
.box-item {
  margin-top: 15px;
  aside {
    word-wrap: break-word;
    margin-top: 15px;
  }
  pre {
    white-space: pre-wrap;
    font-size: 0.8em;
    line-height: 1.5em;
  }
}
</style>
