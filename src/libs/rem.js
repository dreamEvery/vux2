// 根据设备屏幕大小设置根元素大小rem
export function rem () {
  var doc = window.document
  var docEl = doc.documentElement
  var tid

  function refreshRem () {
    var width = docEl.getBoundingClientRect().width
    if (width > 540) { // 最大宽度
      width = 540
    }
    var rem = width / 7.5 // 将屏幕宽度分成750份，1份为1rem 375屏刚好0.5px
    docEl.style.fontSize = rem + 'px'
  }

  window.addEventListener('resize', function () {
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 300)
  }, false)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 300)
    }
  }, false)

  refreshRem()
}
