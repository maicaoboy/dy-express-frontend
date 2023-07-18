import axiosApi from './AxiosApi.js'

const apiList = {
  save: {
    method: 'POST',
    url: `/work/transport-task`
  },
  updatebyid: {
    method: 'PUT',
    url: `/work/transport-task/{id}`
  },
  findByPage: {
    method: 'POST',
    url: `/work/transport-task/page`
  },
  findAll: {
    method: 'Post',
    url: `/work/transport-task/list`
  },
  findAllByOrderIdOrTaskId: {
    method: 'GET',
    url: `/work/transport-task/listByOrderIdOrTaskId`
  }
}

export default {
  save(data) {
    return axiosApi({
      ...apiList.save,
      data
    })
  },
  updatebyid(data) {
    return axiosApi({
      url: `/work/transport-task/${data.id}}`,
      method: 'PUT',
      data
    })
  },
  findByPage(data) {
    return axiosApi({
      ...apiList.findByPage,
      data
    })
  },
  findbyId(id) {
    return axiosApi({
      url: `/work/transport-task/${id}`,
      method: 'GET'
    })
  },
  findAll(data) {
    return axiosApi({
      ...apiList.findAll,
      data
    })
  },
  findAllByOrderIdOrTaskId(data) {
    return axiosApi({
      ...apiList.findAllByOrderIdOrTaskId,
      data
    })
  }
}
