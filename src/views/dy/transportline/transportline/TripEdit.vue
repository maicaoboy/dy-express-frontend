<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :type="type"
    :visible.sync="isVisible"
    top="50px"
  >
    <el-form ref="form" :model="transportrip" :rules="rules" label-position="right" label-width="100px">
      <el-form-item :label="$t('table.transportline.name')" prop="linename">
        <el-input v-model="transportline.name" />
      </el-form-item>
      <el-form-item :label="$t('table.transportrip.name')" prop="name">
        <el-input v-model="transportrip.name" />
      </el-form-item>
      <el-form-item :label="$t('table.transportrip.departureTime')" prop="departureTime">
        <el-time-select
          v-model="transportrip.departureTime"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '24:00'
          }"
          :placeholder="$t('table.transportrip.searchdepartureTime')"
        />
        <el-select v-model="transportrip.period" :placeholder="$t('table.transportrip.searchperiod')">
          <el-option
            v-for="item in transportriptypeOptions"
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
import transportripApi from '@/api/transporttrip'

export default {
  name: 'TransportripEdit',
  components: {},
  props: {
    tripEditVisible: {
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
    }
  },
  data() {
    return {
      transportrip: {},
      transportriptypeOptions: [],
      transportline: {},
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
        return this.tripEditVisible
      },
      set() {
        this.close()
        this.reset()
      }
    },
    title() {
      return this.type === 'add'
        ? this.$t('table.transportrip.add')
        : this.$t('table.transportrip.edit')
    },
    enums() {
      return this.$store.state.common.enums
    }
  },
  watch: {},
  mounted() {
    this.initOptions()
  },
  methods: {
    initOptions() {
      if (this.transportriptypeOptions.length > 0) {
        return
      }
      this.transportriptypeOptions.push({
        value: 1,
        label: '天'
      })
    },
    inittransportrip() {
      this.transportrip = {
        name: '',
        typeNumber: '',
        startAgencyType: '',
        endAgencyType: ''
      }
    },
    settransportrip(transportrip) {
      this.transportrip = { ...transportrip }
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
      this.transportrip.transportLineId = this.transportline.id
      console.log(this.transportrip)
      transportripApi.save(this.transportrip).then(response => {
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
      transportripApi.update(this.transportrip).then(response => {
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

