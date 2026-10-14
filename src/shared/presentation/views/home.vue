<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import useStationsStore from "../../../stations/application/stations.store.js";
import WeatherReportSummary from "../../../stations/presentation/components/weather-report-summary.vue";

const { t } = useI18n();
const store = useStationsStore();

const { reports, loading } = storeToRefs(store);
const { fetchInitialData } = store;

onMounted(() => {
  fetchInitialData();
});
</script>

<template>
  <section class="p-4" aria-labelledby="home-title">
    <h1 id="home-title" class="text-4xl font-bold mb-2">{{ t('home.title') }}</h1>
    <p class="text-xl mb-4">{{ t('home.subtitle') }}</p>

    <h2 class="text-2xl font-bold mb-4">{{ t('home.section-title') }}</h2>

    <div v-if="loading" class="text-center p-5">
      <i class="pi pi-spin pi-spinner mr-2"></i>
      {{ t('home.loading') }}
    </div>

    <div v-else-if="reports.length === 0" class="text-center p-5">
      <i class="pi pi-folder-open block mb-3"></i>
      {{ t('home.empty') }}
    </div>

    <div v-else class="grid">
      <div v-for="report in reports" :key="report.id" class="col-12 md:col-6">
        <weather-report-summary :report="report" />
      </div>
    </div>
  </section>
</template>