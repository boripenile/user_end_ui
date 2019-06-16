<template>
    <transition name="el-zoom-in-top">
        <div class="content-wrapper">
                                 <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>{{ getApplication.app_name }}<small><i class="ti-heart"></i><i class="ti-export"></i><i class="ti-printer"></i></small></h1>
            <ol class="breadcrumb">
                <li><router-link to="/"> <i class="ti-home"></i></router-link></li>
                <li><a href="#">Settings</a></li>
                <li class="active">User Management</li>
            </ol>
        </section>
            <!-- Main content -->
            <section class="content">
                <div class="vld-parent">
                  <loading :active.sync="isLoading" 
                  :is-full-page="true"></loading></div>
                <div class="todo-devin">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="side-todo">
                            <ul>
                                <li class="clearfix"><img v-bind:src="getUser.image_url" alt="avatar"> <div class="about"><div class="name">{{ getUser.first_name}} {{ getUser.last_name }}</div> <div class="status"><i class="fa fa-circle online"></i> online </div></div></li>
                                <li class="completed">Active users <b>{{users.filter(user => {return user.active === true}).length}}</b></li>
                                <li class="pending">Inactive users <b>{{users.filter(user => {return user.active === false}).length}}</b></li>
</ul>

                            <create-user v-on:create-user="createRole"></create-user>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <user-list v-bind:users="users"></user-list>
                        </div>
                    </div>
                </div>
            </section>
            <!-- /.content -->
        </div>
    </transition>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapGetters } from 'vuex'
import sweetalert from 'sweetalert'
import UserList from '../../settings/users/UserList.vue'
import CreateUser from '../../settings/users/CreateUser.vue'
export default {
  name: 'Role',
  components: {
    UserList,
    CreateUser,
    Loading
  },
  data: function () {
    return {
      isLoading: false,
      users: [{
        id: 1,
        first_name: 'Murtadha',
        last_name: 'Ali',
        other_name: 'Olanrewaju',
        active: true
      }]
    }
  },
  mounted () {
    this.loadUsers()
  },
  computed: {
    ...mapGetters(['getUser', 'getToken', 'getApplication', 'getOrganisation'])
  },
  methods: {
    createRole: function (newRole) {
      this.isLoading = true
      this.$http.userapi.post('/users', {
        'role_name': newRole.roleName,
        'description': newRole.description,
        'active': false,
        'created_by': this.getUser.username
      }, {
        headers: {
          'app_code': this.getApplication.app_code,
          'action': 'createRole',
          'token': this.getToken
        }
      }).then(response => {
        this.isLoading = false
        if (response.data.code === 200) {
          this.loadUsers()
          sweetalert('Success!', 'Role created!', 'success')
        }
      }).catch(error => {
        this.isLoading = false
        console.log(error)
      })
    },
    loadUsers: function () {
      this.isLoading = true
      this.$http.userapi.get('/users', {
        headers: {
          'action': 'findUsersByOrganisation',
          'org_code': this.getOrganisation.code,
          'token': this.getToken
        }
      }).then(response => {
        this.isLoading = false
        if (response.data.code === 200) {
          const myUsers = response.data.data
          if (myUsers !== null && myUsers.length > 0) {
            this.users = []
            for (var i = 0; i < myUsers.length; i++) {
              this.users.push(myUsers[i])
            }
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