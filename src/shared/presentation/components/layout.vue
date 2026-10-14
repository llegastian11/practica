<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

/**
 * Navigation options rendered inside the main application toolbar.
 * @type {Array<{label: string, path: string}>}
 */
const navigationOptions = [
  { label: "option.home", path: "/home" },
  { label: "option.new-report", path: "/weather/reports/new" }
];

/**
 * Navigates the user to the given in-app route.
 * @param {string} path - Target semantic route.
 */
const navigateTo = (path) => {
  router.push(path);
};
</script>

<template>
  <pv-toolbar class="bg-primary" aria-label="Main application toolbar">
    <template #start>
      <div class="flex align-items-center gap-2">
        <img :src="logoUrl" alt="Open-Meteo logo" height="32" />
        <span class="font-bold text-xl">Open-Meteo Weather Monitoring Platform</span>
      </div>
    </template>

    <template #center>
      <div class="flex gap-2">
        <pv-button
            v-for="option in navigationOptions"
            :key="option.label"
            :label="t(option.label)"
            text
            @click="navigateTo(option.path)"
        />
      </div>
    </template>

    <template #end>
      <language-switcher />
    </template>
  </pv-toolbar>

  <main class="p-4">
    <router-view />
  </main>
</template>