import { h, render } from 'vue'
import ConfirmModalVue from './index.vue'
import { CLOSE_DELAY } from '@/utils/constants'

/**
 *
 * @param {*} title タイトル
 * @param {*} content 内容
 * @param {*} cancelText キャンセルボタンのテキスト
 * @param {*} confirmText 確定ボタンのテキスト
 * @returns
 */
export const ConfirmModal = (
    title,
    content,
    cancelText = 'キャンセル',
    confirmText = '確定'
) => {
  return new Promise((resolve, reject) => {
    // contentはnullの場合、titleはcontentとなり、titleは''となる
    if (title && !content) {
      content = title
      title = ''
    }

    // 閉じる
    const close = () => {
      setTimeout(() => {
        render(null, document.body)
      }, CLOSE_DELAY)
    }

    // キャンセル
    const cancelHandler = () => {
      reject(new Error('キャンセルされた'))
    }

    // 確定
    const confirmHandler = () => {
      resolve()
    }

    // 1. ConfirmModalのvnodeを作る
    const vnode = h(ConfirmModalVue, {
      title,
      content,
      cancelText,
      confirmText,
      confirmHandler,
      cancelHandler,
      close
    })
    // 2. ConfirmModalのvnodeををrenderする
    render(vnode, document.body)
  })
}
