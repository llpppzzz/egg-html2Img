function WaterMarker({ text, size, color, position }) {
  var can = document.createElement('canvas');
  var body = document.body;
  var maxHeight = 300;
  var maxWidth = 400;
  var middleHeight = maxHeight / 2;
  var middleWidth = maxWidth / 2;

  body.appendChild(can);
  can.width = maxWidth; //画布的宽
  can.height = maxHeight; //画布的高度
  can.style.display = 'none';

  var ctx = can.getContext('2d');
  ctx.font = `${size} PingFangSC-Regular`; //画布里面文字的字体
  ctx.fillStyle = color; //画布里面文字的颜色
  ctx.textAlign = 'center'; //画布里面文字的水平位置
  ctx.textBaseline = 'middle'; //画布里面文字的垂直位置
  ctx.translate(middleWidth, middleHeight); // 设置旋转中心为中间
  ctx.rotate((-30 * Math.PI) / 180); //画布里面文字的旋转角度
  ctx.translate(-middleWidth, -middleHeight); // 设置旋转中心为中间
  ctx.fillText(text, middleWidth, middleHeight, maxWidth); //画布里面文字的间距比例
  // ctx.setTransform(1, 0, 0, 1, 0, 0); // 坐标系还原

  var waterMark = document.createElement('div');
  waterMark.style.position = 'fixed';

  waterMark.style.top = position.top || 0;
  waterMark.style.right = position.right || 0;
  waterMark.style.bottom = position.bottom || 0;
  waterMark.style.left = position.left || 0;
  waterMark.style.zIndex = '9';
  waterMark.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')';
  body.appendChild(waterMark); //把画布插入到body中
}
