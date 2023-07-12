<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :type="type"
    :visible.sync="isVisible"
    top="50px"
  >
    <el-form ref="form" :model="order" :rules="rules" label-position="right" label-width="100px">
      <el-form-item :label="$t('table.order.orderNo')" prop="id">
        <el-input v-model="order.id" :disabled="type==='edit'" />
      </el-form-item>
      <el-form-item :label="$t('table.order.transportNo')" prop="id">
        <el-input v-model="order.transportNo" :disabled="type==='edit'" />
      </el-form-item>
      <el-form-item :label="$t('table.order.orderStatus')" prop="status">
        <el-select v-model="order.status" :placeholder="$t('table.select')">
          <el-option
            v-for="item in orderStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.order.payStatus')" prop="status">
        <el-select v-model="order.paymentStatus" :placeholder="$t('table.select')">
          <el-option
            v-for="item in payStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.order.orderType')" prop="status">
        <el-select v-model="order.orderType" :placeholder="$t('table.select')">
          <el-option
            v-for="item in orderTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.order.senderName')" prop="orderType">
        <el-input v-model="order.senderName" />
      </el-form-item>
      <el-form-item :label="$t('table.order.senderPhone')" prop="orderType">
        <el-input v-model="order.senderPhone" />
      </el-form-item>
      <el-form-item :label="$t('table.order.senderAddress')" prop="orderType">
        <el-cascader
          v-model="order.senderAddress3id"
          size="large"
          :options="regionData"
        />
      </el-form-item>
      <el-form-item :label="$t('table.order.senderAddressDetail')" prop="orderType">
        <el-input v-model="order.senderAddress" />
      </el-form-item>
      <el-form-item :label="$t('table.order.receiverName')" prop="orderType">
        <el-input v-model="order.receiverName" />
      </el-form-item>
      <el-form-item :label="$t('table.order.receiverPhone')" prop="orderType">
        <el-input v-model="order.receiverPhone" />
      </el-form-item>
      <el-form-item :label="$t('table.order.receiverAddress')" prop="orderType">
        <el-cascader
          v-model="order.receiverAddress3id"
          size="large"
          :options="regionData"
        />
      </el-form-item>
      <el-form-item :label="$t('table.order.receiverAddressDetail')" prop="orderType">
        <el-input v-model="order.receiverAddress" />
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
import orderApi from '@/api/Order.js'
import { regionData } from 'element-china-area-data'

export default {
  name: 'OrderEdit',
  components: {},
  props: {
    payStatusOptions: {
      type: Array,
      required: true
    },
    orderStatusOptions: {
      type: Array,
      required: true
    },
    orderTypeOptions: {
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
      order: {},
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
    initOrder() {
      this.order = {
        id: '',
        status: '',
        createTime: '',
        distance: '',
        remark: '',
        orderType: '',
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
    setOrder(order) {
      this.order = { ...order }
      this.order.senderAddress3id = [this.order.senderProvinceId, this.order.senderCityId, this.order.senderCountyId]
      this.order.receiverAddress3id = [this.order.receiverProvinceId, this.order.receiverCityId, this.order.receiverCountyId]
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
      orderApi.save(this.order).then(response => {
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
      if (this.order.senderAddress3id.length === 0 || this.order.receiverAddress3id.length === 0) {
        this.$message({
          message: '请选择省市区',
          type: 'error'
        })
        return
      }
      this.order.senderProvinceId = this.order.senderAddress3id[0]
      this.order.senderCityId = this.order.senderAddress3id[1]
      this.order.senderCountyId = this.order.senderAddress3id[2]
      this.order.receiverProvinceId = this.order.receiverAddress3id[0]
      this.order.receiverCityId = this.order.receiverAddress3id[1]
      this.order.receiverCountyId = this.order.receiverAddress3id[2]
      // console.log(this.order)
      // console.log('edit')
      orderApi.update(this.order).then(response => {
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
