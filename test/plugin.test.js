import document from 'global/document';

import QUnit from 'qunit';
import sinon from 'sinon';
import videojs from 'video.js';

import plugin from '../src/plugin';

const Player = videojs.getComponent('Player');

QUnit.test('the environment is sane', function(assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof sinon, 'object', 'sinon exists');
  assert.strictEqual(typeof videojs, 'function', 'videojs exists');
  assert.strictEqual(typeof plugin, 'function', 'plugin is a function');
});

QUnit.module('videojs-watermark', {

  beforeEach() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = sinon.useFakeTimers();

    this.fixture = document.getElementById('qunit-fixture');
    this.video = document.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video);
  },

  afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
});

QUnit.test('registers itself with video.js', function(assert) {
  assert.expect(2);

  assert.strictEqual(
    typeof Player.prototype.watermark,
    'function',
    'videojs-watermark plugin was registered'
  );

  this.player.watermark();

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  assert.ok(
    this.player.hasClass('vjs-watermark'),
    'the plugin adds a class to the player'
  );
});

QUnit.test('does not add image if not configued', function(assert) {
  assert.expect(2);

  assert.strictEqual(
    typeof Player.prototype.watermark,
    'function',
    'videojs-watermark plugin was registered'
  );

  this.player.watermark();

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  assert.equal(
    0,
    this.player.contentEl().getElementsByClassName('vjs-watermark-content').length,
    'The plugin should not add content to the player if no image is configued'
  );
});

QUnit.test('does add image with correct path', function(assert) {
  const imageUrl = '/images/foo.png';

  assert.expect(5);

  assert.strictEqual(
    typeof Player.prototype.watermark,
    'function',
    'videojs-watermark plugin was registered'
  );

  this.player.watermark({ image: imageUrl });

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  const imageContainer = this.player.contentEl()
                              .getElementsByClassName('vjs-watermark-content')[0];
  const image = imageContainer.getElementsByTagName('img')[0];

  assert.ok(
    imageContainer,
    'The plugin should add content to the player if an image is configued'
  );

  assert.ok(
    image.src.endsWith(imageUrl),
    'This is not the correct image'
  );

  assert.equal(
    0,
    imageContainer.getElementsByTagName('a').length,
    'The plugin should not add a link unless there is a configured URL'
  );

  assert.equal(
    imageContainer.id,
    '',
    'the plugin doesn\'t add an ID to image container'
  );
});

QUnit.test('does add a link when URL is configured', function(assert) {
  const imageUrl = '/images/foo.png';
  const linkUrl = '/some/path';

  assert.expect(6);

  assert.strictEqual(
    typeof Player.prototype.watermark,
    'function',
    'videojs-watermark plugin was registered'
  );

  this.player.watermark({ image: imageUrl, url: linkUrl });

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  const imageContainer = this.player.contentEl()
                              .getElementsByClassName('vjs-watermark-content')[0];
  const image = imageContainer.getElementsByTagName('img')[0];
  const link = imageContainer.getElementsByTagName('a')[0];

  assert.ok(
    imageContainer,
    'The plugin should add content to the player if an image is configued'
  );

  assert.ok(
    image.src.endsWith(imageUrl),
    'This is not the correct image'
  );

  assert.equal(
    1,
    imageContainer.getElementsByTagName('a').length,
    'The plugin should add a link since the URL is configued'
  );

  assert.ok(
    link.href.endsWith(linkUrl),
    'This is not the correct link'
  );

  assert.equal(
    imageContainer.id,
    '',
    'the plugin doesn\'t add an ID to image container'
  );
});

QUnit.test('fades out after player is started', function(assert) {
  // GIVEN
  const imageUrl = '/images/foo.png';

  this.player.watermark({ image: imageUrl, fadeTime: 1 });
  this.clock.tick(1);

  // WHEN
  this.player.trigger('play');
  this.clock.tick(10);

  // THEN
  const imageContainer = this.player.contentEl()
    .getElementsByClassName('vjs-watermark-content')[0];

  assert.ok(imageContainer.classList.contains('vjs-watermark-fade'));
});
