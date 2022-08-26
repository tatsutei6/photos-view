import { db } from '@/utils/db'

export class Dao {
  static instance

  static getInstance() {
    if (Dao.instance) return Dao.instance
    Dao.instance = new Dao()
    return Dao.instance
  }

  async getAllCategories() {
    return db.categories.toArray()
  }

  async getAllPhotos() {
    return db.photos.toArray()
  }

  async getPhotos(queryParam = { page: 1, count: 10 }) {
    let data = await db.photos.toArray()
    if (queryParam.title) {
      data = data.filter(item => item.title.indexOf(queryParam.title) !== -1)
    }
    const total = data.length
    const start = (queryParam.page - 1) * queryParam.count
    const end = start + queryParam.count
    return { total: total, data: data.slice(start, end) }
  }
}