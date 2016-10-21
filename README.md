[![Build Status](https://travis-ci.org/dotsub/videojs-watermark.svg?branch=master)](https://travis-ci.org/dotsub/videojs-watermark) [![npm version](https://badge.fury.io/js/videojs-watermark.svg)](https://badge.fury.io/js/videojs-watermark)

# videojs-watermark

Adds a watermark image the video player. After the initial 'fadeTime' the watermark will be shown when the video players controls are shown. This also provides the ability to use the watermark as a link.

![Player Preview](https://cloud.githubusercontent.com/assets/1881100/15156352/9be2dac6-16b4-11e6-9981-d63e1421bac2.png)

## Installation

```sh
npm install --save videojs-watermark
```

## Configuration

**image: Required** The URL to the image to be used as the watermark.

**position:** The location to place the watermark (top-left, top-right, bottom-left, bottom-right). Defaults to 'top-right'.

**fadeTime:** The amount of time in milliseconds for the initial watermark fade. Defaults to 3000. To make watermark permanently visible, use `null`.

**url:** A url to be linked to from the watermark. If the user clicks the watermark the video will be paused and the link will open in a new window.

## Usage

To include videojs-watermark on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-watermark.min.js"></script>
<script>
  var player = videojs('my-video');

  player.watermark();
</script>
```

### Browserify

When using with Browserify, install videojs-watermark via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-watermark');

var player = videojs('my-video');

player.watermark();
```

### Browserify ES6

When using with Browserify, install videojs-watermark via npm and `import` the plugin as you would any other module.

```js
import videojs from 'video.js';

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
import 'videojs-watermark';

const player = videojs('my-video');
player.watermark();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-watermark'], function(videojs) {
  var player = videojs('my-video');

  player.watermark();
});
```

## License

Apache-2.0. Copyright (c) Dotsub &lt;dev@dotsub.com&gt;


[videojs]: http://videojs.com/
