const filestack = require('./../..');
const fs = require('fs');

const apikey = 'YOUR_APIKEY';

const client = filestack.init(apikey);
const token = {};

const onProgress = (evt) => {
  console.log('Progress : ' + evt.totalPercent);
};

client.upload('./test.txt', {
  onProgress
}, {}, token)
.then(res => {
  console.log('success: ', res)
})
.catch(err => {
  console.log(err)
});