if (require.main === module) {
    const apiCaller = require('./utils/apiCaller');
    const authJson = require('./config/auth.json');
    const region = process.argv && process.argv.length > 2 && process.argv[2] || 'in';
    const orgId = process.argv && process.argv.length > 3 && process.argv[3] || 0;
    apiCaller.init(region).then(credentials => {
        const url = `https://${authJson.credentials[region].domain}${authJson.clearCacheUrl}`;
        console.log('URL: ', url);
        apiCaller.request({
            url,
            orgId,
            method: 'DELETE',
            getResponse: true
        }).then(keysDeleted => {
            console.log('Keys deleted form Redis: ', JSON.stringify(keysDeleted));
        }).catch(err => {
            console.error('Clear cache failed with error: ', err);
        });
    }).catch(err => {
        console.error('Clear cache failed with authentication error: ', err);
    });
}