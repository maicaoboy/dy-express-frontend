import axiosApi from './AxiosApi.js'

const apiList = {
  save: {
    url: `/base/base/transportLine`,
    method: 'POST'
  },
  page: {
    url: `/base/base/transportLine/page`,
    method: 'GET'
  },
  update: {
    url: `/base/base/transportLine`,
    method: 'PUT'
  },
  delete: {
    url: `/base/base/transportLine`,
    method: 'DELETE'
  }
}

export default {
  save(data) {
    return axiosApi({
      ...apiList.save,
      data
    })
  },
  page(data) {
    return axiosApi({
      ...apiList.page,
      data
    })
  },
  update(data) {
    return axiosApi({
      url: `/base/base/transportLine/${data.id}}`,
      method: 'PUT',
      data
    })
  },
  delete(id) {
    return axiosApi({
      url: `/base/base/transportLine/${id}`,
      method: 'DELETE'
    })
  }
}
