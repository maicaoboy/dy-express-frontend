<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :type="type"
    :visible.sync="isVisible"
    top="50px"
  >
    <el-form ref="form" :model="transportTask" :rules="rules" label-position="right" label-width="100px">
      <el-form-item :label="$t('table.transportTask.transportTaskNo')" prop="id">
        <el-input v-model="transportTask.id" :disabled="type==='edit'" />
      </el-form-item>
      <el-form-item :label="$t('table.transportTask.status')" prop="status">
        <el-select v-model="transportTask.status" :placeholder="$t('table.select')">
          <el-option
            v-for="item in transportTaskStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.transportTask.assignStatus')" prop="assignStatus">
        <el-select v-model="transportTask.assignedStatus" :placeholder="$t('table.select')">
          <el-option
            v-for="item in transportTaskAssignStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.transportTask.loadStatus')" prop="loadStatus">
        <el-select v-model="transportTask.loadingStatus" :placeholder="$t('table.select')">
          <el-option
            v-for="item in transportTaskLoadStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.transportTask.transportTripId')" prop="transportTaskType">
        <el-input v-model="transportTask.transportTripsId" />
      </el-form-item>
      <el-form-item :label="$t('table.transportTask.startAgencyId')" prop="transportTaskType">
        <el-input v-model="transportTask.startAgencyId" />
      </el-form-item>
      <el-form-item :label="$t('table.transportTask.endAgencyId')" prop="transportTaskType">
        <el-input v-model="transportTask.endAgencyId" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button plain type="warning" @click="isVisible = false">
        {{ $t('common.cancel') }}
      </el-button>
      <el-button plain type="primary" @click="submitForm">
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import TransportTaskApi from '@/api/TransportTask.js'
import { regionData } from 'element-china-area-data'

export default {
  name: 'TransportTaskEdit',
  components: {},
  props: {
    transportTaskAssignStatusOptions: {
      type: Array,
      required: true
    },
    transportTaskStatusOptions: {
      type: Array,
      required: true
    },
    transportTaskLoadStatusOptions: {
      type: Array,
      required: true
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      regionData,
      transportTask: {},
      rules: {
        status: {
          required: true,
          message: this.$t('rules.require'),
          trigger: 'blur'
        }
      }
    }
  },
  computed: {
    isVisible: {
      get() {
        return this.dialogVisible
      },
      set() {
        this.close()
        this.reset()
      }
    },
    title() {
      return this.type === 'add'
        ? this.$t('common.add')
        : this.$t('common.edit')
    },
    enums() {
      return this.$store.state.common.enums
    }
  },
  watch: {},
  methods: {
    initTransportTask() {
      this.transportTask = {
        id: '',
        status: '',
        transportOrderId: '',
        assignedStatus: '',
        createTime: '',
        distance: '',
        remark: '',
        transportNo: '',
        loadingStatus: '',
        startAgencyId: '',
        endAgencyId: '',
        truckId: '',
        transportTripsId: '',
        planDepartureTime: '',
        actualDepartureTime: '',
        planArrivalTime: '',
        actualArrivalTime: '',
        planPickUpGoodsTime: '',
        actualPickUpGoodsTime: '',
        planDeliveryTime: '',
        actualDeliveryTime: ''
      }
    },
    setTransportTask(transportTask) {
      this.transportTask = { ...transportTask }
    },
    close() {
      this.$emit('close')
    },
    reset() {
      // 先清除校验，再清除表单，不然有奇怪的bug
      this.$refs.form.clearValidate()
    },
    submitForm() {
      const that = this
      this.$refs.form.validate(valid => {
        if (valid) {
          that.editSubmit()
        } else {
          return false
        }
      })
    },
    editSubmit() {
      const that = this
      if (that.type === 'add') {
        that.save()
      } else {
        that.update()
      }
    },
    save() {
      const that = this
      TransportTaskApi.save(this.transportTask).then(response => {
        const res = response.data
        if (res.isSuccess) {
          that.isVisible = false
          that.$message({
            message: that.$t('tips.createSuccess'),
            type: 'success'
          })
          that.$emit('success')
        }
      })
    },
    update() {
      TransportTaskApi.updatebyid(this.transportTask.id, this.transportTask).then(response => {
        const res = response.data
        if (res.isSuccess) {
          this.isVisible = false
          this.$message({
            message: this.$t('tips.updateSuccess'),
            type: 'success'
          })
          this.$emit('success')
        }
      })
    },
    dsTypeChange(value) {
      this.orgHidden = value !== 'CUSTOMIZE'
    }
  }
}
</script>
  <style lang="scss" scoped>
  </style>

