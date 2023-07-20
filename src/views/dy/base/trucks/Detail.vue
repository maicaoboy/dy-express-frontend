<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible.sync="isVisible"
    top="50px"
  >
    <el-container>
      <el-aside background-color="fff8eb">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#6a8d6d"
          text-color="#fff"
          active-text-color="#fff8eb"
          @select="handelSelect"
        >
          <el-menu-item index="truckdetail">
            <i class="el-icon-truck" />
            <span slot="title">车辆详情</span>
          </el-menu-item>
          <el-menu-item index="linedetail">
            <i class="el-icon-location" />
            <span slot="title">车辆线路详情</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-form v-if="truckisVisible" ref="form" :model="truck" :rules="rules" label-position="right" label-width="100px">
          <el-form-item :label="$t('table.truck.truckNumber')" prop="status">
            <el-input v-model="truck.licensePlate" />
          </el-form-item>
          <el-form-item :label="$t('table.truck.brand')" prop="status">
            <el-input v-model="truck.brand" />
          </el-form-item>
          <el-form-item :label="$t('table.truck.truckType')" prop="status">
            <el-select v-model="truck.truckTypeId" :placeholder="$t('table.select')">
              <el-option
                v-for="item in truckTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('table.truck.allowableLoad')" prop="id">
            <el-input v-model="truck.allowableLoad">
              <template slot="append">
                吨
              </template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('table.truck.allowableVolume')" prop="status">
            <el-input v-model="truck.allowableVolume">
              <template slot="append">
                立方米
              </template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('table.goodsType.status')" prop="status">
            <el-radio-group v-model="truck.status">
              <el-radio :label="1">
                空闲
              </el-radio>
              <el-radio :label="0">
                禁用
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-form v-if="lineisVisible" ref="lineform" :model="truck" label-position="right" label-width="100px">
          <el-form-item :label="$t('table.truck.line')" prop="status">
            <el-input v-model="truck.transportLineId" />
          </el-form-item>
          <el-form-item :label="$t('table.truck.tripid')" prop="status">
            <el-input v-model="truck.transportTripsId" />
          </el-form-item>
        </el-form>
        <template v-if="lineisVisible">
          <baidu-map class="map" center="北京" zoom="10" style="overflow:auto">
            <bm-driving :start="start" :end="end" :auto-viewport="true" :policy="BMAP_DRIVING_POLICY_LEAST_DISTANCE" />
          </baidu-map>
        </template>
      </el-main>
    </el-container>
    <div slot="footer" class="dialog-footer">
      <el-button plain type="warning" @click="closeForm">
        {{ $t('common.cancel') }}
      </el-button>
      <el-button plain type="primary" @click="submitForm">
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import OrgApi from '@/api/Org'
import AreaApi from '@/api/Area'
// import TransportLineApi from '@/api/transportline'

export default {
  props: {
    type: {
      type: String,
      default: 'add'
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    truckTypeOptions: {
      type: Array,
      default: () => []
    },
    orgs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      title: '查看详情',
      truck: {},
      truckisVisible: true,
      lineisVisible: false,
      areaId: {
        areaStartId: '131024',
        areaEndId: '131026'
      },
      orgId: {
        orgStartId: '',
        orgEndId: ''
      },
      start: {
        lng: 116.301934,
        lat: 39.977552
      },
      end: {
        lng: 116.508328,
        lat: 39.919141
      },
      BaiduMapAK: 'BaiduMapAK'
    }
  },
  // watch: {
  //   truck() {
  //     // 通过线路Id集合找到线路实体
  //     TransportLineApi.get(this.truck.transportLineId).then(response => {
  //       const res = response.data
  //       // 循环遍历线路实体
  //       for (let i = 0; i < res.length; i++) {
  //         OrgApi.get(res[i].startAgencyId).then(response => {
  //           const res2 = response.data
  //           if (res2.isSuccess) {
  //             console.log(res.data)
  //           }
  //         })
  //       }
  //       // this.orgId.orgStartId = res[0].startAgencyId
  //       // this.orgId.orgEndId = res[0].endAgencyId
  //     })
  //   }
  // },
  methods: {
    closeForm() {
      this.$emit('close')
      this.truckisVisible = true
      this.lineisVisible = false
    },
    submitForm() {
      const temp = this
      temp.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('handelEdittruck', this.truck)
        }
      })
    },
    setTruck(truck) {
      this.truck = { ...truck }
    },
    setStart() {
      OrgApi.get(this.orgId.orgStartId).then(response => {
        const res = response.data
        if (res.isSuccess) {
          this.areaId.areaStartId = res.data.areaId
          console.log(this.areaId.areaStartId)
        }
      })
      AreaApi.getByCode(this.areaId.areaStartId).then(response => {
        const res = response.data
        if (res.isSuccess) {
          this.start.lat = res.data.lat
          this.start.lng = res.data.lng
        }
      })
    },
    setEnd() {
      OrgApi.get(this.orgId.orgEndId).then(response => {
        const res = response.data
        if (res.isSuccess) {
          this.areaId.areaEndId = res.data.areaId
          console.log(this.areaId.areaEndId)
        }
      })
      AreaApi.getByCode(this.areaId.areaEndId).then(response => {
        const res = response.data
        if (res.isSuccess) {
          this.end.lat = res.data.lat
          this.end.lng = res.data.lng
        }
      })
    },
    handelSelect(index) {
      if (index === 'truckdetail') {
        this.truckisVisible = true
        this.lineisVisible = false
      } else if (index === 'linedetail') {
        this.setStart()
        this.setEnd()
        this.truckisVisible = false
        this.lineisVisible = true
      }
    }
  }
}
</script>

<style>
.map{
  margin: 0 auto;
  width: 100%;
  height: 400px;
}
</style>
