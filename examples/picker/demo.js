window.addEventListener('DOMContentLoaded', function () {
    const apikey = 'YOUR_APIKEY';
    const client = filestack.init(apikey);
    client.pick({
            maxFiles: 20,
            uploadInBackground: false,
            onOpen: () => console.log('opened!'),
        })
        .then((res) => {
            console.log(res.filesUploaded)
            console.log(res.filesFailed)
        });

});