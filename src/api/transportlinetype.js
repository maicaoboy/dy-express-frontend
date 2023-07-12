import axiosApi from './AxiosApi.js'

const apiList = {
  save: {
    method: 'POST',
    url: `/base/base/transportLine/type`
  },
  page: {
    method: 'GET',
    url: `/base/base/transportLine/type/page`
  },
  update: {
    method: 'PUT',
    url: `/base/base/transportLine/type`
  },
  delete: {
    method: 'DELETE',
    url: `/base/base/transportLine/type`
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
  update(id, data) {
    return axiosApi({
      method: 'PUT',
      url: `/base/base/transportLine/type/${id}`,
      data
    })
  },
  delete(id) {
    return axiosApi({
      method: 'DELETE',
      url: `/base/base/transportLine/type/${id}`
    })
  }

}
