import { Show } from '@/models/types'
import request from '@/utils/request'

export async function getShowsByPage(page: number) {
  return request.get('/shows', { params: { page } })
}
