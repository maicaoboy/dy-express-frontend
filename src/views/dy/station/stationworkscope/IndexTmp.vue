<template>
  <div>
    <!-- 搜索表单 -->
    <el-form :model="searchForm" label-width="120px" @submit.native.prevent>
      <el-form-item label="网点id">
        <el-input v-model="searchForm.agencyId" placeholder="请输入快递员ID" />
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

    <!-- 表格显示 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="agencyId" label="网点ID" />
      <el-table-column prop="areaId" label="地区ID" />
      <el-table-column prop="mutiPoints" label="电子围栏点" />
      <!--      查看地图   -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showMap(scope.row)">查看/修改电子围栏</el-button>
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

<!--    点击查看电子围栏后，显示电子围栏地图  -->
    <el-dialog title="电子围栏地图" :visible.sync="editAgencyScopeDialog">
      <baidu-map></baidu-map>
    </el-dialog>
    <!--    <BaiduMap></BaiduMap>-->
  </div>
</template>
<script>
import MyMap from './MyMap.vue'
import AxiosApi from '@/api/AxiosApi'
export default {
  name: 'StationWorkScope',
  components: {
    MyMap
  },
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
        method: 'get',
        params: {
          agencyId: this.searchForm.agencyId,
          areaId: this.searchForm.areaId,
          page: this.pagination.page,
          pageSize: this.pagination.pageSize
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data.records
        this.pagination.total = +res.data.data.total
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
      console.log(row)
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
      AxiosApi({
        url: '/base/scope/agency/update',
        method: 'post',
        data: this.editAgencyForm
      }).then(res => {
        console.log(res)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.editAgencyDialog = false
        this.search()
      })
    },
    resetAgencyForm() {
      this.agencyForm.agencyId = ''
      this.agencyForm.areaId = ''
      this.agencyForm.mutiPoints = ''
    }
  }
}
</script>

<style>

</style>
