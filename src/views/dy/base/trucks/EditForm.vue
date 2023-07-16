<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :type="type"
    :visible.sync="isVisible"
    top="50px"
  >
    <el-form ref="form" :model="truck" :rules="rules" label-position="right" label-width="100px">
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
        <el-input v-model="truck.allowableLoad" >
          <template slot="append">
            吨
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('table.truck.allowableVolume')" prop="status">
        <el-input v-model="truck.allowableVolume" >
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
    }
  },
  data() {
    return {
      truck: {}
    }
  },
  computed: {
    title() {
      return this.type === 'add' ? this.$t('common.add') : this.$t('common.edit')
    }
  },
  methods: {
    submitForm() {
      const temp = this
      temp.$refs.form.validate(valid => {
        if (valid) {
          if (this.type === 'add') {
            this.$emit('handelAdd', this.truck)
          } else {
            this.$emit('handelEdit', this.truck)
          }
        } else return false
      })
    },
    closeForm() {
      this.intiGoods()
      this.$emit('close')
    },
    intiGoods() {
      this.truck = {
        licensePlate: '',
        brand: '',
        truckTypeId: '',
        allowableLoad: '',
        allowableVolume: '',
        remark: '',
        status: 1
      }
    }
  }
}
</script>
