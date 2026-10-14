/**
 * @summary Domain entity representing a weather monitoring station.
 * @description Encapsulates station data using private fields.
 * @class WeatherStation
 * @author Sebastian Reyes Limo
 */
export class WeatherStation {
    #id;
    #name;
    #city;
    #country;
    #latitude;
    #longitude;
    #climateZone;
    #lastTemperature;

    /**
     * @param {Object} [props={}] - Plain resource data used to hydrate the entity.
     */
    constructor({
                    id = null,
                    name = "",
                    city = "",
                    country = "",
                    latitude = 0,
                    longitude = 0,
                    climateZone = "",
                    lastTemperature = 0
                } = {}) {
        this.#id = id;
        this.#name = name;
        this.#city = city;
        this.#country = country;
        this.#latitude = latitude;
        this.#longitude = longitude;
        this.#climateZone = climateZone;
        this.#lastTemperature = lastTemperature;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get city() { return this.#city; }
    get country() { return this.#country; }
    get latitude() { return this.#latitude; }
    get longitude() { return this.#longitude; }
    get climateZone() { return this.#climateZone; }
    get lastTemperature() { return this.#lastTemperature; }
}