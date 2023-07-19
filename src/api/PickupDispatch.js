import axiosApi from './AxiosApi.js'

const apiList = {
  update: {
    method: 'PUT',
    url: `/work/pickup-dispatch-task`
  },
  findByPage: {
    method: 'POST',
    url: `/work/pickup-dispatch-task/page`
  }
}

export default {
  update(data) {
    return axiosApi({
      method: 'PUT',
      url: `/work/pickup-dispatch-task/${data.id}`,
      data
    })
  },
  findByPage(data) {
    return axiosApi({
      ...apiList.findByPage,
      data
    })
  }
}
