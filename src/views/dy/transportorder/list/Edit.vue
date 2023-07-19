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
      <el-form-item :label="$t('table.transport.orderNo')" prop="id">
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
        createTime: ''
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

