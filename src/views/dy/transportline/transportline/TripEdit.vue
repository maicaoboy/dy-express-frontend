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
      <el-form-item v-show="type =='addTruck'" :label="$t('table.transportline.arrangetruck')" prop="arrangetruck">
        <el-tree
          ref="truckData"
          :data="truckData"
          show-checkbox
          default-expand-all
          node-key="id"
          highlight-current
        />
      </el-form-item>
      <el-form-item v-show="type =='addDriver'" :label="$t('table.transportline.arrangedriver')" prop="arrangedriver">
        <el-table
          ref="driverData"
          :data="truckDataSelected"
          style="width: 100%"
        >
          <el-table-column
            prop="label"
            label="车辆信息"
          />
          <el-table-column
            prop="userId"
            label="司机"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.userId" :placeholder="$t('table.transportline.arrangedriver')">
                <el-option v-for="item in driverData" :key="item.userId" :label="item.label" :value="item.userId" />
              </el-select>
            </template>
          </el-table-column>
        </el-table>
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
    },
    truckData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      driverData: [],
      truckDataSelected: [],
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
      } else if (that.type === 'edit') {
        that.update()
      } else if (that.type === 'addTruck') {
        that.addTruck()
      } else if (that.type === 'addDriver') {
        that.addDriver()
      }
    },
    save() {
      const that = this
      this.transportrip.transportLineId = this.transportline.id
      console.log(this.transportrip)
      transportripApi.savetrip(this.transportrip).then(response => {
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
    addTruck() {
      const that = this
      const checkedKeys = this.$refs.truckData.getCheckedKeys()
      console.log(checkedKeys)
      var trucklinedto = []
      for (var i = 0; i < checkedKeys.length; i++) {
        trucklinedto.push({
          truckId: checkedKeys[i],
          transportLineId: this.transportline.id
        })
      }
      transportripApi.save(this.transportrip.id, trucklinedto).then(response => {
        const res = response.data
        if (res.isSuccess) {
          that.isVisible = false
          that.$message({
            message: that.$t('tips.updateSuccess'),
            type: 'success'
          })
          that.$emit('success')
        }
      })
    },
    dsTypeChange(value) {
      this.orgHidden = value !== 'CUSTOMIZE'
    },
    setSeleted(seleted) {
      this.$refs.truckData.setCheckedKeys(seleted)
    },
    settruckDataSelected(data) {
      this.truckDataSelected = data
    },
    setDriverData(driverData) {
      this.driverData = driverData
    },
    addDriver() {
      const that = this
      const relationshipDto = []
      this.truckDataSelected.forEach(truck => {
        const data = {}
        data.id = that.transportrip.id
        data.truckId = truck.id
        data.userId = truck.userId
        relationshipDto.push(data)
      })
      transportripApi.save(this.transportrip.id, relationshipDto).then(response => {
        const res = response.data
        if (res.isSuccess) {
          that.isVisible = false
          that.$message({
            message: that.$t('tips.updateSuccess'),
            type: 'success'
          })
          that.$emit('success')
        }
      })
    }
  }
}
</script>
      <style lang="scss" scoped>
      </style>

