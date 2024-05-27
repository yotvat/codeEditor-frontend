import { httpService } from './http.service'
import { utilService } from './util.service'

export const entityService = {
  query,
  getById,
  remove,
  save,
}

function query() {
  return httpService.get('entity')
}

function getById(entityId) {
  return httpService.get(`entity/${entityId}`)
}

function remove(entityId) {
  return httpService.delete(`entity/${entityId}`)
}

function save(entity) {
  if (entity._id) {
    return httpService.put(`entity/${entity._id}`, entity)
  } else {
    return httpService.post('entity', entity)
  }
}


