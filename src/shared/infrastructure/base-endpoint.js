/**
 * @summary Generic CRUD endpoint wrapper for Axios operations.
 * @description Delegates HTTP verbs over a specific platform resource path.
 * @class BaseEndpoint
 * @author Sebastian Reyes Limo
 */
export class BaseEndpoint {
    /**
     * @param {import('./base-api.js').BaseApi} baseApi - Root API configuration client.
     * @param {string} endpointPath - Relative collection endpoint path.
     */
    constructor(baseApi, endpointPath) {
        this.http = baseApi.http;
        this.endpointPath = endpointPath;
    }

    /**
     * @summary Retrieves all resources from the server collection.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getAll() {
        return this.http.get(this.endpointPath);
    }

    /**
     * @summary Persists a new resource payload via POST request.
     * @param {Object} resource - Resource data schema.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    create(resource) {
        return this.http.post(this.endpointPath, resource);
    }

    /**
     * @summary Partially modifies an existing collection entry.
     * @param {string|number} id - Target identifier key.
     * @param {Object} resource - Modification payload fields.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    update(id, resource) {
        return this.http.patch(`${this.endpointPath}/${id}`, resource);
    }
}