<template>
  <transition name="el-zoom-in-top">
    <!-- <div class="content-wrapper"> -->
      <!-- Content Header (Page header) -->
      <!-- Main content -->
      <div class="login-box">
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
      <!-- /.content -->
    <!-- </div> -->
  </transition>
</template>
<script>
export default {
  data: function () {
    return {
      username: '',
      password: '',
      dialogVisible: false
    }
  },
  methods: {
    login: function () {
      const username = this.username
      const password = this.password
      if (username.length > 0 && password.length > 0) {
        this.$http.userapi.post('/login', {
          'username': username,
          'password': password
        }, {
          headers: {
            'app_code': this.$store.state.appCode
          }
        }).then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error)
        })
      }
    },
    handleClose: function (done) {
      this.$confirm(
        'This will permanently delete the file. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
    }
  }
}
</script>

<style>
.login-box {
  margin: 0 auto;
}
</style>
