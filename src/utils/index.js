import { watch } from 'vue'
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from './constants'
import { useStore } from 'vuex'

/**
 * モバイルデバイスか判断する
 */
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
  )
}

/**
 * rem 基準値の初期化，最大値は 40px
 */
export const initREM = () => {
  // 最大なfontSizeを規定
  const MAX_FONT_SIZE = 40

  // htmlのロード完了したら、fontSizeを設定する
  document.addEventListener('DOMContentLoaded', () => {
    // ’html’ Elementの取得
    const html = document.querySelector('html')
    // fontSizeはディスプレイの10分の１
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    html.style.fontSize = fontSize + 'px'
  })
}

/**
 * os themeの取得と変更を監視する
 */
let matchMedia
const watchSystemTheme = () => {
  // matchMediaを初期化されたら、処理なし
  if (matchMedia) return
  // os themeの取得
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  // os themeの変更を監視する
  matchMedia.onchange = function() {
    applyTheme(THEME_SYSTEM)
  }
}

/**
 * themeをレンダーする
 * @param {*} theme 主题的标记常量
 */
const applyTheme = (theme) => {
  // html 的 class
  let themeClassName = ''
  switch (theme) {
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_SYSTEM:
      watchSystemTheme()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
  }
  // htmlのタグのclassを変更する
  document.querySelector('html').className = themeClassName
}


/**
 * Themeの初期化
 */
export const initTheme = () => {
  const store = useStore()
  watch(() => store.getters.themeType, (val) => {
    applyTheme(val)
  }, {
    // 初期化の時も実行
    immediate: true
  })
}

/**
 * 从 itemElement 中抽离出所有的 imgElements
 */
export const getImgElements = (itemElements) => {
  const imgElements = []
  itemElements.forEach((el) => {
    imgElements.push(...el.querySelectorAll('img.photo-item-img'))
  })
  return imgElements
}

/**
 * 生成所有的图片链接数组
 */
export const getAllImgSrc = (imgElements) => {
  return imgElements.map((imgElement) => {
    return imgElement.src
  })
}

/**
 * promiseAllを作成する
 */
export const onCompleteLoadAllImgs = (imgSrcArray) => {
  const loadImgPromiseArray = []
  imgSrcArray.forEach((imgSrc, index) => {
    // promiseAllを作成する
    loadImgPromiseArray[index] = new Promise((resolve, _) => {
      const img = new Image()
      img.src = imgSrc
      // load完成したら、実行する
      img.onload = () => {
        resolve({
          img: imgSrc,
          index
        })
      }
      //
      img.onerror = () => {
        resolve({
          img: imgSrc,
          index
        })
      }
    })
  })
  return Promise.all(loadImgPromiseArray)
}

/**
 * 一番低いコラムのindexを取得する
 */
export const getMinimumHeightColumnIndex = (columnHeightArray) => {
  const minHeight = getMinimumHeight(columnHeightArray)
  for (let i = 0; i < columnHeightArray.length; i++) {
    if (columnHeightArray[i] === minHeight) {
      return i
    }
  }
  return 0
}

/**
 * 一番低いコラムの高さを取得する
 */
export const getMinimumHeight = (columnHeightArray) => {
  return Math.min(...columnHeightArray)
}

/**
 * 一番高いコラムの高さを取得する
 */
export const getMaxHeight = (columnHeightArray) => {
  return Math.max(...columnHeightArray)
}


