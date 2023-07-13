<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :type="type"
    :visible.sync="isVisible"
    top="50px"
  >
    <el-form ref="form" :model="transport" :rules="rules" label-position="right" label-width="100px">
      <el-form-item :label="$t('table.transport.transportNo')" prop="id">
        <el-input v-model="transport.id" :disabled="type==='edit'" />
      </el-form-item>
      <el-form-item :label="$t('table.transport.orderId')" prop="id">
        <el-input v-model="transport.orderId" :disabled="type==='edit'" />
      </el-form-item>
      <el-form-item :label="$t('table.transport.transportStatus')" prop="status">
        <el-select v-model="transport.status" :placeholder="$t('table.select')">
          <el-option
            v-for="item in transportStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.transport.schedulingStatus')" prop="status">
        <el-select v-model="transport.schedulingStatus" :placeholder="$t('table.select')">
          <el-option
            v-for="item in transportSchedulingStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.transport.senderName')" prop="transportType">
        <el-input v-model="transport.senderName" />
      </el-form-item>
      <el-form-item :label="$t('table.transport.senderPhone')" prop="transportType">
        <el-input v-model="transport.senderPhone" />
      </el-form-item>
      <el-form-item :label="$t('table.transport.senderAddress')" prop="transportType">
        <el-cascader
          v-model="transport.senderAddress3id"
          size="large"
          :options="regionData"
        />
      </el-form-item>
      <el-form-item :label="$t('table.transport.senderAddressDetail')" prop="transportType">
        <el-input v-model="transport.senderAddress" />
      </el-form-item>
      <el-form-item :label="$t('table.transport.receiverName')" prop="transportType">
        <el-input v-model="transport.receiverName" />
      </el-form-item>
      <el-form-item :label="$t('table.transport.receiverPhone')" prop="transportType">
        <el-input v-model="transport.receiverPhone" />
      </el-form-item>
      <el-form-item :label="$t('table.transport.receiverAddress')" prop="transportType">
        <el-cascader
          v-model="transport.receiverAddress3id"
          size="large"
          :options="regionData"
        />
      </el-form-item>
      <el-form-item :label="$t('table.transport.receiverAddressDetail')" prop="transportType">
        <el-input v-model="transport.receiverAddress" />
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
import transportApi from '@/api/TransportOrder.js'
import { regionData } from 'element-china-area-data'

export default {
  name: 'TransportEdit',
  components: {},
  props: {
    transportStatusOptions: {
      type: Array,
      required: true
    },
    transportSchedulingStatusOptions: {
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
      transport: {},
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
    initTransport() {
      this.transport = {
        id: '',
        status: '',
        schedulingStatus: '',
        orderId: '',
        createTime: '',
        distance: '',
        remark: '',
        paymentMethod: '',
        paymentStatus: '',
        senderName: '',
        senderPhone: '',
        senderAddress: '',
        senderAddress3id: [],
        senderAddressDetail: '',
        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        receiverAddress3id: [],
        receiverAddressDetail: ''
      }
    },
    setTransport(transport) {
      this.transport = { ...transport }
      this.transport.senderAddress3id = [this.transport.senderProvinceId, this.transport.senderCityId, this.transport.senderCountyId]
      this.transport.receiverAddress3id = [this.transport.receiverProvinceId, this.transport.receiverCityId, this.transport.receiverCountyId]
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
      transportApi.save(this.transport).then(response => {
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
      // console.log(this.order)
      if (this.transport.senderAddress3id.length === 0 || this.transport.receiverAddress3id.length === 0) {
        this.$message({
          message: '请选择省市区',
          type: 'error'
        })
        return
      }
      this.transport.senderProvinceId = this.transport.senderAddress3id[0]
      this.transport.senderCityId = this.transport.senderAddress3id[1]
      this.transport.senderCountyId = this.transport.senderAddress3id[2]
      this.transport.receiverProvinceId = this.transport.receiverAddress3id[0]
      this.transport.receiverCityId = this.transport.receiverAddress3id[1]
      this.transport.receiverCountyId = this.transport.receiverAddress3id[2]
      // console.log(this.transport)
      // console.log('edit')
      transportApi.update(this.transport).then(response => {
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

