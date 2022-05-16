<template>
  <div class="d-flex w-100 h-100 text-center text-white bg-dark">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <main class="px-3">
      <h1>{{ t('site-title') }}</h1>
      <p class="lead">{{ t('offer-list') }}:</p>
      <ul class="list-group lead">
        <li class="list-group-item"> {{ t('offer-one') }}</li>
        <li class="list-group-item">{{ t('offer-two') }}</li>
        <li class="list-group-item">{{ t('offer-three') }} </li>
      </ul>
      <p class="lead">{{ t('citate') }}</p>
      <p class="lead">
        <router-link to="/login" class="btn btn-lg btn-secondary fw-bold border-white bg-white text-dark">{{ t('learn') }}</router-link>
      </p>
    </main>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: 'HomeView',
  components: {
  },
  data(){
    const { t } = useI18n()
    return{
      t,
    }
  }
});
</script>
