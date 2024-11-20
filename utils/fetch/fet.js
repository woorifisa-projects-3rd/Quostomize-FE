class CustomFetch {
    serverUrl;
    
    constructor(serverUrl) {
        this.serverUrl = serverUrl;
    }

    async handleRequest(endpoint, options) {
        const response = await fetch(`${this.serverUrl}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include',
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (options.method === 'GET') {
            return response.json();
        }
        
        return response;
    }

    get = (endpoint) => this.handleRequest(endpoint, { method: 'GET' });
    
    post = (endpoint, data) => this.handleRequest(endpoint, {
        method: 'POST',
        body: data ? JSON.stringify(data) : {}
    });

    patch = (endpoint, data) => this.handleRequest(endpoint, {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : {}
    });

    delete = (endpoint) => this.handleRequest(endpoint, { method: 'DELETE' });
}

export default CustomFetch;