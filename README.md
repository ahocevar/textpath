# textpath

Renderer agnostic utility for drawing text along a path.

## Getting started

### The ES2015 way

To add the dependency to your project, run

    npm install --save textpath

To use in your code, type

```js
import textPath from 'textpath';
```

### The vanilla JavaScript way

Include the following script tag in your HTML:

```html
<script src="http://unpkg.com/textpath/dist/textpath.js"></script>
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### textPath

To render text to a
[CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D),
use something like the following code:

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var path = [[20, 33], [40, 31], [60, 30], [80, 31], [100, 33]];

function measureText(text) {
  return ctx.measureText(text).width;
}

function draw(letter, x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillText(letter, 0, 0);
  ctx.restore();
}

textPath('My text path :-)', path, measureText, draw);
```

**Parameters**

-   `text` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Text to draw along the `path`.
-   `path` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>>** Path represented in coordinate pairs.
-   `measure` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function that takes a text as argument and
    returns the width of the provided text.
-   `draw` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function that takes a letter, its x coordinate, y
    coordinate and angle (in radians) as arguments. It is typically used to draw
    the provided letter to a canvas.
-   `textAlign` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Text alignment along the path. One of
    'left', 'center', 'right'. (optional, default `'center'`)
