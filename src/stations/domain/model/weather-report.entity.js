/**
 * @summary Domain entity representing a registered weather report.
 * @description Encapsulates telemetry snapshot data using private fields.
 * @class WeatherReport
 * @author Sebastian Reyes Limo
 */
export class WeatherReport {
    #id;
    #stationId;
    #climateZone;
    #city;
    #country;
    #latitude;
    #longitude;
    #temperature;
    #windSpeed;
    #relativeHumidity;
    #observedAt;
    #registeredAt;

    /**
     * @param {Object} [props={}] - Plain resource data used to hydrate the entity.
     */
    constructor({
                    id = null,
                    stationId = null,
                    climateZone = "",
                    city = "",
                    country = "",
                    latitude = 0,
                    longitude = 0,
                    temperature = 0,
                    windSpeed = 0,
                    relativeHumidity = 0,
                    observedAt = "",
                    registeredAt = ""
                } = {}) {
        this.#id = id;
        this.#stationId = stationId;
        this.#climateZone = climateZone;
        this.#city = city;
        this.#country = country;
        this.#latitude = latitude;
        this.#longitude = longitude;
        this.#temperature = temperature;
        this.#windSpeed = windSpeed;
        this.#relativeHumidity = relativeHumidity;
        this.#observedAt = observedAt;
        this.#registeredAt = registeredAt;
    }

    get id() { return this.#id; }
    get stationId() { return this.#stationId; }
    get climateZone() { return this.#climateZone; }
    get city() { return this.#city; }
    get country() { return this.#country; }
    get latitude() { return this.#latitude; }
    get longitude() { return this.#longitude; }
    get temperature() { return this.#temperature; }
    get windSpeed() { return this.#windSpeed; }
    get relativeHumidity() { return this.#relativeHumidity; }
    get observedAt() { return this.#observedAt; }
    get registeredAt() { return this.#registeredAt; }
}