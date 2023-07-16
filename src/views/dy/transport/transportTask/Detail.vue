<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :type="type"
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
          <el-menu-item index="transportTaskDetail">
            <i class="el-icon-transportTask" />
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item index="transportTaskLineDetail">
            <i class="el-icon-location" />
            <span slot="title">运输任务线轨迹详情</span>
          </el-menu-item>
          <el-menu-item index="transportOrderDetail">
            <i class="el-icon-location" />
            <span slot="title">运单详情</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-form ref="form" :model="transportTask" :rules="rules" label-position="right" label-width="100px" v-if="transportTaskisVisible">
          <el-form-item :label="$t('table.transportTask.transportTaskNo')" prop="id">
            <el-input v-model="transportTask.id" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.truckId')" prop="id">
            <el-input v-model="transportTask.truckId" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.status')" prop="status">
            <el-input v-model="transportTask.status"/>
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.assignStatus')" prop="status">
            <el-input v-model="transportTask.assignedStatus"/>
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.startAgencyId')" prop="transportTaskType">
            <el-input v-model="transportTask.startAgencyId"/>
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.endAgencyId')" prop="transportTaskType">
            <el-input v-model="transportTask.endAgencyId"/>
          </el-form-item>
        </el-form>
        <el-form ref="lineform" :model="transportTask"  label-position="right" label-width="100px" v-if="transportLineisVisible">
          <el-form-item :label="$t('table.transportTask.transportTripId')" prop="id">
            <el-input v-model="transportTask.transportTripsId" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.truckId')" prop="id">
            <el-input v-model="transportTask.truckId" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.planDepatureTime')" prop="transportTaskType">
            <el-input v-model="transportTask.planDepatureTime" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.actualDepatureTime')" prop="transportTaskType">
            <el-input v-model="transportTask.actualDepatureTime" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.planArrivalTime')" prop="transportTaskType">
            <el-input v-model="transportTask.actualArrivalTime" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.actualArrivalTime')" prop="transportTaskType">
            <el-input v-model="transportTask.actualArrivalTime" />
          </el-form-item>
        </el-form>
        <template v-if="transportLineisVisible">
          <baidu-map class="map" center="北京" zoom="10" ></baidu-map>
        </template>
        <el-form ref="orderform" :model="transportTask"  label-position="right" label-width="100px" v-if="transportLineisVisible">
          <el-form-item :label="$t('table.transportTask.transportTripId')" prop="id">
            <el-input v-model="transportTask.transportTripsId" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.truckId')" prop="id">
            <el-input v-model="transportTask.truckId" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.planDepatureTime')" prop="transportTaskType">
            <el-input v-model="transportTask.planDepatureTime" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.actualDepatureTime')" prop="transportTaskType">
            <el-input v-model="transportTask.actualDepatureTime" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.planArrivalTime')" prop="transportTaskType">
            <el-input v-model="transportTask.actualArrivalTime" />
          </el-form-item>
          <el-form-item :label="$t('table.transportTask.actualArrivalTime')" prop="transportTaskType">
            <el-input v-model="transportTask.actualArrivalTime" />
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </el-dialog>
</template>
<script>

export default {
  name: 'TransportTaskDetail',
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
      transportTask: {},
      transportTaskisVisible: true,
      transportLineisVisible: false,
      transportOrderisVisible: false,
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
          this.$emit('submit', this.transportTask)
        }
      })
    },
    setTransportTasks(transportTask) {
      this.transportTask = { ...transportTask }
    },
    handelSelect(index) {
      if (index === 'transportTaskDetail') {
        this.transportTaskisVisible = true
        this.transportLineisVisible = false
        this.transportOrderisVisible = false
      } else if (index === 'transportTaskLineDetail') {
        this.transportTaskisVisible = false
        this.transportLineisVisible = true
        this.transportOrderisVisible = false
      } else if (index === 'transportOrderDetail') {
        this.transportTaskisVisible = false
        this.transportLineisVisible = false
        this.transportOrderisVisible = true
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
