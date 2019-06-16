<template>
  <transition name="el-zoom-in-top">
      <el-form :rules="rules" :model="registration" ref="registrationForm" status-icon>
        <div class="vld-parent">
          <loading :active.sync="isLoading" 
          :is-full-page="true"></loading></div>
          <div class="box">
            <div class="box-header">
              <el-button type="primary" icon="el-icon-d-arrow-left"
              @click="loginPage()" plain round>Back to Login</el-button> 
              <h3><b>Start Registration</b></h3>
              <p>Register your hotel and catering business with us today and 
                have access to the best online service that takes care of your business.</p>
              <el-alert v-if="success"
                title="Registration completed successfully"
                type="success"
                v-bind:description="message"
                show-icon>
              </el-alert>
              <el-alert v-if="error"
                title="Registration cannot be completed"
                type="warning"
                v-bind:description="message"
                show-icon>
              </el-alert>
            </div>
            <div class="box-body">
              <h4><b>Business Information</b></h4>
              <p>Please complete all fields expect optional ones.</p>
              <div class="row">
                <div class="col-lg-3">
                  <p>Business Name</p>
                  <el-form-item prop="organisationName">
                    <el-input v-model="registration.organisationName" placeholder="What is your business name"></el-input>
                  </el-form-item>
                </div>
                <div class="col-lg-3">
                  <p>Business Description</p>
                  <el-form-item prop="workingDescription">
                    <el-input v-model="registration.workingDescription" placeholder="Tell us about your business"></el-input>
                  </el-form-item>
                </div>
                <div class="col-lg-3">
                  <p>Referral Code <em>(optional)</em></p>
                  <el-form-item prop="referralCode">
                    <el-input v-model="registration.referralCode" placeholder="Enter a valid referral code"></el-input>
                  </el-form-item>
                </div>
                <div class="col-lg-3">
                  <p>Do you have a motto? <em>(optional)</em></p>
                  <el-form-item prop="motto">
                    <el-input v-model="registration.motto" placeholder="Enter your business motto"></el-input>
                  </el-form-item>
                </div>
              </div>
              <br/>
              <h4><b>Contact Information</b></h4>
              <p>Please complete all fields expect optional ones. Ensure that you use a valid email address and phone number</p>
              <div class="row">
                <div class="col-lg-3">
                  <p>First Name</p>
                  <el-form-item prop="firstName">
                    <el-input v-model="registration.firstName" placeholder="First name"></el-input>
                  </el-form-item>
                </div>
                <div class="col-lg-3">
                  <p>Last Name</p>
                  <el-form-item prop="lastName">
                    <el-input v-model="registration.lastName" placeholder="Last name"></el-input>
                  </el-form-item>
                </div>
                <div class="col-lg-3">
                  <p>Email Address</p>
                  <el-form-item prop="emailAddress">
                    <el-input v-model="registration.emailAddress" placeholder="Enter a valid Email Address"></el-input>
                  </el-form-item>
                </div>
                <div class="col-lg-3">
                  <p>Phone Number</p>
                  <el-form-item prop="phoneNumber">
                    <el-input v-model.number="registration.phoneNumber" placeholder="Enter a valid phone number" type="number"></el-input>
                  </el-form-item>
                </div>
              </div>
              <br/>
              <h4><b>Login Information</b></h4>
              <p>Please complete all fields expect optional ones</p>
              <div class="row">
                <div class="col-lg-4">
                  <p>Username</p>
                  <el-form-item prop="username">
                    <el-input v-model="registration.username" placeholder="Choose a username"></el-input>
                  </el-form-item>
                </div>
                <div class="col-lg-4">
                  <p>Password</p>
                  <el-form-item prop="password">
                    <el-input v-model="registration.password" placeholder="Enter password" type="password"></el-input>
                  </el-form-item>
                </div>
                <div class="col-lg-4">
                  <p>Confirm Password</p>
                  <el-form-item prop="confirmPassword">
                    <el-input v-model="registration.confirmPassword" placeholder="Confirm password" type="password"></el-input>
                  </el-form-item>
                </div>
              </div><br/>
              <div class="pull-right">

                <el-button type="primary" round class="btn btn btn-primary left-margin" 
          @click.prevent="validateRegistration('registrationForm')">Proceed with Registration  <i class="el-icon-d-arrow-right"></i></el-button>
                <el-button round class="btn btn" 
          @click.prevent="resetRegistrationForm('registrationForm')">Reset</i></el-button>
              </div>              
            </div>
          </div>
    </el-form>
  </transition>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapMutations, mapGetters } from 'vuex'
import sweetalert from 'sweetalert'

export default {
  data: function () {
    var validateOrganisationName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('Please provide your business name'))
      }
      setTimeout(() => {
        if (value.length < 5 || value.length > 60) {
          callback(new Error('Name should be 5 to 60 characters.'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validateDescription = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('Please tell us about your business'))
      }
      setTimeout(() => {
        if (value.length < 20 || value.length > 100) {
          callback(new Error('Description should be 20 to 100 characters'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validateReferralCode = (rule, value, callback) => {
      if (value === '') {
        return callback()
      } else if (value !== '' && (value.length < 10 || value.length > 10)) {
        callback(new Error('Referral Code is invalid.'))
      } else {
        this.validateCode(value, callback)
      }
    }
    var validateMotto = (rule, value, callback) => {
      if (value === '') {
        return callback()
      }
      setTimeout(() => {
        if (value !== '' && (value.length < 5 || value.length > 50)) {
          callback(new Error('Motto should be 5 to 50 characters.'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validateEmailAddress = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('Provide a valid email address'))
      } else if (value !== '') {
        if (this.regex.test(value) === false) {
          callback(new Error('Invalid email address. Please check it'))
        } else {
          callback()
        }
      }
    }
    var validatePhoneNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Provide a valid phone number'))
      } else if (!Number.isInteger(value)) {
        callback(new Error('Invalid phone number. Please check it'))
      } else {
        var numberStr = String(value)
        if (numberStr.length === 13) {
          callback()
        } else {
          callback(new Error('Phone number must be 13 characters. Example: 2348078675634'))
        }
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please choose a password'))
      } else {
        if (value.length < 8) {
          callback(new Error('Password must be at least 8 characters'))
        }
        if (this.registration.confirmPassword !== '') {
          this.$refs.registrationForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    var validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please confirm your password'))
      } else if (value !== this.registration.password) {
        callback(new Error('Confirm password does not match with the password! Please re-enter it.'))
      } else {
        callback()
      }
    }
    return {
      regex: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      isLoading: false,
      error: false,
      success: false,
      message: 'Error message',
      wrongReferralCode: '',
      registration: {
        organisationName: '',
        referralCode: '',
        workingDescription: '',
        motto: '',
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        organisationName: [
          { validator: validateOrganisationName, trigger: 'blur' }
        ],
        workingDescription: [
          { validator: validateDescription, trigger: 'blur' }
        ],
        referralCode: [
          { validator: validateReferralCode, trigger: 'blur' }
        ],
        motto: [
          { validator: validateMotto, trigger: 'blur' }
        ],
        firstName: [
          { required: true, message: 'Provide your administrator\'s first name', trigger: 'blur' },
          { min: 3, max: 20, message: 'First name should be 3 to 20 characters.', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: 'Provide your administrator\'s last name', trigger: 'blur' },
          { min: 3, max: 20, message: 'Last name should be 3 to 20 characters.', trigger: 'blur' }
        ],
        emailAddress: [
          { validator: validateEmailAddress, trigger: 'blur' }
        ],
        phoneNumber: [
          { validator: validatePhoneNumber, trigger: 'blur' }
        ],
        username: [
          { required: true, message: 'Choose a username', trigger: 'blur' },
          { min: 7, max: 50, message: 'Username should be 7 to 50 characters.', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validateConfirmPass, trigger: 'blur' }
        ]
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
    validateCode: function (code, callback) {
      this.$http.userapi.post('/users', null, {
        headers: {
          'referral_code': code,
          'app_code': this.$store.state.appCode,
          'action': 'validateReferralCode'
        }
      }).then(response => {
        if (response.data.code === 400) {
          if (callback) {
            callback(response.data.message)
          }
        } else {
          if (response.data.code === 200) {
            if (callback) {
              callback()
            }
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    validateRegistration: function (registrationForm) {
      this.$refs[registrationForm].validate((valid) => {
        if (valid) {
          this.registerUser()
        } else {
          return false
        }
      })
    },
    resetRegistrationForm: function (registrationForm) {
      this.$refs[registrationForm].resetFields()
    },
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
    registerUser: function () {
      this.isLoading = true
      this.$http.userapi.post('/users', {
        'organisation': {
          'organisationName': this.registration.organisationName,
          'referralCode': this.registration.referralCode,
          'workingDescription': this.registration.workingDescription,
          'motto': this.registration.motto
        },
        'firstName': this.registration.firstName,
        'lastName': this.registration.lastName,
        'emailAddress': this.registration.emailAddress,
        'phoneNumber': this.registration.phoneNumber,
        'username': this.registration.username,
        'password': this.registration.password,
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
          if (response.data.code === 200) {
            this.error = false
            this.success = true
            this.message = response.data.message
            this.resetRegistrationForm('registrationForm')
          }
        }
      }).catch(error => {
        this.isLoading = false
        console.log(error)
      })
    }
  }
}
</script>

<style>
.left-margin {
  margin-right: 4em
}
</style>
