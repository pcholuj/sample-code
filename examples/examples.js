const express = require('express');
const util = require('util');
const fs = require('fs');
const path = require('path');
const app = express();
const yaml = require('js-yaml');
const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);

 // hardcoded names because of jsFiddle <== github integration
const files = {
  index: 'demo.html',
  script: 'demo.js',
  config: 'demo.details'
};

const filesContent = {
  index: null,
  script: null,
  config: null
};

const template = `
<html>
    <title>{{title}}</title>
    <head>
        {{headScript}}
    </head>
    <body>
        {{content}}
        <script>
            {{script}}
        </script>
    </body>
</html>
`;

const listTemplate = `
<html>
    <body>
        <ul>{{list}}</ul>
    </body>
</html>
`;

// render examples list
app.get('/', (req, res) => {
  const list = [];

  readDir(__dirname).then((results) => {
    results.forEach((val) => {
      if (fs.statSync(path.join(__dirname, val)).isDirectory()) {
        list.push(`<li><a href="/${val}" alt="val">${val}</a></li>`)
      }
    });

    res.send(listTemplate.replace('{{list}}', list.join('\r\n')));
  }).catch((err) => {
    console.log(err);
    res.status(404);
    res.end();
  });
});

// render example based on jsFiddle github integration
app.get('/*', (req, res) => {
  const requestedPath = req.path;
  const promises = [];

  Object.keys(files).forEach((key) => {
    const promiseFn = readFile(path.join(__dirname, requestedPath, files[key]));
    promiseFn.then((res) => {
      filesContent[key] = res.toString();
    });
    promises.push(promiseFn);
  });

  Promise.all(promises).then(() => {
    const config = yaml.safeLoad(filesContent.config);
    let tpl = template + '';
    tpl = tpl.replace('{{title}}', config.name || '')
      .replace('{{content}}', filesContent.index)
      .replace('{{script}}', filesContent.script);

    if (config.resources) {
      let resources = [];

      config.resources.forEach((val) => {
        resources.push(`<script src="${val}"></script>`)
      });

      tpl = tpl.replace('{{headScript}}', resources.join('\r\n'))
    } else {
      tpl = tpl.replace('{{headScript}}', '')
    }

    res.send(tpl);
  }).catch((err) => {
    console.log(err);
    res.status(404);
    res.end();
  });
});

app.listen(4000, () => console.log('Filestack Examples server are listening on port 4000!'))