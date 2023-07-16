<template>
  <div>
    <!-- 搜索表单 -->
    <el-form :model="searchForm" label-width="120px" @submit.native.prevent>
      <el-form-item label="网点id">
        <el-input v-model="searchForm.agencyId" placeholder="请输入网点ID" />
      </el-form-item>
      <el-form-item label="地址id">
        <el-input v-model="searchForm.areaId" placeholder="请输入地址id"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">
          搜索
        </el-button>
        <el-button @click="resetSearchForm">重置</el-button>
        <el-button type="primary" @click="addAgencyDialog = true">添加网点</el-button>
      </el-form-item>
    </el-form>
    <!--换行-->
    <br>
    <!-- 表格显示 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="agencyId" label="网点ID" />
      <el-table-column prop="areaId" label="地区ID" />
      <el-table-column prop="location" label="地址" />
      <el-table-column prop="mutiPoints" label="电子围栏点" />
      <!--      查看地图   -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showMap(scope.row)">查看/修改电子围栏</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--换行-->
    <br>
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
    <el-dialog title="添加网点范围" :visible.sync="addAgencyDialog">
      <el-form :model="agencyForm" label-width="120px" @submit.native.prevent>
        <el-form-item label="网点id">
          <el-input v-model="agencyForm.agencyId" placeholder="请输入快递员ID" />
        </el-form-item>
        <el-form-item label="地址id">
          <el-input v-model="agencyForm.areaId" placeholder="请输入地址id"/>
        </el-form-item>
        <el-form-item label="电子围栏点">
          <el-input v-model="agencyForm.mutiPoints" placeholder="请输入电子围栏点"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addAgency">添加</el-button>
          <el-button @click="resetAgencyForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="电子围栏地图" :visible.sync="editAgencyScopeDialog">
      <MyMap ref="map" style="width: 100%;height: 500px"></MyMap>
    </el-dialog>

    <!--    <BaiduMap></BaiduMap>-->
  </div>
</template>
<script>
import AxiosApi from '@/api/AxiosApi'
import MyMap from '@/views/dy/station/stationworkscope/MyMap.vue'
import areaApi from '@/api/Area'
export default {
  name: 'StationWorkScope',
  components: { MyMap },
  data() {
    return {
      searchForm: {
        agencyId: '',
        areaId: ''
      },
      tableData: [],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      addAgencyDialog: false,
      editAgencyDialog: false,
      editAgencyScopeDialog: false,
      agencyForm: {
        agencyId: '',
        areaId: '',
        mutiPoints: ''
      },
      editAgencyForm: {
        agencyId: '',
        areaId: '',
        mutiPoints: ''
      },
      key: ''
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
      AxiosApi({
        url: '/base/scope/agency/page',
        method: 'post',
        data: {
          agencyId: this.searchForm.agencyId,
          areaId: this.searchForm.areaId,
          page: this.pagination.page,
          pageSize: this.pagination.pageSize
        }
      }).then(res => {
        console.log(res)
        this.pagination.total = +res.data.data.total
        const table = res.data.data.records
        //   获取地址
        for (let i = 0; i < table.length; i++) {
          console.log(table)
          areaApi.getByCode(table[i].areaId).then(res => {
            table[i].location = res.data.data.mergerName
            table[i].lng = res.data.data.lng
            table[i].lat = res.data.data.lat
            if (i === table.length - 1) {
              this.tableData = table
            }
          })
        }
        if (table.length === 0) {
          this.tableData = []
        }
      })
    },
    resetSearchForm() {
      this.searchForm.agencyId = ''
      this.searchForm.areaId = ''
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.search()
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.search()
    },
    showMap(row) {
      this.editAgencyScopeDialog = true
      this.editAgencyForm = row
      this.$nextTick(() => {
        console.log(this.$refs.map)
        this.$refs.map.setPoints(JSON.parse(row.mutiPoints), row)
      })
    },
    addAgency() {
      AxiosApi({
        url: '/base/scope/agency/add',
        method: 'post',
        data: this.agencyForm
      }).then(res => {
        console.log(res)
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.addAgencyDialog = false
        this.search()
      })
    },
    editAgency() {

    },
    resetAgencyForm(newAgencyForm) {
      this.agencyForm = newAgencyForm || {
        agencyId: '',
        areaId: '',
        mutiPoints: ''
      }
    },
  }
}
</script>

<style>
.bm-view {
  width: 100%;
  height: 300px;
}
</style>
