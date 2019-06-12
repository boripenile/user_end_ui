<template>
  <transition name="el-zoom-in-top">
      <div class="login-box">
        <div class="vld-parent">
          <loading :active.sync="isLoading" 
          :is-full-page="true"></loading></div>
        <el-alert v-if="hasError" v-bind:title="title" type="error" v-bind:description="message" show-icon> </el-alert>
        <center><h2>Login</h2></center>
        <hr>
        <form role="form">
          <div class="form-group">
            <a href="#" class="pull-right label-forgot">Forgot email?</a>
            <label for="inputUsernameEmail">Username or email</label>
            <input type="text" id="inputUsernameEmail" v-model="username" class="form-control">
          </div>
          <div class="form-group">
            <a href="#" class="pull-right label-forgot">Forgot password?</a>
            <label for="inputPassword">Password</label>
            <input type="password" id="inputPassword" v-model="password" class="form-control">
          </div>
          <div class="checkbox pull-left">
            <label>
              <input type="checkbox">Remember me
            </label>
          </div>
          <button class="btn btn btn-primary pull-right" @click.prevent="login">Log In</button>
        </form>
        <a class="forgotLnk" href="#"></a>
        <div class="or-box">
          <center>
            <span class="text-center login-with">
              Login or
              <b>Sign Up</b>
            </span>
          </center>
        </div>
        
        <div class="row-block">
          <div class="row">
            <div class="col-md-12 row-block">
              <a href="#" class="btn btn-primary btn-block">Create New Account</a>
            </div>
          </div>
        </div>
      </div>
  </transition>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapMutations } from 'vuex'
import sweetalert from 'sweetalert'

export default {
  data: function () {
    return {
      isLoading: false,
      username: '',
      password: ''
    }
  },
  components: {
    Loading
  },
  methods: {
    ...mapMutations(['setUser', 'setToken', 'setApplication', 'setRoles', 'setPermissions', 'setOrganisations', 'setOrganisation']),
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
    login: function () {
      const username = this.username
      const password = this.password
      if (username.length > 0 && password.length > 0) {
        this.isLoading = true
        this.$http.userapi.post('/login', {
          'username': username,
          'password': password
        }, {
          headers: {
            'app_code': this.$store.state.appCode
          }
        }).then(response => {
          this.isLoading = false
          if (response.data.code === 400) {
            this.showAlert(response.data.message)
          } else {
            if (response.data.organisation.length === 1) {
              this.setToken(response.data.token)
              this.setUser(response.data.data)
              this.setApplication(response.data.application)
              this.setOrganisation(response.data.organisation[0])
              this.setRoles(response.data.roles)
              this.setPermissions(response.data.permissions)
              this.$router.push('/profile')
            } else {
              this.setUser(response.data.data)
              this.setApplication(response.data.application)
              this.setOrganisations(response.data.organisation)
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
.login-box {
  margin: 0 auto;
}
</style>
