export const CLOSE_DELAY = 1500
// PC 设备指定宽度
export const PC_DEVICE_WIDTH = 1280
// category 的本地构建数据
export const ALL_CATEGORY_ITEM = {
  id: 0,
  en_name: 'all',
  jp_name: '全て'
}
// 初始 category 数据
export const CATEGORY_DATA = [
  ALL_CATEGORY_ITEM,
  { id: 1, en_name: 'web_app_icon', jp_name: 'UI/UX' },
  { id: 2, en_name: 'design', jp_name: 'デザイン' },
  { id: 3, en_name: 'illustration', jp_name: 'イラスト' },
  { id: 4, en_name: 'photography', jp_name: '撮影' },
  { id: 5, en_name: 'games', jp_name: 'ゲーム' },
  { id: 6, en_name: 'anime', jp_name: 'アニメ' },
  {
    id: 7,
    en_name: 'industrial_design',
    jp_name: 'インダストリアルデザイン'
  },
  {
    id: 8,
    en_name: 'industrial_design',
    jp_name: '古典芸術'
  }

]
// Darkテーマ
export const THEME_DARK = 'dark'
// Lightテーマ
export const THEME_LIGHT = 'light'
// OSテーマ
export const THEME_SYSTEM = 'system'

//
export const LOGIN_TYPE_USERNAME = 'username'
export const LOGIN_TYPE_OAUTH_NO_REGISTER_CODE = 204
// STS 上传数据
export const REGION = 'oss-cn-beijing'
export const BUCKET = 'vite-front'
