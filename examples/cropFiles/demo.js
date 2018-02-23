window.addEventListener('DOMContentLoaded', function () {
  const apikey = 'YOUR_APIKEY';
  const client = filestack.init(apikey);

  document.querySelector('input').addEventListener('change', (event) => {
    const files = event.target.files;
    const pickOptions = {
      transformations: {
        crop: true,
        circle: false
      }
    };
    inputEl.addEventListener('change', (e) => {
      client.cropFiles(files, pickOptions)
        .then(res => console.log(res));
    });
  });
});