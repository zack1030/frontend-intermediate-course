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

module.exports = {
  'get_lang':get_lang,
  'set_lang':set_lang,
  'get_title':get_title
};
