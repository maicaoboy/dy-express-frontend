<template>
  <div class="app-container">
    <div style="margin: 20px;" />
    <el-form :inline="true" :label-position="labelPosition" label-width="80px" :model="formdata">
      <el-row>
        <el-col :span="8">
          <el-form-item :inline="true" :label="$t('table.transportline.typeNumber')">
            <el-input v-model="formdata.typeNumber" :placeholder="$t('table.transportline.searchtypeNumber')" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('table.transportline.name')">
            <el-input v-model="formdata.name" :placeholder="$t('table.transportline.searchname')" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('table.transportline.agencyType')">
            <el-select v-model="formdata.agencyType" :placeholder="$t('table.transportline.searchagencyType')">
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
        v-has-permission="['order:add']"
        style="background-color: #8dc149;color: #fff;border-radius: 5px;border-color: #DCDFE6;"
        @click="handleAdd()"
      >
        {{ $t('table.add') }}
      </el-button>
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
        ref="table"
        v-loading="loading"
        :data="tableData.items"
        :header-cell-style="{background:'#FCFBFF',border:'0'}"
        fit
        style="width: 100%;"
      >
        <el-table-column type="index" width="50" :label="$t('table.serial')" />
        <el-table-column
          prop="typeNumber"
          label="线路类型编号"
        />
        <el-table-column
          prop="name"
          label="线路类型名称"
        />
        <el-table-column label="起始机构类型" :formatter="orgFormater" align="center" prop="startAgencyType" width="200" />
        <el-table-column label="终点机构类型" :formatter="orgFormater" align="center" prop="endAgencyType" width="200" />
        <el-table-column
          prop="lastUpdateTime"
          label="最近更新时间"
        />
        <el-table-column
          prop="updater"
          label="最近更新人员"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">
              {{ $t('table.edit') }}
            </el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row)">
              {{ $t('table.delete') }}
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
        :type="dialog.type"
        @close="editClose"
        @success="editSuccess"
      />
    </el-card>
  </div>
</template>

<script>
import transportlineApi from '@/api/transportline'
import transporttripApi from '@/api/transporttrip'
import Pagination from '@/components/Pagination'
import transportlineEdit from './Edit'

export default {
  components: { Pagination, transportlineEdit },
  data() {
    return {
      dialog: {
        isVisible: false,
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
      // '组织类型（0:网点 1:一级转运中心 2:二级转运中心 3:总公司 4:分公司）'
      options: [{
        value: 0,
        label: '网点'
      },
      {
        value: 1,
        label: '一级转运中心'
      },
      {
        value: 2,
        label: '二级转运中心'
      },
      {
        value: 3,
        label: '总公司'
      },
      {
        value: 4,
        label: '分公司'
      }
      ]
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    editClose() {
      this.dialog.isVisible = false
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
      if (cellValue === 0) {
        return '网点'
      } else if (cellValue === 1) {
        return '一级转运中心'
      } else if (cellValue === 2) {
        return '二级转运中心'
      } else if (cellValue === 3) {
        return '总公司'
      } else if (cellValue === 4) {
        return '分公司'
      }
    },
    fetch(params = {}) {
      const that = this // 存储this
      console.log(this)
      console.log(that)
      that.loading = true
      params.pageSize = this.pagination.size
      params.page = this.pagination.current
      // console.log(params)
      transportlineApi.page(params).then(response => {
        const res = response.data
        console.log(res)
        that.loading = false
        that.tableData = res
      })
      // this.loading = false
    },
    handleEdit(row) {
      console.log(row)
      this.$refs.edit.settransportline(row)
      this.dialog.type = 'edit'
      this.dialog.isVisible = true
    },
    handleAdd() {
      this.$refs.edit.settransportline({})
      this.dialog.type = 'add'
      this.dialog.isVisible = true
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该路线类型，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return transportlineApi.delete(row.id)
      }).then(response => {
        const res = response.data
        if (res.isSuccess) {
          this.$message({
            message: this.$t('tips.deleteSuccess'),
            type: 'success'
          })
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message.warning('取消删除')
        }
      })
    }
  }
}
</script>

  <style>

  </style>

