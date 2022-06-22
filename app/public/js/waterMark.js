function WaterMarker(str) {
    var can = document.createElement('canvas')
    var body = document.body
    body.appendChild(can)
    can.width = 300 //画布的宽
    can.height = 200 //画布的高度
    can.style.display = 'none'
    var cans = can.getContext('2d')
    cans.rotate((-30 * Math.PI) / 180) //画布里面文字的旋转角度
    cans.font = '16px PingFangSC-Regular' //画布里面文字的字体
    cans.fillStyle = '#EBEBEB' //画布里面文字的颜色
    cans.textAlign = 'right' //画布里面文字的水平位置
    cans.textBaseline = 'Middle' //画布里面文字的垂直位置
    cans.fillText(str, can.width / 3, can.height / 2) //画布里面文字的间距比例

    var waterMark = document.createElement('div')
    waterMark.style.position = 'fixed'
    waterMark.style.top = '0'
    waterMark.style.right = '0'
    waterMark.style.bottom = '0'
    waterMark.style.left = '0'
    waterMark.style.zIndex = '9'
    waterMark.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
    body.appendChild(waterMark) //把画布插入到body中
}
