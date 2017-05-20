window.already_load = 0
function event_handler() {
  window.addEventListener('scroll', throttle(load_streams_info, 1000));
}

function throttle(fn, wait) {
    console.log('test');
    var time = Date.now();
    return function() {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 300) {
            if ((time + wait - Date.now()) < 0) {
                window.already_load += 20;
                fn(false);
                time = Date.now();
            }
        }
    }
}

function load_streams_info(first=false) {
  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/streams/",
    headers:{'Client-ID':'8okp5kcn7dr13mazyq5anbwqvnlclp'},
    data: {'game':'League of Legends', 'limit':20, 'offset':window.already_load},
  //  data:{'limit':20},
    success: function(data, textStatus, jqXHR) {
      if (first === true) {
        $(".col").each(function(index) {
          if (index < data.streams.length) {
            jQuery(".preview img", this).attr('src',data.streams[index].preview.medium);
            jQuery(".bottom .avatar img", this).attr('src',data.streams[index].channel.logo);
            jQuery(".bottom .intro .channel_name", this).text(data.streams[index].channel.status);
            jQuery(".bottom .intro .owner_name", this).text(data.streams[index].channel.display_name);
            jQuery(".bottom", this).css('dispaly','block');
            jQuery(".preview", this).css('dispaly','block');
          }
          else {
            jQuery(".bottom", this).hide();
            jQuery(".preview", this).hide();
          }
        })
      }
      else {
        for (stream of data.streams) {
        $(`
        <div class="col">
          <div class="preview"><img src=${stream.preview.medium} /></div>
          <div class="bottom">
            <div class="avatar"><img src=${stream.channel.logo} /></div>
            <div class="intro">
              <div class="channel_name">${stream.channel.status}</div>
              <div class="owner_name">${stream.channel.display_name}</div>
            </div>
          </div>
        </div>
        `).insertBefore( ".insert-before-this" );
        console.log(stream.channel.logo);
        }
      }
    },
    dataType:'json'
  });
}
load_streams_info(true)
