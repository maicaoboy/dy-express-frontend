<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :type="type"
    :visible.sync="isVisible"
    top="50px"
  >
    <el-form ref="form" :model="transportlinetype" :rules="rules" label-position="right" label-width="100px">
      <el-form-item :label="$t('table.transportlinetype.typeNumber')" prop="typeNumber">
        <el-input v-model="transportlinetype.typeNumber" :disabled="type==='edit'" />
      </el-form-item>
      <el-form-item :label="$t('table.transportlinetype.name')" prop="name">
        <el-input v-model="transportlinetype.name" />
      </el-form-item>
      <el-form-item :label="$t('table.transportlinetype.startAgencyType')" prop="status">
        <el-select v-model="transportlinetype.startAgencyType" :placeholder="$t('table.select')">
          <el-option
            v-for="item in agencyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.transportlinetype.endAgencyType')" prop="status">
        <el-select v-model="transportlinetype.endAgencyType" :placeholder="$t('table.select')">
          <el-option
            v-for="item in agencyOptions"
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
import transportlinetypeApi from '@/api/transportlinetype'

export default {
  name: 'TransportlineTypeEdit',
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
      transportlinetype: {},
      agencyOptions: [{
        value: 0,
        label: '网点'
      },
      {
        value: 1,
        label: '一级转运中心'
      },
      {
        value: 2,
        label: '二级转运中心'
      },
      {
        value: 3,
        label: '总公司'
      },
      {
        value: 4,
        label: '分公司'
      }
      ],
      rules: {
        // status: {
        //   required: true,
        //   message: this.$t('rules.require'),
        //   trigger: 'blur'
        // }
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
    initTransportlinetype() {
      this.transportlinetype = {
        name: '',
        typeNumber: '',
        startAgencyType: '',
        endAgencyType: ''
      }
    },
    setTransportlinetype(transportlinetype) {
      this.transportlinetype = { ...transportlinetype }
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
      transportlinetypeApi.save(this.transportlinetype).then(response => {
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
      transportlinetypeApi.update(this.transportlinetype.id, this.transportlinetype).then(response => {
        const res = response.data
        console.log(res)
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

