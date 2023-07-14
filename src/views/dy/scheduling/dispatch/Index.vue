<template>
  <div class="scheduler">
    <h1 class="page-title">任务调度</h1>
    <el-row v-for="organization in organizations" :key="organization.id">
      <el-col :span="24">
        <el-card shadow="hover">
          <h2>{{ organization.name }}</h2>
          <el-table :data="organization.tasks" style="width: 100%">
            <el-table-column prop="name" label="任务名称"></el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template slot-scope="scope">
                <el-tag :type="getStatusTagType(scope.row.status)">
                  {{ getStatusText(scope.row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button :type="getStatusButtonStyle(scope.row.status)" size="mini" icon="el-icon-refresh"
                  @click="toggleTaskStatus(organization.id, scope.row.id)">
                  {{ getTaskActionButtonText(scope.row.status) }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      organizations: [
        {
          id: 1,
          name: '机构 A',
          tasks: [
            { id: 1, name: '任务 A1', status: true },
            { id: 2, name: '任务 A2', status: false },
          ],
        },
        {
          id: 2,
          name: '机构 B',
          tasks: [
            { id: 3, name: '任务 B1', status: true },
            { id: 4, name: '任务 B2', status: true },
          ],
        },
        // ...
      ],
    };
  },
  methods: {
    toggleTaskStatus(organizationId, taskId) {
      const organization = this.organizations.find(org => org.id === organizationId);
      if (organization) {
        const task = organization.tasks.find(t => t.id === taskId);
        if (task) {
          task.status = !task.status;
        }
      }
    },
    getStatusTagType(status) {
      return status ? 'success' : 'info';
    },
    getStatusText(status) {
      return status ? '运行中' : '已暂停';
    },
    getStatusButtonStyle(status) {
      return status ? 'warning' : 'success';
    },
    getTaskActionButtonText(status) {
      return status ? '暂停任务' : '立即执行';
    },
  },
};
</script>

<style scoped>
.page-title {
  text-align: center;
  margin-bottom: 30px;
}

.scheduler {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-card {
  margin-bottom: 20px;
  width: 70%;
}

h2 {
  margin-bottom: 10px;
}
</style>