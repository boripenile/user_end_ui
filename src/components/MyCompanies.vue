<template>
    <transition name="el-zoom-in-top">
        <section class="content">
          <div class="vld-parent">
            <loading :active.sync="isLoading" 
            :is-full-page="true"></loading></div>
            <center><h2>Welcome to {{ getApplication.app_name }}</h2></center>
            <hr>
            <div class="row">
              <div class="col-md-4" v-for="organisation in getOrganisations">
                <div class="well-media">
                    <div class="vendor">
                        <a rel="group" href="#"> 
                          <img class="img-responsive-media" v-bind:src="organisation.image_url" 
                          v-bind:alt="organisation.name" width="150" height="150"> </a>
                    </div>
                    <div class="video-text">
                      <h2>{{ organisation.name }}</h2>
                      <p>{{ organisation.description }}</p>
                    </div>
                    <button class="btn btn-info pull-right" @click="configOrganisation(organisation)">Continue...</button>
                    <div style="clear:both;"></div>
                </div>
              </div>
            </div>
          </section>
    </transition>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import sweetalert from 'sweetalert'

export default {
  data: function () {
    return {
      isLoading: false
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapGetters(['getApplication', 'getOrganisations', 'getUser'])
  },
  methods: {
    ...mapMutations(['setOrganisation', 'setToken', 'setRoles', 'setPermissions']),
    showAlert: function (message) {
      sweetalert({
        title: 'Error',
        text: message,
        type: 'error',
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'OK',
        closeOnConfirm: true
      })
    },
    configOrganisation: function (org) {
      const username = this.getUser.username
      const password = this.getUser.password
      if (username.length > 0 && password.length > 0) {
        this.isLoading = true
        this.$http.userapi.post('/login', {
          'username': username,
          'password': password
        }, {
          headers: {
            'action': 'getRolesAndPermissions',
            'org_code': org.code
          }
        }).then(response => {
          this.isLoading = false
          if (response.data.code === 400) {
            this.showAlert(response.data.message)
          } else {
            if (response.data.token != null) {
              this.setToken(response.data.token)
              this.setOrganisation(org)
              this.setRoles(response.data.roles)
              this.setPermissions(response.data.permissions)
              this.$router.push('/profile')
            } else {
              this.$router.push('/app/my-companies')
            }
          }
        }).catch(error => {
          this.isLoading = false
          console.log(error)
        })
      }
    }
  }
}
</script>

<style>
.companies-box {
  margin: 0 auto;
}
.central {
  text-align: center;
}
</style>

