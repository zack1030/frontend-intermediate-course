window.already_load = 0
function event_handler() {
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

function load_streams_info(first=false) {
  var r = new XMLHttpRequest();
  var params = 'game='+encodeURIComponent('League of Legends')+`&limit=20&offset=${window.already_load}`;
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

load_streams_info(true)
