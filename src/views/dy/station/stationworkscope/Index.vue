<template>
  <div>
    <!-- 搜索表单 -->
    <el-form :model="searchForm" label-width="120px" @submit.native.prevent>
      <el-form-item label="网点名称">
        <el-input v-model="searchForm.name" placeholder="请输入网点名称模糊查询" />
      </el-form-item>
      <el-form-item label="地址">
        <template>
          <div id="app">
            <el-cascader
              v-model="searchOptions"
              size="large"
              :options="regionData"
            />
          </div>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">
          搜索
        </el-button>
        <el-button @click="resetSearchForm">
          重置
        </el-button>
<!--        <el-button type="primary" @click="addAgencyDialog = true">-->
<!--          添加网点-->
<!--        </el-button>-->
      </el-form-item>
    </el-form>
    <!--换行-->
    <br>
    <!-- 表格显示 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="网点名称" />
      <el-table-column prop="areaId" label="地区ID" />
      <el-table-column prop="location" label="地址" />
      <!--            查看地图   -->
      <el-table-column label="作业范围">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showMap(scope.row)">
            查看/修改电子围栏
          </el-button>
        </template>
      </el-table-column>
      <!--&lt;!&ndash;      删除操作    &ndash;&gt;-->
      <!--      <el-table-column label="删除操作">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-button type="danger" size="mini" @click="deleteAgency(scope.row)">删除</el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>
    <!--换行-->
    <br>
    <!-- 分页 -->
    <el-pagination
      :current-page="pagination.current"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!--    <el-dialog title="添加网点范围" :visible.sync="addAgencyDialog">-->
    <!--      <el-form :model="agencyForm" label-width="120px" @submit.native.prevent>-->
    <!--        <el-form-item label="网点名称">-->
    <!--          <el-input v-model="agencyForm.agencyId" placeholder="请输入网点ID" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="设置网点地址">-->
    <!--          <template>-->
    <!--            <div id="app">-->
    <!--              <el-cascader-->
    <!--                size="large"-->
    <!--                :options="regionData"-->
    <!--                v-model="selectedOptions">-->
    <!--              </el-cascader>-->
    <!--            </div>-->
    <!--          </template>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item>-->
    <!--          <el-button type="primary" @click="addAgency">添加</el-button>-->
    <!--          <el-button @click="resetAgencyForm">重置</el-button>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--    </el-dialog>-->

    <el-dialog title="电子围栏地图" :visible.sync="editAgencyScopeDialog">
      <MyMap :close-map="closeMap" ref="map" style="width: 100%;height: 500px" />
    </el-dialog>

    <!--    <BaiduMap></BaiduMap>-->
  </div>
</template>
<script>
import AxiosApi from '@/api/AxiosApi'
import MyMap from '@/views/dy/station/stationworkscope/MyMap.vue'
import areaApi from '@/api/Area'
import { regionData } from 'element-china-area-data'
export default {
  name: 'StationWorkScope',
  components: { MyMap },
  data() {
    return {
      searchForm: {
        name: '',
        areaId: '',
        orgType: ''
      },
      tableData: [],
      pagination: {
        current: 1,
        size: 10,
        total: 0
      },
      addAgencyDialog: false,
      editAgencyDialog: false,
      editAgencyScopeDialog: false,
      agencyForm: {
        agencyId: '',
        areaId: '',
        mutiPoints: '[]'
      },
      editAgencyForm: {
        agencyId: '',
        areaId: '',
        mutiPoints: ''
      },
      key: '',
      regionData,
      selectedOptions: [null],
      searchOptions: []
    }
  },

  created() {
    this.key = this.$route.query.key
  },
  mounted() {
    this.search()
  },
  methods: {
    search() {
      console.log(this.searchOptions)
      if (this.searchOptions.length > 0) {
        this.searchForm.areaId = this.searchOptions[this.searchOptions.length - 1]
      } else {
        this.searchForm.areaId = ''
      }
      AxiosApi({
        url: '/authority/org/page',
        method: 'get',
        data: {
          name: this.searchForm.name,
          areaId: this.searchForm.areaId,
          orgType: this.searchForm.orgType,
          current: this.pagination.current,
          size: this.pagination.size
        }
      }).then(res => {
        console.log(res)
        this.pagination.total = +res.data.data.total
        const table = res.data.data.records
        //   获取地址
        let cnt = 0
        for (let i = 0; i < table.length; i++) {
          table[i].agencyId = table[i].id
          areaApi.getByCode(table[i].areaId).then(res => {
            table[i].location = res.data.data.mergerName
            table[i].lng = res.data.data.lng
            table[i].lat = res.data.data.lat
            areaApi.getByCode(table[i].areaId).then(res => {
              table[i].location = res.data.data.mergerName
              table[i].lng = res.data.data.lng
              table[i].lat = res.data.data.lat
              AxiosApi({
                url: '/base/scope/agency/page',
                method: 'post',
                data: {
                  agencyId: table[i].id
                }
              }).then(res => {
                if (res.data.data.records.length > 0) {
                  table[i].mutiPoints = res.data.data.records[0].mutiPoints
                } else {
                  table[i].mutiPoints = [[]]
                }
                cnt += 1
                if (cnt === table.length) {
                  this.tableData = table
                }
              })
            })
          })
        }
        if (table.length === 0) {
          this.tableData = []
        }
      })
    },
    resetSearchForm() {
      this.searchForm = {
        name: '',
        areaId: '',
        orgType: ''
      }
      this.searchOptions = []
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.search()
    },
    handleCurrentChange(val) {
      this.pagination.current = val
      this.search()
    },
    showMap(row) {
      this.editAgencyScopeDialog = true
      this.editAgencyForm = row
      this.$nextTick(() => {
        this.$refs.map.setPoints(row.mutiPoints[0], row)
      })
    },
    addAgency() {
      this.agencyForm.areaId = this.selectedOptions[this.selectedOptions.length - 1]
      this.agencyForm.mutiPoints = '[]'
      AxiosApi({
        url: '/base/scope/agency/add',
        method: 'post',
        data: this.agencyForm
      }).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.addAgencyDialog = false
        setTimeout(() => {
          this.search()
        }, 500)
      })
    },
    editAgency() {

    },
    resetAgencyForm(newAgencyForm) {
      this.agencyForm = newAgencyForm || {
        agencyId: '',
        areaId: '',
        mutiPoints: '',
        selectedOptions: []
      }
      this.search()
    },
    deleteAgency(row) {
      this.agencyForm = row
      AxiosApi({
        url: '/base/scope/agency/deleteById',
        method: 'post',
        data: this.agencyForm
      }).then(res => {
        console.log('hhhh', res)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        setTimeout(() => {
          this.search()
        }, 500)
      })
    },
    closeMap() {
      this.editAgencyScopeDialog = false
    }

  }
}
</script>

<style>
.bm-view {
  width: 100%;
  height: 300px;
}
.title {
  border: 1px solid black;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-bottom: 0;
  font-size: 14px;
  background: #E2EFDA;
}
/deep/ .el-table {
  font-size: 14px!important;
  border: 1px solid black!important;
}
/deep/  .el-table td {
  border-bottom: 1px solid black!important;
}
/deep/ .el-table--border th {
  border-right: 1px solid black!important;
  border-bottom: 1px solid black!important;
}
/deep/ .el-table--border td {
  border-right: 1px solid black!important;
}
/deep/ .el-table th.is-leaf {
  border-right: 1px solid black!important;
  border-bottom: 1px solid black!important;
}
/deep/ .el-table__row td {
  border-right: 1px solid black!important;
}
/deep/ .el-table__row td:nth-last-child(1) {
  border-right: 0!important;
}
.el-table--border::after, .el-table--group::after {
  width: 0;
}
/deep/ .el-table__header {
  border-collapse: collapse!important;
}
/deep/ .el-table__body, .el-table__footer, .el-table__header {
  border-collapse: collapse!important;
}

</style>
