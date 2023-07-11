<template>
  <div class="app-container">
    <div style="margin: 20px;" />
    <el-form :inline="true" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('table.transportlinetype.typeNumber')">
            <el-input v-model="formdata.typeNumber" :placeholder="$t('table.transportlinetype.searchtypeNumber')" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('table.transportlinetype.name')">
            <el-input v-model="formdata.name" :placeholder="$t('table.transportlinetype.searchname')" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('table.transportlinetype.agencyType')">
            <el-select v-model="formdata.agencyType" :placeholder="$t('table.transportlinetype.searchagencyType')">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      formdata: {
        name: '',
        region: '',
        type: ''
      },
      options: [{
        value: '一级转运中心',
        label: '一级转运中心'
      },
      {
        value: '二级转运中心',
        label: '二级转运中心'
      },
      {
        value: '网点',
        label: '网点'
      }
      ]
    }
  }
}
</script>

<style>

</style>
