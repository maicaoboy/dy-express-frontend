<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :type="type"
    :visible.sync="isVisible"
    top="50px"
  >
    <el-form ref="form" :model="good" :rules="rules" label-position="right" label-width="100px">
      <el-form-item :label="$t('table.goodsType.name')" prop="id">
        <el-input v-model="good.name" />
      </el-form-item>
      <el-form-item :label="$t('table.goodsType.truckType')" prop="status">
        <el-select v-model="good.truckType" :placeholder="$t('table.select')">
          <el-option
            v-for="item in truckTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.goodsType.defaultWeight')" prop="id">
        <el-input v-model="good.defaultWeight" />
      </el-form-item>
      <el-form-item :label="$t('table.goodsType.defaultVolume')" prop="status">
        <el-input v-model="good.defaultVolume" />
      </el-form-item>
      <el-form-item :label="$t('table.goodsType.describe')" prop="status">
        <el-input v-model="good.remark" />
      </el-form-item>
      <!--      单选框-->
      <el-form-item :label="$t('table.goodsType.status')" prop="status">
        <el-radio-group v-model="good.status">
          <el-radio :label="1">
            有效
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
      good: {}
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
            this.$emit('handelAdd', this.good)
          } else {
            this.$emit('handelEdit', this.good)
          }
        } else return false
      })
    },
    closeForm() {
      this.intiGoods()
      this.$emit('close')
    },
    setGood(good) {
      this.good = { ...good }
    },
    intiGoods() {
      this.good = {
        id: '',
        name: '',
        truckTypeIds: [],
        defaultWeight: '',
        defaultVolume: '',
        remark: '',
        status: 1
      }
    }
  }
}
</script>
