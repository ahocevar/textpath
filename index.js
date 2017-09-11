/**
 * To render text to a
 * [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D),
 * use something like the following code:
 *
 * ```js
 * var canvas = document.getElementById('myCanvas');
 * var ctx = canvas.getContext('2d');
 *
 * var path = [[20, 33], [40, 31], [60, 30], [80, 31], [100, 33]];
 *
 * function measureText(text) {
 *   return ctx.measureText(text).width;
 * }
 *
 * function draw(letter, x, y, angle) {
 *   ctx.save();
 *   ctx.translate(x, y);
 *   ctx.rotate(angle);
 *   ctx.fillText(letter, 0, 0);
 *   ctx.restore();
 * }
 *
 * textPath('My text path :-)', path, measureText, draw);
 * ```
 *
 *
 * @param {string} text Text to draw along the `path`.
 * @param {Array<Array<number>>} path Path represented in coordinate pairs.
 * @param {Function} measure Function that takes a text as argument and
 * returns the width of the provided text.
 * @param {Function} draw Function that takes a letter, its x coordinate, y
 * coordinate and angle (in radians) as arguments. It is typically used to draw
 * the provided letter to a canvas.
 * @param {string} [textAlign='center'] Text alignment along the path. One of
 * 'left', 'center', 'right'.
 */
export default function textPath(text, path, measure, draw, textAlign) {
  var pathLength = 0;
  var p1 = path[0]
  for (var i = 1, ii = path.length; i < ii; ++i) {
    var p2 = path[i];
    pathLength += Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
    p1 = p2;
  }
  var textLength = measure(text);
  var align = textAlign == 'left' ? 0 : textAlign == 'right' ? 1 : 0.5;
  var startM = (pathLength - textLength) * align;
  var offset = 0;
  var end = path.length;

  // Keep text upright
  var reverse = path[offset][0] > path[end - 1][0];

  var numChars = text.length;

  var x1 = path[offset][0];
  var y1 = path[offset][1];
  offset += 1;
  var x2 = path[offset][0];
  var y2 = path[offset][1];
  var segmentM = 0;
  var segmentLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  var index;
  for (var i = 0; i < numChars; ++i) {
    index = reverse ? numChars - i - 1 : i;
    var char = text[index];
    var charLength = measure(char);
    var charM = startM + charLength / 2;
    while (offset < end - 1 && segmentM + segmentLength < charM) {
      x1 = x2;
      y1 = y2;
      offset += 1;
      x2 = path[offset][0];
      y2 = path[offset][1];
      segmentM += segmentLength;
      segmentLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    var segmentPos = charM - segmentM;
    var angle = Math.atan2(y2 - y1, x2 - x1);
    if (reverse) {
      angle += angle > 0 ? -Math.PI : Math.PI;
    }
    var interpolate = segmentPos / segmentLength;
    var x = x1 + interpolate * (x2 - x1);
    var y = y1 + interpolate * (y2 - y1);
    draw(char, x, y, angle);
    startM += charLength;
  }
}
