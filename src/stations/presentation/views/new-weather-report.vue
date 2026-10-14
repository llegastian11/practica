<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import useStationsStore from "../../application/stations.store.js";
import { OpenMeteoApi } from "../../../weather/infrastructure/open-meteo-api.js";

const { t } = useI18n();
const router = useRouter();
const store = useStationsStore();
const openMeteoApi = new OpenMeteoApi();

const { stations, errors } = storeToRefs(store);
const { fetchInitialData, addReport } = store;

/**
 * @summary Climate zones accepted by the weather report form.
 * @type {import('vue').Ref<string[]>}
 */
const climateZones = ref(["coastal", "highland", "tropical", "desert", "temperate", "urban"]);

const selectedZone = ref("");
const selectedStationId = ref(null);
const errorMessage = ref("");
const loadingReport = ref(false);

onMounted(() => {
  if (stations.value.length === 0) {
    fetchInitialData();
  }
});

/**
 * @summary Stations filtered by the currently selected climate zone.
 * @type {import('vue').ComputedRef<Array>}
 */
const filteredStations = computed(() => {
  if (!selectedZone.value) return [];
  return stations.value.filter(station => station.climateZone === selectedZone.value);
});

const handleZoneChange = () => {
  selectedStationId.value = null;
  errorMessage.value = "";
};

/**
 * @summary Validates business rules and persists a new weather report.
 */
const handleCreateReport = () => {
  errorMessage.value = "";
  const station = stations.value.find(item => item.id === selectedStationId.value);

  if (!station) return;

  loadingReport.value = true;

  openMeteoApi.getCurrentWeather(station.latitude, station.longitude)
      .then(response => {
        const current = response.data.current;
        const temperatureDifference = Math.abs(current.temperature_2m - station.lastTemperature);

        if (temperatureDifference < 2 || current.wind_speed_10m > 60) {
          errorMessage.value = t("new-report.validation-error");
          return null;
        }

        const payload = {
          stationId: station.id,
          climateZone: station.climateZone,
          city: station.city,
          country: station.country,
          latitude: station.latitude,
          longitude: station.longitude,
          temperature: current.temperature_2m,
          windSpeed: current.wind_speed_10m,
          relativeHumidity: current.relative_humidity_2m,
          observedAt: current.time,
          registeredAt: new Date().toISOString().slice(0, 19).replace("T", " ")
        };

        return addReport(payload).then(() => router.push("/home"));
      })
      .catch(error => {
        errorMessage.value = error.message;
      })
      .finally(() => {
        loadingReport.value = false;
      });
};

const handleCancel = () => {
  router.push("/home");
};
</script>

<template>
  <section class="p-4" aria-labelledby="new-report-title">
    <h1 id="new-report-title" class="text-4xl font-bold mb-2">{{ t('new-report.title') }}</h1>
    <p class="text-xl mb-4">{{ t('new-report.subtitle') }}</p>

    <form @submit.prevent="handleCreateReport" class="flex flex-column gap-3" style="max-width: 32rem">
      <div class="flex flex-column gap-2">
        <label for="climateZone" class="font-bold">{{ t('new-report.select-zone') }}</label>
        <select id="climateZone" v-model="selectedZone" @change="handleZoneChange" class="p-3">
          <option value="" disabled>{{ t('new-report.select-zone') }}</option>
          <option v-for="zone in climateZones" :key="zone" :value="zone">{{ zone }}</option>
        </select>
      </div>

      <div class="flex flex-column gap-2">
        <label for="weatherStation" class="font-bold">{{ t('new-report.select-station') }}</label>
        <select id="weatherStation" v-model="selectedStationId" :disabled="!selectedZone" class="p-3">
          <option :value="null" disabled>{{ t('new-report.select-station') }}</option>
          <option v-for="station in filteredStations" :key="station.id" :value="station.id">
            {{ station.name }} ({{ station.lastTemperature }} C)
          </option>
        </select>
      </div>

      <small v-if="errorMessage" class="text-red-500">{{ errorMessage }}</small>

      <div class="flex gap-2">
        <pv-button :label="t('new-report.btn-create')" type="submit" :disabled="!selectedStationId || loadingReport" :loading="loadingReport" />
        <pv-button :label="t('new-report.btn-cancel')" severity="secondary" @click="handleCancel" />
      </div>
    </form>
  </section>
</template>