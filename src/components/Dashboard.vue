<template>
  <div v-loading="loading">
    <app-header></app-header>

    <!-- Left side column. contains the sidebar -->
    <app-sidebar></app-sidebar>
    <!-- Content Wrapper. Contains page content -->
    <router-view></router-view>
    <!-- /.content-wrapper -->

    <app-footer></app-footer>

    <control-sidebar></control-sidebar>
  </div>
</template>

<script>
  import Sidebar from './partials/Sidebar.vue'
  import Header from './partials/Header.vue'
  import Footer from './partials/Footer.vue'
  import ControlSidebar from './partials/ControlSidebar.vue'
  import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
  import 'vue-loading-overlay/dist/vue-loading.css'

  export default {
    name: 'Dashboard',
    components: {
      'app-sidebar': Sidebar,
      'app-header': Header,
      'app-footer': Footer,
      'control-sidebar': ControlSidebar,
      NprogressContainer
    }
  }
</script>
