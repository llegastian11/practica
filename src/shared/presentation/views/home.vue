<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section class="p-4" aria-labelledby="home-title">
    <h1 id="home-title" class="text-4xl font-bold mb-2">{{ t('home.title') }}</h1>
    <p class="text-xl mb-4">{{ t('home.subtitle') }}</p>
  </section>
</template>