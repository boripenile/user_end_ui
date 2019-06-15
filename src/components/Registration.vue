<template>
  <transition name="el-zoom-in-top">
      <el-row>
        <div class="vld-parent">
          <loading :active.sync="isLoading" 
          :is-full-page="true"></loading></div>
        <el-col>
          <div class="box">
            <div class="box-header">
              <el-button type="primary" icon="el-icon-d-arrow-left"
              @click="loginPage()" plain round>Back to Login</el-button> 
              <h3>Start Registration</h3>
              <p>Register your hotel and catering business with us today and 
                have access to the best online service that takes care of your business.</p>
              <p v-if="error">{{ message }}</p>
            </div>
            <div class="box-body">
              <h4>Business Information</h4>
              <p>Please complete all fields expect optional ones.</p>
              <div class="row">
                <div class="col-lg-3">
                  <p>Business Name</p>
                  <el-input v-model="organisation.organisationName" placeholder="What is your business name"></el-input>
                </div>
                <div class="col-lg-3">
                  <p>Business Description</p>
                  <el-input v-model="organisation.workingDescription" placeholder="Tell us about your business"></el-input>
                </div>
                <div class="col-lg-3">
                  <p>Referral Code <em>(optional)</em></p>
                  <el-input v-model="organisation.referralCode" placeholder="Enter a valid referral code" type="email"></el-input>
                </div>
                <div class="col-lg-3">
                  <p>Do you have a motto? <em>(optional)</em></p>
                  <el-input v-model="organisation.motto" placeholder="Enter your business motto"></el-input>
                </div>
              </div>
              <br/>
              <h4>Contact Information</h4>
              <p>Please complete all fields expect optional ones. Ensure that you use a valid email address and phone number</p>
              <div class="row">
                <div class="col-lg-3">
                  <p>First Name</p>
                  <el-input v-model="contact.firstName" placeholder="First name"></el-input>
                </div>
                <div class="col-lg-3">
                  <p>Last Name</p>
                  <el-input v-model="contact.lastName" placeholder="Last name"></el-input>
                </div>
                <div class="col-lg-3">
                  <p>Email Address</p>
                  <el-input v-model="contact.emailAddress" placeholder="Enter a valid Email Address" type="email"></el-input>
                </div>
                <div class="col-lg-3">
                  <p>Phone Number</p>
                  <el-input v-model="contact.phoneNumber" placeholder="Enter a valid phone number"></el-input>
                </div>
              </div>
              <br/>
              <h4>Login Details</h4>
              <p>Please complete all fields expect optional ones</p>
              <div class="row">
                <div class="col-lg-4">
                  <p>Username</p>
                  <el-input v-model="login.username" placeholder="Choose a username"></el-input>
                </div>
                <div class="col-lg-4">
                  <p>Password</p>
                  <el-input v-model="login.password" placeholder="Enter password" type="password"></el-input>
                </div>
                <div class="col-lg-4">
                  <p>Confirm Password</p>
                  <el-input v-model="login.confirmPassword" placeholder="Confirm password" type="password"></el-input>
                </div>
              </div><br/>
              <el-button type="primary" round class="btn btn btn-primary pull-right" 
          @click.prevent="">Proceed to Registration  <i class="el-icon-d-arrow-right"></i></el-button>
            </div>
          </div>
        </el-col>  
    </el-row>
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
      error: false,
      message: 'Error message',
      organisation: {
        organisationName: '',
        referralCode: '',
        workingDescription: '',
        motto: ''
      },
      contact: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: ''
      },
      login: {
        username: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  components: {
    Loading
  },
  mounted () {
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
      console.log('Verification Code: ' + this.verifyCode)
      if (this.verifyCode != null) {
        this.isLoading = true
        this.$http.userapi.post('/users', {
          'organisation': this.organisation,
          'firstName': this.contact.firstName,
          'lastName': this.contact.lastName,
          'emailAddress': this.contact.emailAddress,
          'phoneNumber': thihs.contact.phoneNumber,
          'username': this.login.username,
          'password': this.login.password,
          'appCode': this.$store.state.appCode
        }, {
          headers: {
            'action': 'registerUser'
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
.button-left-margin {
  margin-left: 50px;
}
</style>
