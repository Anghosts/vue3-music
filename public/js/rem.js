window.onresize = function() {
  resize();
}

function resize() {
  // 获取设备的宽度
  let width = document.documentElement.clientWidth || window.innerWidth;

  // 宽度的范围
  if (width >= 750) { width = 750 }
  if (width <= 320) { width = 320 }

  // 设置字体大小
  document.documentElement.style.fontSize = (width / 10).toFixed(1) + 'px';
  document.querySelector('body').style.fontSize = '24px';
}
resize();