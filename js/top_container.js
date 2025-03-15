const channel = new BroadcastChannel('TopContainerChannel');
const img = document.getElementById('myCharacterContainer');
const title = document.getElementById('myTitle');
channel.onmessage = function(e) {
  if (e.data.type === 'PartnerChange') {
    img.setAttribute('href', '../icon/topcontainer/character/' + e.data.value + '.png');
  }
};

