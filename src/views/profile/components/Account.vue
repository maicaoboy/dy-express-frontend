<template>
  <el-form
    ref="form"
    :model="user"
    :rules="rules"
    class="form"
    label-position="right"
    label-width="80px"
  >
    <el-form-item :label="$t('table.user.name')" prop="email">
      <el-input v-model="user.name" />
    </el-form-item>
    <el-form-item :label="$t('table.user.email')" prop="email">
      <el-input v-model="user.email" />
    </el-form-item>
    <el-form-item :label="$t('table.user.mobile')" prop="mobile">
      <el-input v-model="user.mobile" />
    </el-form-item>
    <el-form-item :label="$t('table.user.sex')" prop="sex">
      <el-select v-model="user.sex.code" placeholder value>
        <el-option v-for="(item, key, index) in enums.Sex" :key="index" :label="item" :value="key" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('table.user.workDescribe')" prop="workDescribe">
      <el-input v-model="user.workDescribe" rows="3" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button plain type="primary" @click="submit">
        {{ $t('common.edit') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { validMobile } from '@/utils/my-validate'
import userApi from '@/api/User.js'

export default {
  components: {},
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {
      rules: {
        email: {
          type: 'email',
          message: this.$t('rules.email'),
          trigger: 'blur'
        },
        mobile: {
          validator: (rule, value, callback) => {
            if (value !== '' && !validMobile(value)) {
              callback(this.$t('rules.mobile'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        },
        sex: {
          required: true,
          message: this.$t('rules.require'),
          trigger: 'change'
        },
        workDescribe: { max: 255, message: '内容超过255字符', trigger: 'blur' }
      }
    }
  },
  computed: {
    enums() {
      return this.$store.state.common.enums
    }
  },
  mounted() {},
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const temp = { ...this.user }
          temp.account = temp.status = temp.avatar = temp.avatar = null
          userApi.update({ ...temp }).then(response => {
            const res = response.data
            if (res.isSuccess) {
              this.$message({
                message: this.$t('tips.updateSuccess'),
                type: 'success'
              })
            }
            this.$store.commit('account/setUser', this.user)
            console.log('bbbbbbbbbb', this.user)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.form {
  padding: 10px 0 0 0;
}
</style>
