<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.truck.truckNumber') }}: </label>
            <el-input
              v-model="queryParams.licensePlate"
              :placeholder="$t('table.truck.truckNumber')"
              class="filter-item search-item"
              clearable
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <label style="color:#909399;font-weight:500;">{{ $t('table.goodsType.truckType') }}</label>
            <template>
              <el-select v-model="queryParams.truckTypeId" :placeholder="$t('table.select')">
                <el-option
                  v-for="item in truckTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </div>
        </el-col>
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
      </el-row>
    </div>
    <el-card shadow="never" style="margin-top: 10px;">
      <el-button
        class="addtype-button"
        style="background-color: #8dc149;color: #fff;border-radius: 5px;border-color: #DCDFE6;"
        @click="add"
      >
        {{ $t('table.truck.add') }}
      </el-button>
      <el-table
        :key="tableKey"
        ref="table"
        v-loading="loading"
        :data="tableData.items"
        :header-cell-style="{background:'#FCFBFF',border:'0'}"
        fit
        style="width: 100%;"
      >
        <el-table-column
          type="index"
          :label="$t('table.serial')"
          align="center"
        />
        <!--车辆编号-->
        <el-table-column
          prop="id"
          :label="$t('table.truck.truckid')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <!--车牌号码-->
        <el-table-column
          prop="name"
          :label="$t('table.truck.truckNumber')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.licensePlate }}</span>
          </template>
        </el-table-column>
        <!--车牌品牌-->
        <el-table-column
          prop="name"
          :label="$t('table.truck.brand')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.brand }}</span>
          </template>
        </el-table-column>
        <!--车量类型-->
        <el-table-column
          prop="name"
          :label="$t('table.truck.truckType')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.truckTypeName }}</span>
          </template>
        </el-table-column>
        <!--准载重量-->
        <el-table-column
          prop="name"
          :label="$t('table.truck.allowableLoad')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.allowableLoad }}</span>
          </template>
        </el-table-column>
        <!--准载体积-->
        <el-table-column
          prop="name"
          :label="$t('table.truck.allowableVolume')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.allowableVolume }}</span>
          </template>
        </el-table-column>
        <!--车次编号-->
        <el-table-column
          prop="name"
          :label="$t('table.truck.tripid')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
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
              @click="edit(scope.$index, scope.row)"
            >
              查看详情
            </el-button>
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
        :total="Number(tableData.counts)"
        @pagination="fetch"
      />
      <edit-form
        ref="edit"
        :is-visible="dialog.isVisible"
        :type="dialog.type"
        :truck-type-options="truckTypeOptions"
        @close="editClose"
        @handelAdd="handelAdd"
      />
    </el-card>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import TruckApi from '@/api/Truck'
import TruckTypeApi from '@/api/TruckType'
import EditForm from '@/views/dy/base/trucks/EditForm.vue'
export default {
  name: 'TruckIndex',
  components: {
    EditForm,
    Pagination
  },
  data() {
    return {
      tableKey: 0,
      pagination: {
        size: 10,
        current: 1
      },
      loading: false,
      tableData: {
        items: [],
        total: 0
      },
      sort: {},
      queryParams: {},
      truckTypeOptions: [],
      dialog: {
        isVisible: false,
        type: 'add'
      }
    }
  },
  created() {
    this.inittruckTypeOptions()
    this.$nextTick(() => {
      this.fetch()
    })
  },
  methods: {
    fetch(params = {}) {
      this.loading = true
      params.pageSize = this.pagination.size
      params.page = this.pagination.current
      // console.log(params)
      TruckApi.page(params).then(response => {
        const res = response.data
        this.loading = false
        this.tableData = res
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
    add() {
      this.dialog.type = 'add'
      this.dialog.isVisible = true
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除id为：' + row.id + '的车辆数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          TruckApi.delete(row.id).then(response => {
            const res = response.data
            if (res.msg === 'success') {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.search()
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          })
        })
        .catch(() => {})
    },
    handelAdd(truck) {
      TruckApi.save(truck).then(response => {
        const res = response.data
        if (res.isSuccess) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.dialog.isVisible = false
          this.search()
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    editClose() {
      this.dialog.isVisible = false
    },
    inittruckTypeOptions() {
      const params = {}
      params.page = 1
      params.pageSize = 10
      TruckTypeApi.page(params).then(response => {
        const res = response.data
        // 将res.item()数组中的每个对象的id和name属性取出来，组成一个新的数组
        this.truckTypeOptions = res.items.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
      })
    }
  }
}
</script>
