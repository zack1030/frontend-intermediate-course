const utils = require('./utils.js');

function throttle(fn, wait) {
  let time = Date.now();
  return () => {
    if (document.body.scrollTop + document.documentElement.clientHeight
        > document.documentElement.offsetHeight - 300) {
      if (((time + wait) - Date.now()) < 0) {
        utils.add_stream_count(20);
        fn(false);
        time = Date.now();
      }
    }
  };
}

function loadStreamsInfo() {
  const lang = utils.get_lang();
  const offset = utils.get_stream_count();
  const r = new XMLHttpRequest();
  const params = `game=${encodeURIComponent('League of Legends')}&limit=20&offset=${offset}&language=${lang}`;
  r.open('GET', `https://api.twitch.tv/kraken/streams/?${params}`, true);
  r.onload = () => {
    // console.log(r.response);
    r.response.streams.forEach((stream) => {
      // console.log(stream.preview.medium);
      // console.log(stream.channel.logo);
      // console.log(stream.channel.status);
      // console.log(stream.channel.display_name);
      const newNode = document.createElement('div');
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
      const parentDiv = document.getElementById('insert-before-this').parentNode;
      const sp2 = document.getElementById('insert-before-this');
      parentDiv.insertBefore(newNode, sp2);
    });
  };
  r.responseType = 'json';
  r.setRequestHeader('Client-ID', '8okp5kcn7dr13mazyq5anbwqvnlclp');
  r.send(params);
}

function reloadCols() {
  for (;;) {
    const removed = document.getElementById('insert-before-this').previousSibling;
    if (removed == null) { break; }
    removed.remove();
  }
  utils.reset_stream_count();
  loadStreamsInfo();
}

function reloadLangItem() {
  document.getElementsByClassName('title')[0].innerHTML = utils.get_title();
  reloadCols();
}

document.addEventListener('DOMContentLoaded', () => {
  utils.set_lang('zh-tw');
  reloadLangItem();
  window.addEventListener('scroll', throttle(loadStreamsInfo, 1000));
  document.getElementById('set_en').addEventListener('click', () => {
    utils.set_lang('en');
    reloadLangItem();
  });
  document.getElementById('set_zhtw').addEventListener('click', () => {
    utils.set_lang('zh-tw');
    reloadLangItem();
  });
});
