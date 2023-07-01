import request from '@/utils/request'

export async function getShowsByPage(page: number) {
  return request.get('/shows', { params: { page } })
}

export async function getShowInfo(id: number) {
  return request.get(`/shows/${id}`)
}

export async function getShowImages(id: number) {
  return request.get(`/shows/${id}/images`)
}

export async function getShowsByQuery(q: string) {
  return request.get('/search/shows', { params: { q } })
}
