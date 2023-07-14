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
          @open="handleOpen"
          @close="handleClose"
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
        <el-form ref="form" :model="truck" :rules="rules" label-position="right" label-width="100px" v-if="truckisVisible">
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
            <el-input v-model="truck.allowableLoad" />
          </el-form-item>
          <el-form-item :label="$t('table.truck.allowableVolume')" prop="status">
            <el-input v-model="truck.allowableVolume" />
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
        <el-button
          class="addtype-button"
          style="background-color: #6a8d6d;color: #fff;border-radius: 5px;border-color: #DCDFE6;"
          v-if="truckisVisible"
          @click="submitForm"
        >
          {{ $t('table.truck.edit') }}
        </el-button>
        <el-form ref="lineform" :model="truck"  label-position="right" label-width="100px" v-if="lineisVisible">
          <el-form-item :label="$t('table.truck.line')" prop="status">
            <el-input v-model="truck.lineName" />
          </el-form-item>
          <el-form-item :label="$t('table.truck.tripid')" prop="status">
            <el-input v-model="truck.tripid" />
          </el-form-item>
        </el-form>
        <template v-if="lineisVisible">
          <baidu-map class="map" center="北京" zoom="10" ></baidu-map>
        </template>
      </el-main>
    </el-container>
  </el-dialog>
</template>
<script>

export default {
  props: {
    type: {
      type: String,
      default: 'add'
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: '查看详情',
      truck: {},
      truckisVisible: true,
      lineisVisible: false,
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
  methods: {
    closeForm() {
      this.$emit('close')
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submit', this.truck)
        }
      })
    },
    setTruck(truck) {
      this.truck = { ...truck }
    },
    handelSelect(index) {
      if (index === 'truckdetail') {
        this.truckisVisible = true
        this.lineisVisible = false
      } else if (index === 'linedetail') {
        this.truckisVisible = false
        this.lineisVisible = true
      }
    }
  }
}
</script>

<style>
.map {
  width: 100%;
  height: 400px;
}
</style>
