<template>
    <div class="org">
        <el-row :gutter="10">
            <el-col :sm="8" :xs="10">
                <div class="app-container">
                    <div class="filter-container">
                        <el-input v-model="name" :placeholder="$t('table.org.name')" class="filter-item search-item"
                            clearable />
                        <el-button style="background-color: #8dc149;color: #fff;border-radius: 5px;border-color: #DCDFE6;"
                            @click="search">
                            {{ $t('table.search') }}
                        </el-button>
                        <el-button style="background-color: #fff;color: #606266;border-radius: 5px;border-color: #DCDFE6;"
                            @click="reset">
                            {{ $t('table.reset') }}
                        </el-button>
                    </div>
                    <el-tree ref="orgTree" :check-strictly="true" :data="orgTree" :filter-node-method="filterNode"
                        default-expand-all highlight-current node-key="id" show-checkbox @node-click="nodeClick" />
                </div>
            </el-col>
            <el-col :sm="16" :xs="24">
                <el-card>
                    <h1>任务列表</h1>
                    <el-table :data="tableData.records" border style="width: 100%" :cell-style="{ 'text-align': 'center' }"
                        :header-cell-style="{ 'text-align': 'center' }">
                        <el-table-column prop="beanName" label="任务名称" width="150">
                        </el-table-column>
                        <el-table-column prop="params" label="规划方式" width="120">
                            <template slot-scope="scope">
                                {{ formatParams(scope.row.params) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="cronExpression" label="cron表达式" width="120">
                        </el-table-column>
                        <el-table-column prop="status" label="任务状态" width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status === 1">
                                    <el-tag type="success">正常</el-tag>
                                </span>
                                <span v-else>
                                    <el-tag type="danger">暂停</el-tag>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="备注" width="120">
                        </el-table-column>
                        <el-table-column prop="businessId" label="机构id" width="120">
                        </el-table-column>
                        <el-table-column prop="createDate" label="创建时间" width="120">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                <el-button @click="updateDialogClick(scope.row)" type="text" size="small">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
                <el-card>
                    <h1>新增任务</h1>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="机构名称" prop="orgName">
                            <el-input v-model="ruleForm.orgName" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="任务名称" prop="region">
                            <el-input v-model="ruleForm.region" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="Cron表达式" prop="cronExpression">
                            <el-input v-model="ruleForm.cronExpression"></el-input>
                        </el-form-item>
                        <el-form-item label="规划方式" prop="params">
                            <el-select v-model="ruleForm.params">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="任务状态">
                            <el-radio v-model="ruleForm.status" label="1">
                                <el-tag type="success">正常</el-tag>
                            </el-radio>
                            <el-radio v-model="ruleForm.status" label="2">
                                <el-tag type="info">暂停</el-tag>
                            </el-radio>
                        </el-form-item>
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="ruleForm.remark"></el-input>
                        </el-form-item>
                        <el-form-item style="text-align: center">
                            <el-button style=" background-color: #035035;color: #fff;" @click="submit">新增</el-button>
                        </el-form-item>

                    </el-form>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog :visible="formVisible" @close="closeFormDialog" ref="myDialog" title="任务执行信息">
            <el-form ref="myForm" label-width="100px">
                <el-button @click="startNow()" type="success" size="small">立即执行</el-button>
                <el-button @click="pause()" type="danger" size="small">暂停任务</el-button>
                <el-button @click="resume()" type="info" size="small">恢复</el-button>
                <el-table :data="formData.items" style="width: 100%">
                    <el-table-column label="任务id" prop="jobId"></el-table-column>
                    <el-table-column label="执行情况" prop="error"></el-table-column>
                    <el-table-column label="任务名称" prop="beanName"></el-table-column>
                    <el-table-column label="耗费时间(秒)" prop="times"></el-table-column>
                    <el-table-column label="任务执行时间" prop="createDate"></el-table-column>
                    <!-- 其他表格列 -->
                </el-table>
                <el-pagination background layout="prev, pager, next" :total="parseInt(formData.counts)"
                    :current-page="formData.page" :page-size="formData.pageSize" @current-change="handlePageChange">
                </el-pagination>
            </el-form>
        </el-dialog>
        <el-dialog :visible="updateVisible" @close="closeUpdateDialog" ref="updateDialog">
            <h1>修改任务</h1>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="机构名称" prop="orgName">
                    <el-input v-model="ruleForm.orgName" readonly></el-input>
                </el-form-item>
                <el-form-item label="任务名称" prop="region">
                    <el-input v-model="ruleForm.region" readonly></el-input>
                </el-form-item>
                <el-form-item label="Cron表达式" prop="cronExpression">
                    <el-input v-model="ruleForm.cronExpression"></el-input>
                </el-form-item>
                <el-form-item label="规划方式" prop="params">
                    <el-select v-model="ruleForm.params">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="任务状态">
                    <el-radio v-model="ruleForm.status" label="1">
                        <el-tag type="success">正常</el-tag>
                    </el-radio>
                    <el-radio v-model="ruleForm.status" label="2">
                        <el-tag type="info">暂停</el-tag>
                    </el-radio>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="ruleForm.remark"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button style=" background-color: #80bda8;color: #fff;" @click="update">修改</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import orgApi from '@/api/Org.js'
import dispatchApi from '@/api/Dispatch.js'
export default {
    name: 'OrgManager',
    data() {
        return {
            formVisible: false,
            updateVisible: false,
            formData: {
                page: 1,
                pageSize: 10
            },
            tableData: {
                total: 0,
            },
            pagination: {
                page: 1,
                pageSize: 10
            },
            name: '',
            orgTree: [],
            org: this.initOrg(),
            job: this.initJob(),
            ruleForm: this.initRuleForm(),
            currentSchedule: {},
            rules: {
                name: [
                    {
                        required: true,
                        message: this.$t('rules.require'),
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 255,
                        message: this.$t('rules.range3to10'),
                        trigger: 'blur'
                    }
                ],
                orgName: [
                    { required: true, message: "请先选择部门", trigger: "blur" }
                ],
                cronExpression: [
                    { required: true, message: "请输入Cron表达式", trigger: "blur" },
                    {
                        pattern:
                            "^\\s*($|#|\\w+\\s*=|(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[01]?\\d|2[0-3])(?:(?:-|\\/|\\,)(?:[01]?\\d|2[0-3]))?(?:,(?:[01]?\\d|2[0-3])(?:(?:-|\\/|\\,)(?:[01]?\\d|2[0-3]))?)*)\\s+(\\?|\\*|(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?(?:,(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?)*)\\s+(\\?|\\*|(?:[1-9]|1[012])(?:(?:-|\\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?(?:,(?:[1-9]|1[012])(?:(?:-|\\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?)*|\\?|\\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\\s+(\\?|\\*|(?:[0-6])(?:(?:-|\\/|\\,|#)(?:[0-6]))?(?:L)?(?:,(?:[0-6])(?:(?:-|\\/|\\,|#)(?:[0-6]))?(?:L)?)*|\\?|\\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\\s)+(\\?|\\*|(?:|\\d{4})(?:(?:-|\\/|\\,)(?:|\\d{4}))?(?:,(?:|\\d{4})(?:(?:-|\\/|\\,)(?:|\\d{4}))?)*))$",
                        message: "请输入正确的Cron表达式"
                    }
                ],
                params: [
                    { required: true, message: "请选择规划方式", trigger: "blur" }
                ]
            },
            options: [{
                value: 'distance',
                label: '路线最近'
            },
            {
                value: 'cost',
                label: '成本最低'
            },
            {
                value: 'estimatedTime',
                label: '用时最少'
            },
            {
                value: 'transfer',
                label: '中转次数最少'
            },
            ],
        }
    },
    mounted() {
        this.initSchedules(123)
        this.initOrgTree()
    },
    methods: {
        initSchedules(businessId) {
            const dataDto = {
                businessId: businessId,
                page: this.pagination.page,
                pageSize: this.pagination.pageSize
            }
            dispatchApi.page(dataDto).then(response => {
                this.tableData = response.data.data
                console.log(this.tableData)
            })
        },
        initOrg() {
            return {
                id: '',
                abbreviation: '',
                name: '',
                parentId: 0,
                status: true,
                describe: '',
                sortValue: 0,
                orgType: 0,
                areaId: 0,
                mutiPoints: []
            }
        },
        initJob() {
            return {
                JobId: '',
                beanName: '',
                cronExpression: '',
                remark: '',
                orgId: 0
            }
        },
        initRuleForm() {
            return {
                orgName: '',
                region: '调度任务',
                cronExpression: '',
                params: '',
                status: '1',
                remark: ''
            }
        },
        initOrgTree() {
            orgApi.allTree({}).then(response => {
                const res = response.data
                this.orgTree = res.data
            })
        },
        formatParams(params) {
            if (params == 'transfer') {
                return '中转次数最少'
            }
            if (params == 'estimatedTime') {
                return '用时最少'
            }
            if (params == 'cost') {
                return '成本最低'
            }
            if (params == 'distance') {
                return '路线最近'
            }
        },
        search() {
            this.$refs.orgTree.filter(this.name)
        },
        reset() {
            this.initOrgTree()
            this.name = ''
            this.resetForm()
        },
        nodeClick(data) {
            this.org = { ...data }
            this.initSchedules(data.id)
            this.resetForm(this.org.label)
            // this.$refs.form.clearValidate()
        },
        filterNode(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },
        closeFormDialog() {
            this.formData.page = 1
            this.formData.pageSize = 10
            // this.$refs.myForm.resetFields();
            this.formVisible = false;
        },
        closeUpdateDialog() {
            this.resetForm(this.org.name)
            this.updateVisible = false
        },
        handlePageChange(page) {
            const dataDto = {
                orgId: this.job.orgId,
                jobId: this.job.jobId,
                page: page,
                pageSize: this.formData.pageSize,
            }
            dispatchApi.logPage(dataDto).then(response => {
                console.log(response)
                this.formData = response.data
            })
        },
        handleClick(data) {
            this.job.orgId = data.businessId
            this.job.jobId = data.id
            const dataDto = {
                orgId: data.businessId,
                jobId: data.id,
                page: this.formData.page,
                pageSize: this.formData.pageSize,
            }
            dispatchApi.logPage(dataDto).then(response => {
                console.log(response)
                this.formData = response.data
                this.formVisible = true
            })
        },
        updateDialogClick(data) {
            this.currentSchedule = data
            this.ruleForm.cronExpression = data.cronExpression
            this.ruleForm.params = data.params
            if (data.status == 1) {
                this.ruleForm.status = '1'
            } else {
                this.ruleForm.status = '0'
            }
            this.updateVisible = true
        },

        update() {
            console.log(this.currentSchedule)
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    // 表单校验通过，可以提交表单数据
                    dispatchApi.update(this.currentSchedule).then(response => {
                        console.log(response)
                        this.$message.success('成功修改任务')
                        this.initSchedules(this.org.id)
                        this.resetForm(this.org.label)
                        this.updateVisible = false
                    })
                } else {
                    // 表单校验不通过，处理错误信息

                }
            });
        },

        submit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    // 表单校验通过，可以提交表单数据
                    const dataDto = {
                        beanName: 'dispatchTask',
                        params: this.ruleForm.params,
                        cronExpression: this.ruleForm.cronExpression,
                        remark: this.ruleForm.remark,
                        businessId: this.org.id
                    }
                    dispatchApi.save(dataDto).then(response => {
                        this.$message.success(this.org.name + '新增了一个任务')
                        this.initSchedules(this.org.id)
                        this.resetForm(this.org.label)
                    })
                } else {
                    // 表单校验不通过，处理错误信息

                }
            });
        },
        resetForm(orgName) {
            this.$refs.ruleForm.resetFields();
            this.ruleForm.orgName = orgName
            this.ruleForm.cronExpression = ''
            this.ruleForm.params = ''
            this.status = '1'
            this.remark = ''
        },
        startNow() {
            dispatchApi.run(this.job.jobId).then(response => {
                console.log(response)
                this.closeFormDialog()
                this.$message.success('启动成功')
            })
        },
        pause() {
            dispatchApi.pause(this.job.jobId).then(response => {
                console.log(response)
                this.$message.success('任务已暂停')
            })
        },
        resume() {
            dispatchApi.resume(this.job.jobId).then(response => {
                console.log(response)
                this.$message.success('任务已恢复')
            })
        },
    }
}
</script>
<style lang="scss">
.addEdit {
    background-color: #8dc149;
    color: #fff;
    border-radius: 5px;

    &:hover {
        background-color: #8dc149;
        color: #fff;
        border-color: #dcdfe6;
    }
}

.org {
    margin: 10px;

    .app-container {
        margin: 0 0 10px 0 !important;
    }
}

.el-card.is-always-shadow {
    box-shadow: none;
}

.el-card {
    border-radius: 0;
    border: none;

    .el-card__header {
        background: #f8faff;
        // padding: 10px 20px !important;
        border-bottom: 0px solid #e6ebf5;
    }
}

.el-card {
    margin-bottom: 20px; //下边距
}
</style>
  
