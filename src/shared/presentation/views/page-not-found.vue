<script setup>
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
</script>

<template>
  <section class="p-4 text-center" aria-labelledby="not-found-title">
    <h1 id="not-found-title" class="text-4xl font-bold mb-2">{{ t('page-not-found.title') }}</h1>
    <p class="mb-4">{{ t('page-not-found.content', { unavailableRoute: route.path }) }}</p>
    <pv-button :label="t('page-not-found.btn-back')" @click="router.push('/home')" />
  </section>
</template>
