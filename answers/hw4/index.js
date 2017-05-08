$.ajax({
  type: "GET",
  url: "https://api.twitch.tv/kraken/streams/",
  headers:{'Client-ID':'8okp5kcn7dr13mazyq5anbwqvnlclp'},
  data: {'game':'League of Legends', 'limit':20},
//  data:{'limit':20},
  success: function(data, textStatus, jqXHR) {
    console.log(data.streams);
    $(".col").each(function(index) {
      if (index < data.streams.length) {
        console.log(data.streams[index].channel.status);
        console.log(data.streams[index].channel.display_name);
        console.log(data.streams[index].channel.logo);
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
  },
  dataType:'json'
});

