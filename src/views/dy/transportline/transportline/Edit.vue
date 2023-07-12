<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :type="type"
    :visible.sync="isVisible"
    top="50px"
  >
    <el-form ref="form" :model="transportline" :rules="rules" label-position="right" label-width="100px">
      <el-form-item :label="$t('table.transportline.lineNumber')" prop="typeNumber">
        <el-input v-model="transportline.lineNumber" />
      </el-form-item>
      <el-form-item :label="$t('table.transportline.name')" prop="name">
        <el-input v-model="transportline.name" />
      </el-form-item>
      <el-form-item :label="$t('table.transportline.transportlinetype')" prop="transportlinetype">
        <el-select v-model="transportline.transportLineTypeId" :placeholder="$t('table.select')">
          <el-option
            v-for="item in transportlinetypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.transportline.startAgency')" prop="startAgency">
        <el-select v-model="transportline.startAgencyId" :placeholder="$t('table.select')">
          <el-option
            v-for="item in agencyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.transportline.endAgency')" prop="endAgency">
        <el-select v-model="transportline.endAgencyId" :placeholder="$t('table.select')">
          <el-option
            v-for="item in agencyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.transportline.lineNumber')" prop="typeNumber">
        <el-input v-model="transportline.lineNumber">
          <template slot="append">
            千米
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('table.transportline.cost')" prop="cost">
        <el-input v-model="transportline.cost">
          <template slot="append">
            元
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('table.transportline.estimatedTime')" prop="estimateTime">
        <el-input v-model="transportline.estimatedTime">
          <template slot="append">
            分钟
          </template>
        </el-input>
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
import transportlineApi from '@/api/transportline'

export default {
  name: 'TransportlineEdit',
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'add'
    },
    orgList: {
      type: Array,
      default: () => []
    },
    transportlinetypeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      transportline: {},
      agencyOptions: [],
      transportlinetypeOptions: [],
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
    initOptions() {
      for (const item of this.orgList) {
        this.agencyOptions.push({
          value: item.id,
          label: item.name
        })
      }
      for (const item of this.transportlinetypeList) {
        this.transportlinetypeOptions.push({
          value: item.id,
          label: item.name
        })
      }
    },
    inittransportline() {
      this.transportline = {
        name: '',
        typeNumber: '',
        startAgencyType: '',
        endAgencyType: ''
      }
    },
    settransportline(transportline) {
      this.transportline = { ...transportline }
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
      transportlineApi.save(this.transportline).then(response => {
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
      transportlineApi.update(this.transportline.id, this.transportline).then(response => {
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

