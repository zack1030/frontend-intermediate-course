let currentLang = 'zh-tw';
function getLang() {
  return currentLang;
}
function setLang(lang) {
  currentLang = lang;
}
function getTitle() {
  if (currentLang === 'en') {
    return 'The streams in English';
  } else if (currentLang === 'zh-tw') {
    return '用中文直播的頻道';
  }
  return '';
}
let streamCount = 0;
function addStreamCount(adder) {
  streamCount += adder;
}
function resetStreamCount() {
  streamCount = 0;
}
function getStreamCount() {
  return streamCount;
}
module.exports = {
  get_lang: getLang,
  set_lang: setLang,
  get_title: getTitle,
  add_stream_count: addStreamCount,
  reset_stream_count: resetStreamCount,
  get_stream_count: getStreamCount,
};
