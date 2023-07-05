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

      <div slot="footer" class="dialog-footer">
        <el-button plain type="warning" @click="isVisible = false">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button plain type="primary" @click="submitForm">
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>
import orderApi from '@/api/Order.js'

export default {
  name: 'OrderEdit',
  components: {},
  props: {
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
      order: this.initOrder(),
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
      return {
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
        senderAddressDetail: '',
        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        receiverAddressDetail: ''
      }
    },
    setOrder(order) {
      this.order = { ...order }
    },
    close() {
      this.$emit('close')
    },
    reset() {
      // 先清除校验，再清除表单，不然有奇怪的bug
      this.$refs.form.clearValidate()
      this.$refs.form.resetFields()
      this.role = this.initOrder()
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
      if (that.orgHidden && that.role.orgList) {
        that.role.orgList.length = 0
      } else {
        that.role.orgList = that.$refs.orgTree.getCheckedKeys()
      }

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
      orderApi.update(this.role).then(response => {
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

