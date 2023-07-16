import axiosApi from './AxiosApi.js'

const apiList = {
  save: {
    url: `/base/base/transportLine/trips`,
    method: 'POST'
  },
  all: {
    url: `/base/base/transportLine/trips`,
    method: 'GET'
  },
  update: {
    url: `/base/base/transportLine/trips`,
    method: 'PUT'
  },
  delete: {
    url: `/base/base/transportLine/trips`,
    method: 'DELETE'
  },
  relation: {
    url: `/base/base/transportLine/trips/truckDriver`,
    method: 'GET'
  }
}

export default {
  save(id, data) {
    return axiosApi({
      url: `/base/base/transportLine/trips/${id}/truckDriver`,
      method: 'POST',
      data
    })
  },
  all(data) {
    return axiosApi({
      ...apiList.all,
      data
    })
  },
  update(data) {
    return axiosApi({
      url: `/base/base/transportLine/trips/${data.id}`,
      method: 'PUT',
      data
    })
  },
  delete(id) {
    return axiosApi({
      url: `/base/base/transportLine/trips/${id}`,
      method: 'DELETE'
    })
  },
  listOrg(data) {
    return axiosApi({
      ...apiList.listorg,
      data
    })
  },
  relation(data) {
    return axiosApi({
      ...apiList.relation,
      data
    })
  }
}
