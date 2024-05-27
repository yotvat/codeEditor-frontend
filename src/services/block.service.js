import { httpService } from './http.service'
import { utilService } from './util.service'

export const blockService = {
  query,
  getById,
  remove,
  save,
}

function query() {
  return httpService.get('block')
}

function getById(blockId) {
  return httpService.get(`block/${blockId}`)
}

function remove(blockId) {
  return httpService.delete(`block/${blockId}`)
}

function save(block) {
  if (block._id) {
    return httpService.put(`block/${block._id}`, block)
  } else {
    return httpService.post('block', block)
  }
}


