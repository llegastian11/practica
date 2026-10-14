import axios from "axios";

const platformApiUrl = import.meta.env.VITE_STATIONS_API_URL;

/**
 * @summary Root HTTP client configuration for platform REST operations.
 * @description Provides a shared Axios instance targeting the mock backend.
 * @class BaseApi
 * @author Sebastian Reyes Limo
 */
export class BaseApi {
    #http;

    constructor() {
        this.#http = axios.create({
            baseURL: platformApiUrl,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    /**
     * @summary Shared Axios client used by every endpoint wrapper.
     * @returns {import('axios').AxiosInstance}
     */
    get http() {
        return this.#http;
    }
}