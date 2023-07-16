import axiosApi from './AxiosApi.js'

const apiList = {
  page: {
    url: '/work/driver-job/page',
    method: 'POST'
  }
}
export default {
  page(data) {
    return axiosApi({
      ...apiList.page,
      data
    })
  },
  update(id, data) {
    return axiosApi({
      url: `/work/driver-job/${id}`,
      method: 'PUT',
      data
    })
  }
}
