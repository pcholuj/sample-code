window.addEventListener('DOMContentLoaded', function () {
  const apikey = 'YOUR_APIKEY';
  const client = filestack.init(apikey);

  client.retrieve('YOUR_FILE_HANDLE', {
    metadata: true,
    extension: 'test.jpg',
    head: false,
    cache: false,
    dl: false,
  }).then((response) => {
    document.getElementById('response').innerHTML = JSON.stringify(response, undefined, 2);
  }).catch((error) => {
    console.error(error);
  });

  client.retrieve('YOUR_FILE_HANDLE').then((blob) => {
    const urlCreator = window.URL || window.webkitURL;
    const img = document.createElement('img');
    img.src = urlCreator.createObjectURL(blob);

    document.getElementById('content').appendChild(img)
  }).catch((error) => {
    console.error(error);
  });
});