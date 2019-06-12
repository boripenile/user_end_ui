<template>
  <div v-loading="loading">
    <!-- Content Wrapper. Contains page content -->
    <router-view></router-view>
    <!-- /.content-wrapper -->
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Footer from './partials/Footer.vue'
  import NprogressContainer from 'vue-nprogress/src/NprogressContainer'

  export default {
    name: 'Dashboard',
    components: {
      'app-footer': Footer,
      NprogressContainer
    }
  }
</script>
