import { h, render } from 'vue'
import MessageBoxVue from './index.vue'
import { CLOSE_DELAY } from '@/utils/constants'

export const MessageBox = (type, content, duration = CLOSE_DELAY) => {
  /**
   * 动画结束时的回调
   */
  const onDestroy = () => {
    // 3. message-box 销毁
    render(null, document.body)
  }

  // 1. 返回 vnode
  const vnode = h(MessageBoxVue, {
    type,
    content,
    duration,
    destroy: onDestroy
  })
  // 2. render
  render(vnode, document.body)
}
