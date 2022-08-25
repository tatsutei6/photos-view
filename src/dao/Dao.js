import { db } from '@/utils/db'

export class Dao {
  static instance

  static getInstance() {
    if (Dao.instance) return Dao.instance
    Dao.instance = new Dao()
    return Dao.instance
  }

  async getAllCategories() {
    await db.open()
    return await db.categories.toArray()
  }

  async getAllPhotos() {
    await db.open()
    return await db.photos.toArray()
  }

  async getPhotos(queryParam = { page: 1, count: 10 }) {
    await db.open()
    let allPhotos = await db.photos.toArray()
    if (queryParam.title) {
      allPhotos = allPhotos.filter(item => item.title.indexOf(queryParam.title) !== -1)
    }
    console.log('allPhotos:', allPhotos)
    const total = allPhotos.length
    const start = (queryParam.page - 1) * queryParam.count
    const end = start + queryParam.count
    return { total: total, data: allPhotos.slice(start, end) }
  }

  async getPhotoById(id) {
    await db.open()
    return db.photos.get(id)
  }

}