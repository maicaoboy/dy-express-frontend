<template>
  <div class="app-container">
    <div style="margin: 20px;" />
    <el-form :inline="true" :label-position="labelPosition" label-width="80px" :model="formdata">
      <el-row>
        <el-col :span="8">
          <el-form-item :inline="true" :label="$t('table.transportline.lineNumber')">
            <el-input
              v-model="formdata.lineNumber"
              :placeholder="$t('table.transportline.searchlineNumber')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('table.transportline.name')">
            <el-input v-model="formdata.name" :placeholder="$t('table.transportline.searchname')" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('table.transportline.typeNumber')">
            <el-select
              v-model="formdata.agencyType"
              :placeholder="$t('table.transportline.searchtypeNumber')"
            >
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
      <el-button
        class="add-button"
        style="background-color: #8dc149;color: #fff;border-radius: 5px;border-color: #DCDFE6;"
        @click="handleAdd()"
      >
        {{ $t('table.transportline.add') }}
      </el-button>
      <el-table
        ref="table"
        v-loading="loading"
        :data="tableData.items"
        :header-cell-style="{background:'#FCFBFF',border:'0'}"
        fit
        style="width: 100%;"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @expand-change="expandSelect"
      >
        <el-table-column prop="children" label="ID" width="90" align="center" type="expand">
          <template slot-scope="props">
            <el-table v-if="props.row.children" :data="props.row.children" size="mini" style="width: 100%">
              <el-table-column prop="name" label="车次名称" />
              <el-table-column prop="departureTime" label="发车频次" />
              <el-table-column prop="estimatedTime" label="到达时间" />
              <el-table-column prop="oilGunCode" label="司机安排" />
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="handleEditTrip(scope.row)"
                  >
                    {{ $t('table.edit') }}
                  </el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="handleDeleteTrip(scope.row)"
                  >
                    {{ $t('table.delete') }}
                  </el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="handleArrangeTruck(scope.row)"
                  >
                    {{ $t('table.transportline.arrangetruck') }}
                  </el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="handleArrangeDrier(scope.row)"
                  >
                    {{ $t('table.transportline.arrangedriver') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <span v-else>{{ $t('table.loading') }}</span>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50" :label="$t('table.serial')" />
        <el-table-column prop="lineNumber" label="线路编号" />
        <el-table-column prop="name" label="线路名称" />
        <el-table-column label="起始机构" :formatter="orgFormater" align="center" prop="startAgencyId" />
        <el-table-column label="终点机构" :formatter="orgFormater" align="center" prop="endAgencyId" />
        <el-table-column label="距离(千米)" align="center" prop="distance" />
        <el-table-column label="平均成本(元)" align="center" prop="cost" />
        <el-table-column label="预计时间(分钟)" align="center" prop="estimatedTime" />
        <el-table-column label="线路地图" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="mapDialogVisibleHandle(scope.$index, scope.row)">
              地图
            </el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
            >
              {{ $t('table.edit') }}
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.row)"
            >
              {{ $t('table.delete') }}
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handleAddTrip(scope.row)"
            >
              {{ $t('table.transportline.addtrip') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="tableData.counts>0"
        :limit.sync="pagination.size"
        :page.sync="pagination.current"
        :total="Number(tableData.counts)"
        @pagination="fetch"
      />
      <transportline-edit
        ref="edit"
        :dialog-visible="dialog.isVisible"
        :transportlinetype-list="transportlinetypeList"
        :type="dialog.type"
        :org-list="orgList"
        @close="editClose"
        @success="editSuccess"
      />
      <trip-edit
        ref="tripEdit"
        :trip-edit-visible="dialog.isTripEditVisible"
        :type="dialog.type"
        :org-list="orgList"
        @close="editTripClose"
        @success="editSuccess"
      />
    </el-card>
    <el-dialog
      title="线路地图"
      :visible.sync="mapDialogVisible"
      width="1150px"
      :before-close="handleClose"
    >
      <template>
        <div>
          <baidu-map class="map" style="overflow:auto" center="北京" :zoom="16">
            <bm-driving :start="start" :end="end" :auto-viewport="true" :policy="BMAP_DRIVING_POLICY_LEAST_DISTANCE" :panel="true" location="北京" :waypoints="['西二旗']" />
          </baidu-map>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import transportlineApi from '@/api/transportline'
import transportlinetypeApi from '@/api/transportlinetype'
import transporttripApi from '@/api/transporttrip'
import Pagination from '@/components/Pagination'
import transportlineEdit from './Edit'
import tripEdit from './TripEdit'
import areaApi from '@/api/Area'

export default {
  components: { Pagination, transportlineEdit, tripEdit },
  data() {
    return {
      start: {
        lng: 116.301934,
        lat: 39.977552
      },
      end: {
        lng: 116.508328,
        lat: 39.919141
      },
      center: { lng: 0, lat: 0 },
      zoom: 3,
      mapDialogVisible: false,
      expands: [],
      getRowKeys(row) {
        return row.id
      },
      orgList: [],
      transportlinetypeList: [],
      dialog: {
        isVisible: false,
        isTripEditVisible: false,
        type: 'add'
      },
      labelPosition: 'right',
      formdata: {
        name: '',
        region: '',
        agencyType: ''
      },
      loading: false,
      tableData: {
        total: 0
      },
      pagination: {
        size: 10,
        current: 1
      },
      // '线路类型（FP001:分配线路 	ZX001:支线 GX001:干线）'
      options: [
        {
          value: 'FP001',
          label: '分配线路'
        },
        {
          value: 'ZX001',
          label: '支线'
        },
        {
          value: 'GX001',
          label: '干线'
        }
      ]
    }
  },
  mounted() {
    this.fetch({})
    // this.initMap()
  },
  methods: {
    mapDialogVisibleHandle(index, row) {
      var startAgencyId = this.orgList.find(item => item.id === row.startAgencyId).areaId
      var endAgencyId = this.orgList.find(item => item.id === row.endAgencyId).areaId

      console.log('row', endAgencyId, startAgencyId)
      areaApi.getByCode(startAgencyId).then(response => {
        const res = response.data
        console.log(res)
        this.start = {
          lng: res.data.lng,
          lat: res.data.lat
        }
      })
      areaApi.getByCode(endAgencyId).then(response => {
        const res = response.data
        console.log(res)
        this.end = {
          lng: res.data.lng,
          lat: res.data.lat
        }
      })
      this.mapDialogVisible = true
    },
    editClose() {
      this.dialog.isVisible = false
    },
    editTripClose() {
      this.dialog.isTripEditVisible = false
    },
    editSuccess() {
      this.search()
    },
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
      this.$refs.edit.settransportline({})
    },
    orgFormater(row, column, cellValue) {
      for (let i = 0; i < this.orgList.length; i++) {
        if (this.orgList[i].id === cellValue) {
          return this.orgList[i].name
        }
      }
    },
    fetch(params = {}) {
      const that = this // 存储this
      that.loading = true
      params.pageSize = this.pagination.size
      params.page = this.pagination.current
      transportlineApi.listOrg().then(response => {
        const res = response.data
        that.orgList = res.data
      })
      transportlinetypeApi.page({
        pageSize: 1000,
        page: 1
      }).then(response => {
        const res = response.data
        console.log(res)
        that.transportlinetypeList = res.items
      })

      transportlineApi.page(params).then(response => {
        const res = response.data
        that.loading = false
        that.tableData = res.data
      })
      // this.loading = false
    },
    handleEdit(row) {
      this.$refs.edit.initOptions()
      console.log(row)
      this.$refs.edit.settransportline(row)
      this.dialog.type = 'edit'
      this.dialog.isVisible = true
    },
    handleAdd() {
      this.$refs.edit.initOptions()
      this.$refs.edit.settransportline({})
      this.dialog.type = 'add'
      this.dialog.isVisible = true
    },
    handleDelete(row) {
      const that = this
      this.$confirm('此操作将永久删除该路线，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return transportlineApi.delete(row.id)
        })
        .then(response => {
          const res = response.data
          if (res.data) {
            that.$message({
              message: that.$t('tips.deleteSuccess'),
              type: 'success'
            })
            this.expands = []
          } else {
            that.$message.error(res.message)
          }
        })
        .catch(response => {
          // 失败
          if (response === 'cancel') {
            this.$message.warning('取消删除')
          }
        })
    },
    // rowClick(row) { // 点击行时展开收起
    //   this.$refs.table.toggleRowExpansion(row)
    // },
    // 当用户对某一行展开或者关闭的时候会触发该事件
    expandSelect(row, expandedRows) {
      console.log(row, expandedRows)
      const that = this
      this.tableData.items.forEach((item, index) => {
        // 2 清空很重要，不然会报错 key 错误
        this.tableData.items[index].children = []
        if (expandedRows.length) {
          this.expands = []
          if (row && item.id === row.id && item.children.length === 0) {
            transporttripApi.all({
              transportLineId: row.id
            }).then(response => {
              const res = response.data
              // console.log(res)
              that.tableData.items[index].children = res
              that.expands.push(row.id)// 只展开当前行
              that.$nextTick(() => {
                that.$refs.table.doLayout()
              })
            })
          }
        } else {
          this.expands = []
        }
      })
    },
    handleClose(done) {
      done()
    },
    handleAddTrip(row) {
      this.$refs.tripEdit.settransportrip({})
      this.$refs.tripEdit.settransportline(row)
      this.dialog.type = 'add'
      this.dialog.isTripEditVisible = true
    },
    handleEditTrip(row) {
      this.$refs.tripEdit.settransportrip(row)
      var line = this.tableData.items.find(item => item.id === row.transportLineId)
      console.log('line', row, this.transportlinetypeList)
      this.$refs.tripEdit.settransportline(line)
      this.dialog.type = 'edit'
      this.dialog.isTripEditVisible = true
    },
    handleDeleteTrip(row) {
      const that = this
      this.$confirm('此操作将永久删除该车次，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return transporttripApi.delete(row.id)
        })
        .then(response => {
          const res = response.data
          if (res.data) {
            that.$message({
              message: that.$t('tips.deleteSuccess'),
              type: 'success'
            })
            that.fetch()
          } else {
            that.$message.error(res.message)
          }
        })
        .catch(response => {
          // 失败
          if (response === 'cancel') {
            this.$message.warning('取消删除')
          }
        })
    }
  }
}
</script>

<style>
.map {
  width: 1100px;
  height: 600px;
}
</style>

