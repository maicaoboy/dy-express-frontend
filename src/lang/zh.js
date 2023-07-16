export default {
  route: {
    dashboard: '系统主页',
    profile: '个人中心'
  },
  navbar: {
    setting: '系统设置',
    logOut: '退出登录',
    profile: '个人中心',
    theme: '换肤',
    size: '布局大小',
    deleteCache: '清除缓存'
  },
  login: {
    title: '微服务权限管理平台',
    logIn: '立即登录',
    tenant: '企业',
    username: '账号',
    password: '密码',
    code: '验证码',
    ortherLoginType: '其他登录方式',
    chooseToSignIn: '选择以下账号登录：',
    type: {
      up: '账号密码登录',
      social: '第三方账号登录'
    }
  },
  documentation: {
    documentation: '项目文档',
    github: '项目地址'
  },
  table: {
    driverwork: {
      id: '作业编号',
      driverName: '司机姓名',
      status: '作业状态',
      startTime: '计划发车时间',
      actstartTime: '实际发车时间',
      endTime: '实际到达时间',
      taskTransportId: '运输任务单编号'
    },
    transportrip: {
      name: '车次名称',
      searchname: '请输入车次名称',
      departureTime: '发车时间',
      searchdepartureTime: '请选择发车时间',
      period: '周期',
      searchperiod: '请选择周期',
      add: '新增车次',
      edit: '修改车次'
    },
    transportline: {
      lineNumber: '线路编号',
      searchlineNumber: '请输入运输线路编号',
      add: '新增线路',
      typeNumber: '类型编码',
      searchtypeNumber: '请选择运输线路类型编码',
      name: '线路名称',
      searchname: '请输入运输线路类型名称',
      agencyType: '机构类型',
      startAgency: '起始机构',
      endAgency: '目的机构',
      addtrip: '新增车次',
      transportlinetype: '运输线路类型',
      distance: '距离',
      cost: '成本',
      estimatedTime: '预计时间',
      arrangedriver: '安排司机',
      arrangetruck: '安排车辆'
    },
    transportlinetype: {
      typeNumber: '类型编码',
      searchtypeNumber: '请输入运输线路类型编码',
      name: '线路名称',
      searchname: '请输入运输线路类型名称',
      agencyType: '机构类型',
      startAgencyType: '起始机构类型',
      endAgencyType: '目的机构类型',
      searchagencyType: '请选择机构类型',
      addtrasportlinetype: '新增运输线路类型'
    },
    driver: {
      name: '司机姓名',
      phone: '司机电话',
      id: '司机编号',
      org: '司机所属机构'
    },
    truck: {
      truckNumber: '车牌号',
      truckType: '车辆类型',
      truckid: '车辆编号',
      allowableLoad: '准载重量（千克）',
      allowableVolume: '准载体积（立方米）',
      tripid: '车次编号',
      status: '状态',
      brand: '车辆品牌',
      add: '新增车辆',
      edit: '修改车辆信息',
      line: '所属线路'
    },
    order: {
      orderNo: '订单号',
      orderStatus: '运输状态',
      orderType: '订单状态',
      payStatus: '支付状态',
      senderName: '发货人姓名',
      senderPhone: '发货人电话',
      senderAddress: '发货人地址',
      senderAddressDetail: '发货人详细地址',
      receiverName: '收货人姓名',
      receiverPhone: '收货人电话',
      receiverAddress: '收货人地址',
      receiverAddressDetail: '收货人详细地址',
      orderTime: '下单时间',
      transportNo: '运单号'
    },
    transport: {
      transportNo: '运单号',
      orderNo: '订单号',
      transportStatus: '运单状态',
      schedulingStatus: '调度状态',
      senderName: '发货人姓名',
      senderPhone: '发货人电话',
      senderAddress: '发货人地址',
      senderAddressDetail: '发货人详细地址',
      receiverName: '收货人姓名',
      receiverPhone: '收货人电话',
      receiverAddress: '收货人地址',
      receiverAddressDetail: '收货人详细地址',
      transportTime: '创建时间'
    },
    transportTask: {
      transportTaskNo: '运输任务单号',
      transportNo: '运单号',
      transportTripId: '车次id',
      startAgencyId: '起始机构',
      endAgencyId: '目标机构',
      truckId: '车辆id',
      status: '运输任务单状态',
      assignStatus: '分配状态',
      planDepatureTime: '预计离开时间',
      actualDepatureTime: '实际离开时间',
      planArrivalTime: '预计到达时间',
      actualArrivalTime: '实际到达时间',
      planPickUpTime: '预计提货时间',
      actualPickUpTime: '实际提货时间',
      planDeliveryTime: '预计交付时间',
      actualDeliveryTime: '实际交付时间',
      createTime: '创建时间'
    },
    goodsTypeSearch: {
      name: '货物类型名称'
    },
    goodsType: {
      code: '货物类型编码',
      name: '货物类型名称',
      defaultWeight: '默认重量',
      defaultVolume: '默认体积',
      describe: '描述',
      operate: '操作',
      truckType: '运输车型',
      add: '新增货物类型',
      status: '状态'
    },
    tenant: {
      code: '企业编码',
      name: '企业名称',
      type: '类型',
      status: '状态',
      duty: '责任人',
      expirationTime: '有效期',
      logo: 'logo',
      describe: '企业简介',
      passwordExpire: '密码有效期',
      isMultipleLogin: '是否允许多地登录',
      passwordErrorNum: '密码输错次数',
      passwordErrorLockTime: '账号锁定时间'
    },
    user: {
      account: '账号',
      name: '姓名',
      password: '密码',
      orgId: '组织',
      stationId: '岗位',
      email: '邮箱',
      sex: '性别',
      status: '状态',
      mobile: '电话',
      avatar: '头像',
      workDescribe: '个人描述',
      passwordErrorLastTime: '最后一次输错密码时间',
      passwordErrorNum: '密码错误次数',
      passwordExpireTime: '密码过期时间',
      lastLoginTime: '最后登录时间',
      createTime: '创建时间',
      updateTime: '修改时间',
      oldPassword: '旧密码',
      newPassword: '新密码',
      confirmPassword: '确认密码',
      social: '第三方账号'
    },
    role: {
      code: '编码',
      name: '角色名称',
      describe: '角色描述',
      status: '状态',
      readonly: '是否内置',
      createTime: '创建时间',
      dsType: '数据范围',
      orgList: '组织'
    },
    menu: {
      id: 'ID',
      name: '名称',
      describe: '描述',
      code: '权限编码',
      isPublic: '是否公有',
      path: '路由URI',
      type: '类型',
      component: '组件',
      isEnable: '是否启用',
      sortValue: '排序',
      parentId: '上级ID',
      icon: '图标',
      group: '分组'
    },
    resource: {
      code: '编码',
      name: '名称',
      method: '请求方式',
      url: '请求地址',
      describe: '描述'
    },
    org: {
      name: '部门名称',
      abbreviation: '简称',
      orgtype: '机构类型',
      describe: '描述',
      parentId: '上级ID',
      sortValue: '排序',
      status: '状态',
      select: '选择机构类型'
    },
    station: {
      name: '岗位名称',
      describe: '描述',
      orgId: '组织',
      status: '状态'
    },
    optLog: {
      requestIp: 'IP',
      type: '类型',
      userName: '操作人',
      description: '操作描述',
      classPath: '类路径',
      actionMethod: '请求方法',
      requestUri: '请求地址',
      httpMethod: '请求类型',
      params: '方法参数',
      result: '返回值',
      exDesc: '异常详情信息',
      consumingTime: '消耗时间',
      startTime: '开始时间',
      finishTime: '完成时间',
      ua: '浏览器请求头'
    },
    loginLog: {
      userName: '姓名',
      account: '账号',
      requestIp: 'IP',
      description: '描述',
      loginDate: '登录时间',
      ua: '浏览器请求头',
      browser: '浏览器',
      browserVersion: '浏览器版本',
      operatingSystem: '操作系统',
      location: '地区'
    },
    attachment: {
      bizId: '业务ID',
      bizType: '业务类型',
      dataType: '数据类型',
      submittedFileName: '文件名',
      group: '组',
      path: '路径',
      relativePath: '相对路径',
      url: '访问链接',
      fileMd5: 'md5',
      contextType: '类型',
      filename: '唯一文件名',
      ext: '后缀',
      size: '大小',
      orgId: '组织',
      icon: '图标'
    },
    smsTemplate: {
      providerType: '类型',
      appId: '应用ID',
      appSecret: '应用密码',
      url: 'SMS服务域名',
      customCode: '模板编码',
      name: '模板名称',
      content: '模板内容',
      templateParams: '模板参数',
      templateCode: '模板CODE',
      signName: '模板签名',
      templateDescribe: '模板描述'
    },
    smsTask: {
      templateId: '短信模板',
      status: '执行状态',
      sourceType: '来源类型',
      receiver: '接收者',
      topic: '主题',
      templateParams: '模板参数',
      sendTime: '发送时间',
      content: '发送内容',
      draft: '是否草稿'
    },
    smsSendStatus: {
      taskId: '任务',
      sendStatus: '发送状态',
      receiver: '接收者手机号',
      bizId: '发送回执',
      ext: '发送返回',
      code: '状态码',
      message: '状态码的描述',
      fee: '计费条数'
    },
    msgs: {
      bizType: '业务类型',
      bizId: '业务ID',
      msgsCenterType: '消息类型',
      title: '标题',
      content: '内容',
      author: '作者',
      handlerUrl: '处理地址',
      handlerParams: '处理参数',
      isSingleHandle: '是否单人处理',
      isDelete: '是否删除',
      isRead: '状态',
      readTime: '读消息的时间'
    },
    systemApi: {
      code: '接口编码',
      name: '接口名称',
      describe: '资源描述',
      requestMethod: '请求方式',
      contentType: '响应类型',
      serviceId: '服务ID',
      path: '请求路径',
      status: '状态',
      isPersist: '保留数据',
      isAuth: '是否需要认证',
      isOpen: '是否公开',
      className: '类名',
      methodName: '方法名'
    },
    application: {
      appKey: 'appKey',
      appSecret: 'appSecret',
      website: '官网',
      name: '应用名称',
      icon: '应用图标',
      appType: '类型',
      describe: '备注',
      status: '状态'
    },
    dictionary: {
      code: '编码',
      name: '名称',
      describe: '描述',
      status: '状态'
    },
    dictionaryItem: {
      dictionaryId: '字典ID',
      dictionaryCode: '字典编码',
      code: '编码',
      name: '名称',
      describe: '描述',
      status: '状态',
      sortValue: '排序'
    },
    receiveRecord: {
      customerName: '客户端',
      url: '请求地址',
      method: '请求方式',
      requestHeader: '请求头',
      requestParams: '请求参数',
      responseHeader: '返回头',
      responseParams: '返回参数',
      beginTime: '请求开始时间',
      endTime: '请求结束时间',
      useTime: '耗时(毫秒)',
      ipAddr: 'IP地址'
    },
    sendRecord: {
      platformName: '平台名称',
      apiName: '接口名称',
      version: '版本',
      method: '请求方式',
      requestHeader: '请求头',
      requestParams: '请求参数',
      responseHeader: '返回头',
      responseParams: '返回参数',
      beginTime: '请求开始时间',
      endTime: '请求结束时间',
      useTime: '耗时(毫秒)'
    },
    platform: {
      platformId: '平台标识',
      profiles: '类型',
      name: '名称',
      method: '请求方式',
      baseUrl: '地址',
      version: '版本',
      username: '用户',
      password: '密码',
      params: '其他参数',
      createTime: '创建时间'
    },
    customer: {
      name: '客户名称',
      username: '用户名',
      password: '秘钥',
      contacts: '联系人',
      contactsPhone: '联系人电话',
      rate: '服务费率',
      status: '状态',
      loginTime: '最后认证时间',
      createTime: '创建时间'
    },
    gen: {
      config: {
        author: '作者名称',
        basePackage: '基础包名',
        entityPackage: 'entity包名',
        mapperPackage: 'mapper包名',
        mapperXmlPackage: 'mapperXml包名',
        servicePackage: 'service包名',
        serviceImplPackage: 'serviceImpl包名',
        controllerPackage: 'controller包名',
        isTrim: '是否去除表前缀',
        trimValue: '表前缀'
      },
      generate: {
        tableName: '表名',
        remark: '备注',
        dataRows: '数据量（行）',
        createTime: '创建时间',
        updateTime: '更新时间'
      }
    },
    eximport: {
      field1: '字段1',
      field2: '字段2',
      field3: '字段3',
      createTime: '导入时间'
    },
    status: '状态',
    refresh: '刷新',
    operation: '操作',
    search: '搜索',
    reset: '重置',
    more: '更多',
    add: '添加',
    export: '导出',
    import: '导入',
    upload: '上传',
    download: '下载',
    templateDownload: '模板下载',
    delete: '删除',
    resetPassword: '密码重置',
    openInNewPage: '新页面打开',
    createTime: '创建时间',
    updateTime: '修改时间',
    select: '请选择',
    serial: '序号',
    edit: '编辑',
    details: '查看详情'
  },
  tagsView: {
    refresh: '刷新当前',
    close: '关闭当前',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  },
  system: {
    title: 'dy-admin'
  },
  tips: {
    systemError: '系统维护中，请稍微再试~',
    usernameShouldNotBeEmpty: '用户名不能为空',
    passwordShouldNotBeEmpty: '密码不能为空',
    switchLanguageSuccess: '切换语言成功',
    loginSuccess: '登录成功',
    loginFail: '登录失败',
    defaultPassword: '用户的默认密码为123456',
    getDataFail: '获取数据失败',
    createSuccess: '新增成功',
    updateSuccess: '修改成功',
    deleteSuccess: '删除成功',
    noDataSelected: '请先选择需要操作的数据',
    confirmDelete: '选中数据将被永久删除, 是否继续？',
    confirmDeleteCache: '是否立即清除用户权限缓存？',
    containCurrentUser: '包含当前登录用户，操作已取消',
    neverLogin: '从未登录过系统',
    nothing: '这家伙很懒，什么都没留下',
    topId: '值为0时表示顶级节点',
    choose: '已选择：',
    chooseNothing: '尚未选择任何图标',
    onlyChooseOne: '只能选择一个节点作为父节点',
    noNodeSelected: '请先选择节点',
    confirmDeleteNode: '选中节点及其子结点将被永久删除, 是否继续？',
    iframeGrant: 'dy dy',
    notEqual: '两次输入不一致',
    oldPasswordIncorrect: '原密码不正确',
    uploadSuccess: '上传成功',
    uploadFailed: '上传失败',
    onlySupportXlsx: '只支持Xlsx类型文件',
    updating: '修改中',
    updateFailed: '修改失败',
    noPermission: '无权限',
    confirmRestPassword: '确定重置所选用户密码？',
    resetPasswordSuccess: '所选用户密码重置已被重置为123456',
    getCodeImageFailed: '获取图形验证码失败',
    tooManyRequest: '获取验证码过于频繁，请1分钟后再试',
    clientOriginSecret: '该客户端原始密码为：'
  },
  rules: {
    require: '不能为空',
    range0to255: '长度在 0 到 255 个字符',
    range2to10: '长度在 2 到 10 个字符',
    range3to10: '长度在 3 到 10 个字符',
    range3to20: '长度在 3 到 20 个字符',
    range4to10: '长度在 4 到 10 个字符',
    range6to20: '长度在 6 到 20 个字符',
    email: '请输入正确的邮箱地址',
    mobile: '请输入合法的手机号',
    usernameExist: '该用户名已存在',
    clientIdExist: '该Client ID已存在',
    roleNameExist: '该角色名称已存在',
    noMoreThan10: '长度不能超过10个字符',
    noMoreThan11: '长度不能超过11个字符',
    noMoreThan20: '长度不能超过20个字符',
    noMoreThan50: '长度不能超过50个字符',
    noMoreThan100: '长度不能超过100个字符',
    invalidInteger: '请输入大于零的整数',
    invalidURL: '不是有效的URL'
  },
  common: {
    system: '微服务权限管理平台',
    desc: {
      a: '基于Spring Boot 2.2.2 & Spring Cloud Hoxton.SR1.RELEASE',
      b: '使用Jwt自定义统一认证',
      c: '企业级设计和配置，拒绝demo项目',
      d: '前后端分离架构，提高软件开发效率',
      e: '集成多种监控，为微服务保驾护航'
    },
    view: '查看',
    tips: '提示',
    clear: '清除',
    confirm: '确定',
    cancel: '取消',
    add: '新增',
    edit: '修改',
    upload: '上传',
    yes: '是',
    no: '否',
    sex: {
      male: '男性',
      female: '女性',
      secret: '保密'
    },
    status: {
      valid: '启用',
      invalid: '禁用'
    },
    menu: {
      menu: '菜单',
      button: '按钮'
    },
    tab: {
      common: '通用类',
      directivity: '指向性',
      solid: '填充类',
      food: '食品类'
    },
    aboutMe: '关于我',
    changeAvatar: '更换头像',
    lastLoginTime: '上次登录时间',
    goodMorning: '早上好',
    goodAfternoon: '下午好',
    goodEvening: '晚上好',
    randomMessage: {
      0: '帮我帮我帮我帮我帮我帮我帮我',
      1: '喝杯咖啡休息下吧☕',
      2: '要不要和朋友打局LOL',
      3: '今天又写了几个Bug🐞呢',
      4: '今天在群里吹水了吗',
      5: '今天吃了什么好吃的呢',
      6: '今天您微笑了吗😊',
      7: '今天帮别人解决问题了吗',
      8: '准备吃些什么呢',
      9: '周末要不要去看电影？'
    },
    docDetails: '了解更多',
    allProject: '所有项目',
    noEmail: '暂无邮箱',
    noMobile: '暂无手机',
    noDept: '暂无部门',
    noRole: '暂无角色',
    noWorkDescribe: '这家伙很懒，什么也没留下~',
    firstLogin: '第一次登录系统',
    todayIp: '今日IP',
    todayVisit: '今日访问',
    TotalVisit: '总访问量',
    you: '您',
    total: '总数',
    visitTitle: '近十天系统访问记录',
    timeline: '登录时间',
    account: '账号信息',
    password: '个人密码',
    importResult: '导入结果',
    hthz: '后田花子',
    al: '阿里系',
    lm: '脸萌',
    ctc: '点击选择',
    pleaseInputUrl: '请输入URL',
    bind: '绑定',
    unbind: '解绑',
    confirmUnbind: '确定解绑该第三方账号？',
    unbindSuccess: '解绑成功',
    bindSuccess: '绑定成功',
    bindLogin: '绑定并登录',
    signLogin: '注册并登录',
    current: '当前',
    socialAccount: '账号',
    socialTips: '尚未绑定任何系统账户，您可以绑定系统账户或者注册一个新的账户并绑定。'
  }
}
