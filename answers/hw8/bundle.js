/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var current_lang = 'zh-tw';
function get_lang() {
  return current_lang;
}
function set_lang(lang) {
  current_lang = lang;
}
function get_title() {
  if (current_lang === 'en'){
    return 'The streams in English';
  }
  else if (current_lang === 'zh-tw') {
    return '用中文直播的頻道';
  }
}
var stream_count = 0;
function add_stream_count(adder) {
  stream_count += adder;
}
function reset_stream_count() {
  stream_count = 0;
}
function get_stream_count() {
  return stream_count;
}
module.exports = {
  'get_lang':get_lang,
  'set_lang':set_lang,
  'get_title':get_title,
  'add_stream_count':add_stream_count,
  'reset_stream_count':reset_stream_count,
  'get_stream_count':get_stream_count
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const utils = __webpack_require__(0)
function throttle(fn, wait) {
    console.log('test');
    var time = Date.now();
    return function() {
        if(document.body.scrollTop + document.documentElement.clientHeight > document.documentElement.offsetHeight - 300) {
            if ((time + wait - Date.now()) < 0) {
                utils.add_stream_count(20);
                fn(false);
                time = Date.now();
            }
        }
    }
}

function load_streams_info() {
  var lang = utils.get_lang();
  var offset = utils.get_stream_count();
  var r = new XMLHttpRequest();
  var params = 'game='+encodeURIComponent('League of Legends')+`&limit=20&offset=${offset}&language=${lang}`;
  r.open("GET", `https://api.twitch.tv/kraken/streams/?${params}`, true);
  r.onload = function () {
    console.log(r.response);
    for (stream of r.response.streams) {
      console.log(stream.preview.medium);
      console.log(stream.channel.logo);
      console.log(stream.channel.status);
      console.log(stream.channel.display_name);
      var newNode = document.createElement('div');
      newNode.innerHTML = `
      <div class="col">
        <div class="preview"><img src=${stream.preview.medium} /></div>
        <div class="bottom">
          <div class="avatar"><img src=${stream.channel.logo} /></div>
          <div class="intro">
            <div class="channel_name">${stream.channel.status}</div>
            <div class="owner_name">${stream.channel.display_name}</div>
          </div>
        </div>
      </div>`;
      var parentDiv = document.getElementById("insert-before-this").parentNode;
      var sp2 = document.getElementById("insert-before-this");
      parentDiv.insertBefore(newNode, sp2);
    }
  };
  r.responseType = 'json';
  r.setRequestHeader('Client-ID', '8okp5kcn7dr13mazyq5anbwqvnlclp');
  r.send(params);
}

function reload_lang_item() {
  var lang = utils.get_lang();
  document.getElementsByClassName("title")[0].innerHTML = utils.get_title();
  reload_cols();
}

function reload_cols() {
  while (true) {
    var removed = document.getElementById('insert-before-this').previousSibling;
    if (removed == null) {break;}
    removed.remove();
  }
  utils.reset_stream_count();
  load_streams_info();
}

document.addEventListener('DOMContentLoaded', function () {
  utils.set_lang('zh-tw');
  reload_lang_item();
  window.addEventListener('scroll', throttle(load_streams_info, 1000));
  document.getElementById('set_en').addEventListener('click', function(){
    utils.set_lang('en')
    reload_lang_item();
  });
  document.getElementById('set_zhtw').addEventListener('click', function(){
    utils.set_lang('zh-tw')
    reload_lang_item();
  });
});



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(0);


/***/ })
/******/ ]);