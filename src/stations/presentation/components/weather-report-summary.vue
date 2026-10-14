<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

/**
 * @summary Weather report entity rendered by this card.
 * @type {Object}
 */
const props = defineProps({
  report: {
    type: Object,
    required: true
  }
});

/**
 * @summary Formats the report temperature using the Intl unit formatter.
 * @type {import('vue').ComputedRef<string>}
 */
const formattedTemperature = computed(() => {
  return new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "celsius"
  }).format(props.report.temperature);
});
</script>

<template>
  <pv-card class="m-2 shadow-2" :aria-label="'Weather report for ' + report.city">
    <template #title>
      <div class="flex align-items-center gap-2">
        <i class="pi pi-map-marker"></i>
        <span>{{ report.city }}</span>
      </div>
    </template>

    <template #content>
      <div class="flex flex-column gap-2">
        <div><strong>{{ t('report-card.country') }}:</strong> {{ report.country }}</div>
        <div>
          <strong>{{ t('report-card.climate-zone') }}:</strong>
          <span class="ml-2 px-2 py-1 border-round text-sm">{{ report.climateZone }}</span>
        </div>
        <div>
          <strong>{{ t('report-card.temperature') }}:</strong>
          <span class="text-xl font-bold ml-1">{{ formattedTemperature }}</span>
        </div>
        <div><strong>{{ t('report-card.registered-at') }}:</strong> {{ report.registeredAt }}</div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-content-between text-sm">
        <span><i class="pi pi-compass mr-1"></i>{{ report.windSpeed }} km/h</span>
        <span><i class="pi pi-percentage mr-1"></i>{{ report.relativeHumidity }} %</span>
        <span><i class="pi pi-clock mr-1"></i>{{ report.observedAt }}</span>
      </div>
    </template>
  </pv-card>
</template>