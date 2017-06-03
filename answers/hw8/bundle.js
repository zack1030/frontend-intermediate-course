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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

window.already_load = 0
window.lang='zh-tw'
window.event_handler = function () {
  window.addEventListener('scroll', throttle(load_streams_info, 1000));
}

function throttle(fn, wait) {
    console.log('test');
    var time = Date.now();
    return function() {
        if(document.body.scrollTop + document.documentElement.clientHeight > document.documentElement.offsetHeight - 300) {
            if ((time + wait - Date.now()) < 0) {
                window.already_load += 20;
                fn(false);
                time = Date.now();
            }
        }
    }
}

function load_streams_info() {
  var r = new XMLHttpRequest();
  var params = 'game='+encodeURIComponent('League of Legends')+`&limit=20&offset=${window.already_load}&language=${window.lang}`;
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

window.change_lang = function (lang='') {
  console.log(lang);
  while (true) {
    var removed = document.getElementById('insert-before-this').previousSibling;
    if (removed == null) {break;}
    removed.remove();
  }
  window.lang = lang;
  window.already_load = 0
  load_streams_info(lang);
  document.getElementsByClassName("title")[0].innerHTML = window.I18N[lang].TITLE;
}

load_streams_info()


/***/ }),
/* 1 */
/***/ (function(module, exports) {

if (!window.I18N) window.I18N = {};
window.I18N['en'] = {
  TITLE: 'The streams in English'
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

if (!window.I18N) window.I18N = {};
window.I18N['zh-tw'] = {
  TITLE: '用中文直播的頻道'
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ })
/******/ ]);