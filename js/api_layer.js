const WEBSHOP_ID = 144601;
const LANGUAGE = 'en';

// Phenominally bad idea to have these in front end JS. 
// Ideally the article should be public, or we should log in as a demo customer. Both are beyond the current scope of the assignment.
const ADMIN_USERNAME = 'adwaithr99@gmail.com';
const ADMIN_PASSWORD = 'LPjN7DpD'

async function getAuthToken() {
    const token = sessionStorage.getItem('token');

    if (token) {
        // If it's already in session, return it
        return token;
    }

    const authToken = await makeAbicartRequest('Admin.login', [
        ADMIN_USERNAME,
        ADMIN_PASSWORD,
    ], false);

    sessionStorage.setItem('token', authToken);
    return authToken;
}

async function makeAbicartRequest(methodName, parameters, shouldAuthenticate = true) {

    // URL of the JSON-RPC server
    let abicartBackendUrl = 'https://admin.abicart.se/backend/jsonrpc/v1/?webshop=144601&language=en';

    if (shouldAuthenticate) {
        // No chance of an infinite recursive loop - the makeAbicartRequest call in getAuthToken has the "shouldAuthenticate" value set to false
        const authToken = await getAuthToken();
        abicartBackendUrl += '&auth=' + authToken;
    }

    return new Promise((resolve, reject) => {
        const jsonRpcRequest = {
            jsonrpc: '2.0',
            id: 1,
            method: methodName,
            params: parameters,
        };

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-rpc'
            },
            body: JSON.stringify(jsonRpcRequest)
        };

        fetch(abicartBackendUrl, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    reject('Unexpected response');
                    console.error(response)
                }
                return response.json();
            })
            .then(data => {
                resolve(data.result);
            })
            .catch(error => {
                reject('There was a problem with the fetch operation:' + error.message);
                console.error(error);
            });
    })
}

async function getProductData(productId) {

    const productData = await makeAbicartRequest('Article.get', [
        productId,
        true,
    ]);

    return productData;
}