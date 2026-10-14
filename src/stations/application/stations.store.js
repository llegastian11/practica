import { defineStore } from "pinia";
import { ref, shallowRef, computed } from "vue";
import { StationsApi } from "../infrastructure/stations-api.js";
import { WeatherStationAssembler } from "../infrastructure/weather-station.assembler.js";
import { WeatherReportAssembler } from "../infrastructure/weather-report.assembler.js";

const stationsApi = new StationsApi();

/**
 * @summary Reactive state store for the Stations bounded context.
 * @description Coordinates data fetches and persistence for stations and reports.
 * @author Sebastian Reyes Limo
 */
const useStationsStore = defineStore("stations", () => {
    const stations = shallowRef([]);
    const reports = shallowRef([]);
    const errors = ref([]);
    const loading = ref(false);
    const reportsCount = computed(() => reports.value.length);

    /**
     * @summary Synchronizes both server collections into application memory.
     */
    function fetchInitialData() {
        loading.value = true;
        Promise.all([stationsApi.getStations(), stationsApi.getReports()])
            .then(([stationsResponse, reportsResponse]) => {
                stations.value = WeatherStationAssembler.toEntitiesFromResponse(stationsResponse);
                reports.value = WeatherReportAssembler.toEntitiesFromResponse(reportsResponse);
                errors.value = [];
            })
            .catch(error => {
                errors.value.push(error.message);
            })
            .finally(() => {
                loading.value = false;
            });
    }

    /**
     * @summary Persists a validated report and syncs station temperature.
     * @param {Object} reportResource - Report payload to persist.
     * @returns {Promise<void>}
     */
    function addReport(reportResource) {
        return stationsApi.createReport(reportResource)
            .then(response => {
                const newReport = WeatherReportAssembler.toEntityFromResource(response.data);
                reports.value = [...reports.value, newReport];
                return stationsApi.updateStationTemperature(
                    reportResource.stationId,
                    reportResource.temperature
                );
            })
            .then(() => {
                stations.value = stations.value.map(station => {
                    if (station.id !== reportResource.stationId) return station;
                    return WeatherStationAssembler.toEntityFromResource({
                        id: station.id,
                        name: station.name,
                        city: station.city,
                        country: station.country,
                        latitude: station.latitude,
                        longitude: station.longitude,
                        climateZone: station.climateZone,
                        lastTemperature: reportResource.temperature
                    });
                });
            })
            .catch(error => {
                errors.value.push(error.message);
                throw error;
            });
    }

    return {
        stations,
        reports,
        errors,
        loading,
        reportsCount,
        fetchInitialData,
        addReport
    };
});

export default useStationsStore;