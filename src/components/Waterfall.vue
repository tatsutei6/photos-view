<template>
  <div
      class='relative'
      ref='containerDivRef'
      :style="{
      height: containerHeight + 'px' // divはrelativeなので，高さを指定する必要がある
    }"
  >
    <!-- column数は固定値でないので，itemWidthを計算してから、 templateをレンダーする-->
    <template v-if='itemWidth && data.length'>
      <!-- left、topを計算する -->
      <div
          class='waterfall-item'
          v-for='(item) in data'
          :key='keyProp ? item[keyProp] : item.id'
          :style='useItemStyle(item)'
      >
        <slot :item='item' :width='itemWidth' />
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'Waterfall'
}
</script>
<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import {
  getAllImgSrc,
  getImgElements,
  getMaxHeight,
  getMinimumHeight,
  getMinimumHeightColumnIndex,
  onCompleteLoadAllImgs
} from '@/utils'
import { useVModel } from '@vueuse/core/index'

const props = defineProps({
  // データ
  data: {
    type: Array,
    required: true,
    default: []
  },
  // key属性
  keyProp: {
    type: String
  },
  // column数
  columns: {
    default: 2,
    type: Number
  },
  // column間隔
  columnSpacing: {
    default: 20,
    type: Number
  },
  // row間隔
  rowSpacing: {
    default: 20,
    type: Number
  },
  // 前もって写真をロードするか
  preload: {
    type: Boolean,
    default: true
  }
})
// vuex store
const store = useStore()

// containerDivRef elementの高さ
const containerHeight = ref(0)
// 各columnの高さ
let columnHeightArray = []
// containerDivRef elementのレファレンス
const containerDivRef = ref(null)
// containerDivRef elementの広さ(padding、margin、borderを含まない)
const containerWidth = ref(0)
// containerDivRef elementの左ポジション
const containerLeft = ref(0)

// 写真の広さ、各写真の広さは同じ
const itemWidth = ref(0)
// 各columnの間隔のトータル
const columnSpacingTotal = computed(() => {
  return (props.columns - 1) * props.columnSpacing
})
// 各写真の高さ
let itemHeightArray = []
// ロード状態
// const loading = ref(true)
const loading = useVModel(props)
defineEmits(['update:modelValue'])
let timeout
/**
 * 各写真の様式を作る
 */
const useItemStyle = (item) => {
  const styleObj = { opacity: loading.value ? 0 : 1, width: itemWidth.value + 'px' }
  if (item._style?.left != null) {
    styleObj.left = item._style.left + 'px'
  }
  if (item._style?.top != null) {
    styleObj.top = item._style.top + 'px'
  }
  return styleObj
}

/**
 * 各columnの高さを初期化する
 */
const initColumnHeightArray = () => {
  columnHeightArray = []
  for (let i = 0; i < props.columns; i++) {
    columnHeightArray[i] = 0
  }
}
/**
 * containerDivRef elementの広さを計算する
 */
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(containerDivRef.value, null)

  // containerDivRef elementのpaddingLeft
  containerLeft.value = parseFloat(paddingLeft)
  // paddingLeft、paddingRightを取り除く
  containerWidth.value =
      containerDivRef.value.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}

/**
 * 写真の広さを計算する
 */
const useItemWidth = () => {
  // containerDivRef elementの広さを計算する
  useContainerWidth()
  // 写真の広さを計算する
  itemWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.columns
}
onMounted(() => {
  // 写真の広さを計算する
  useItemWidth()
})

/**
 * props.preloadはTrueの場合
 * 写真の読み込みが完成したら、「waterfall-item」のポジションを生成する
 */
const waitImgComplete = () => {
  itemHeightArray = []
  // 「waterfall-item」を取得する
  let itemElementArray = [...document.getElementsByClassName('waterfall-item')]
  if (itemElementArray.length === 0) {
    // containerDivRef elementの高さを0にする
    containerHeight.value = 0
    // loadingをfalseにする
    loading.value = false
    return
  }
  // 「waterfall-item」からクラス名は「photo-item-img」であるimg elementを取得する
  const imgElementArray = getImgElements(itemElementArray)
  // img elementのsrc属性を取得する
  const imgSrcArray = getAllImgSrc(imgElementArray)
  // 全ての写真を読み込みが完成する時に、実行する
  onCompleteLoadAllImgs(imgSrcArray).then(() => {
    // 調整値
    const adjustment = 15
    // 写真を読み込みが完成してから、「waterfall-item」の高さをitemHeightArrayに入れる
    itemElementArray.forEach((el) => {
      itemHeightArray.push(el.offsetHeight + adjustment)
    })
    // 「waterfall-item」のポジションを生成する
    useItemLocation()
    console.log('waterfall.waitImgComplete.onCompleteLoadAllImgs')
    loading.value = false
  })
}

/**
 * props.preloadはfalseの場合
 * 写真の読み込みの完了を待たず、「waterfall-item」のポジションを生成する
 */
const useItemHeight = () => {
  itemHeightArray = []
  // クラス名は「waterfall-item」を取得する
  ;[...document.getElementsByClassName('waterfall-item')].forEach((el) => {
    // 「waterfall-item」の高さをitemHeightArrayに入れる
    itemHeightArray.push(el.offsetHeight + 15)
  })
  // 「waterfall-item」のポジションを生成する
  useItemLocation()
}

/**
 * waterfall-itemのポジションを生成する
 */
const useItemLocation = () => {
  // 遍历数据源
  props.data.forEach((item, index) => {
    if (item._style) {
      return
    }
    //  _styleを初期化する
    item._style = {}
    // left
    item._style.left = useItemLeft()
    // top
    item._style.top = useItemTop()
    // columnの高さを増加する
    increaseColumnHeight(itemHeightArray[index])
  })

  // containerDivRef elementの高さを更新する
  containerHeight.value = getMaxHeight(columnHeightArray)
}

/**
 * 写真のポジション(left)を取得する
 */
const useItemLeft = () => {
  // 高さは最小なcolumnのindexを返す
  const columnIndex = getMinimumHeightColumnIndex(columnHeightArray)
  return columnIndex * (itemWidth.value + props.columnSpacing) + containerLeft.value
}

/**
 * 写真のポジション(top)を取得する
 */
const useItemTop = () => {
  // 最小のcolumnの高さを返す
  return getMinimumHeight(columnHeightArray)
}

/**
 * columnの高さを増加する
 */
const increaseColumnHeight = (itemColumnHeight) => {
  // 高さが最小なcolumnのindex
  const minHeightColumnIndex = getMinimumHeightColumnIndex(columnHeightArray)
  // 高さが最小なcolumnの高さを増加する
  columnHeightArray[minHeightColumnIndex] += itemColumnHeight + props.rowSpacing
}


onUnmounted(() => {
  // 全てのitemの_styleを削除する
  props.data.forEach((item) => {
    delete item._style
  })
  // タイマーをクリアする
  if (timeout != null) {
    clearTimeout(timeout)
  }
})

/**
 * props.dataを監視する
 */
watch(
    () => props.data,
    (newVal) => {
      console.log('waterfall.watch.props.data')
      loading.value = true
      // props.dataの元素は全部「_style」がなければ、最初waterfallをアクセスするということだ
      const resetColumnHeight = newVal.every((item) => !item._style)
      if (resetColumnHeight) {
        // 各columnの高さを初期化する
        initColumnHeightArray()
      }

      // DOMが更新された後に処理を行う
      nextTick(() => {
        if (props.preload) {
          waitImgComplete()
        } else {
          useItemHeight()
        }
      })
    },
    {
      immediate: true,
      deep: true
    }
)
/**
 * 組積をリセットする
 */
const reset = () => {
  loading.value = true
  if (timeout != null) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(() => {
    // 写真の広さを再計算する
    useItemWidth()
    // props.dataへの監視では、{deep: true}があるので、写真の「_style」をnullにすることで、
    // props.dataへの監視のcallbackを実行させる
    props.data.forEach((item) => {
      item._style = null
    })
  }, 500)
}

/**
 * props.columnsを監視する
 */
watch(
    () => props.columns,
    () => {
      if (props.preload) {
        // 在 picturePreReading 为 true 的前提下，需要首先为列宽滞空，列宽滞空之后，会取消瀑布流渲染
        itemWidth.value = 0
        // 等待页面渲染之后，重新执行计算。否则在 item 没有指定过高度的前提下，计算出的 item 高度会不正确
        nextTick(reset)
      } else {
        reset()
      }
    }
)
</script>

<style lang='scss' scoped>
.waterfall-item {
  @apply absolute duration-1000;
}
</style>
