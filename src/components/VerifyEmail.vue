<template>
  <transition name="el-zoom-in-top">
      <div class="login-box">
        <div class="vld-parent">
          <loading :active.sync="isLoading" 
          :is-full-page="true"></loading></div>
        <br/><br/> 
        <center>
          <i class="el-icon-success" v-if="success" style="font-size: 6em; color: #67C23A;"></i>
          <i class="el-icon-error" v-if="error" style="font-size: 6em; color: #F56C6C;"></i>

          <h2>Email Verification</h2>
          <br/>
          <h4>{{ message }}</h4>
          <br/><br/>
          <el-button v-if="success" type="success" plain icon="el-icon-check" 
              @click="proceedToHomePage()">Continue</el-button>
          <el-button v-if="error" type="warning" 
              @click="loginPage()">Try Login</el-button>
        </center>
        <br/><br/><br/>
        <br/><br/><br/><br/>  
      </div>
  </transition>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapMutations, mapGetters } from 'vuex'
import sweetalert from 'sweetalert'

export default {
  data: function () {
    return {
      isLoading: false,
      success: false,
      error: false,
      message: 'Verifying your email address, please wait...',
      verifyCode: this.$route.params.code
    }
  },
  components: {
    Loading
  },
  mounted () {
    this.verifyEmailCode()
  },
  computed: {
    ...mapGetters(['getOrganisation'])
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
    loginPage: function () {
      this.$router.push('/app/login')
    },
    proceedToHomePage: function () {
      if (this.getOrganisation != null) {
        this.$router.push('/profile')
      } else {
        this.$router.push('/app/my-companies')
      }
    },
    verifyEmailCode: function () {
      if (this.verifyCode != null) {
        this.isLoading = true
        this.$http.userapi.post('/users', null, {
          headers: {
            'app_code': this.$store.state.appCode,
            'verify_code': this.verifyCode,
            'action': 'verifyUserEmail'
          }
        }).then(response => {
          this.isLoading = false
          if (response.data.code === 400) {
            this.error = true
            this.message = response.data.message
          } else {
            if (response.data.organisation.length === 1) {
              this.setToken(response.data.token)
              this.setUser(response.data.data)
              this.setApplication(response.data.application)
              this.setOrganisation(response.data.organisation[0])
              this.setRoles(response.data.roles)
              this.setPermissions(response.data.permissions)
            } else {
              this.setUser(response.data.data)
              this.setApplication(response.data.application)
              this.setOrganisations(response.data.organisation)
            }
            this.success = true
            this.message = 'Your email address has been verified successfully!'
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
