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
                        <el-table-column prop="beanName" label="bean名称" width="150">
                        </el-table-column>
                        <el-table-column prop="params" label="参数" width="120">
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
                        <el-table-column fixed="right" label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
                <el-card style="height: 200px;">
                    <h1>新增任务</h1>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog :visible="formVisible" @close="closeFormDialog" title="任务执行信息">
            <el-form ref="myForm" label-width="100px">
                <el-table :data="formData.items" style="width: 100%">
                    <el-table-column label="任务id" prop="jobId"></el-table-column>
                    <el-table-column label="执行情况" prop="error"></el-table-column>
                    <el-table-column label="beanName" prop="beanName"></el-table-column>
                    <el-table-column label="耗费时间(秒)" prop="times"></el-table-column>
                    <el-table-column label="任务执行时间" prop="createDate"></el-table-column>
                    <!-- 其他表格列 -->
                </el-table>
                <el-pagination background layout="prev, pager, next" :total="parseInt(formData.counts)"
                    :current-page="formData.page" :page-size="formData.pageSize" @current-change="handlePageChange">
                </el-pagination>
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
                ]
            }
        }
    },
    mounted() {
        this.initSchedules()
        this.initOrgTree()
    },
    methods: {
        initSchedules() {
            dispatchApi.page(this.pagination).then(response => {
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
        initOrgTree() {
            orgApi.allTree({}).then(response => {
                const res = response.data
                this.orgTree = res.data
            })
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
            // this.$refs.form.clearValidate()
        },
        filterNode(value, data) {
            if (!value) return true
            // return data.label.indexOf(value) !== -1
        },
        closeFormDialog() {
            this.$refs.myForm.resetFields();
            this.formVisible = false;
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
        }
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
  
