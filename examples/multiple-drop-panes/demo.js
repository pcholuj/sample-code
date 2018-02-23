window.addEventListener('DOMContentLoaded', function () {
  const apikey = 'YOUR_APIKEY';
  const client = filestack.init(apikey);

  client.makeDropPane({
    id: 'droppane1',
    overlay: false
  }, {
    rootId: 'ICanBeAnythingAsLongAsIAmUnique'
  });
  client.makeDropPane({
    id: 'droppane2',
    overlay: false
  }, {
    rootId: 'pane2'
  });
  client.makeDropPane({
    id: 'droppane3',
    overlay: false
  }, {
    rootId: 'pane3'
  });
  client.makeDropPane({
    id: 'droppane4',
    overlay: false
  }, {
    rootId: 'pane4'
  });
});