import axiosApi from './AxiosApi.js'

const apiList = {
  allTree: {
    method: 'GET',
    url: `/authority/org/tree`
  },
  save: {
    method: 'POST',
    url: `/authority/org`
  },
  get: {
    method: 'GET',
    url: '/authority/org'
  },
  update: {
    method: 'PUT',
    url: `/authority/org`
  },
  delete: {
    method: 'DELETE',
    url: `/authority/org`
  },
  list: {
    method: 'GET',
    url: `/authority/org/list`
  }
}

export default {
  allTree(data) {
    return axiosApi({
      ...apiList.allTree,
      formData: true,
      data
    })
  },
  save(data) {
    return axiosApi({
      ...apiList.save,
      data
    })
  },
  get(id) {
    return axiosApi({
      url: `/authority/org/${id}`,
      method: 'GET'
    })
  },
  update(data) {
    return axiosApi({
      ...apiList.update,
      data
    })
  },
  delete(data) {
    return axiosApi({
      ...apiList.delete,
      data
    })
  },
  list(data) {
    return axiosApi({
      ...apiList.list,
      data
    })
  }

}
