<template>
    <transition name="el-zoom-in-top">
        <div class="content-wrapper">
                                 <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>{{ getApplication.app_name }}<small><i class="ti-heart"></i><i class="ti-export"></i><i class="ti-printer"></i></small></h1>
            <ol class="breadcrumb">
                <li><router-link to="/"> <i class="ti-home"></i></router-link></li>
                <li><a href="#">Settings</a></li>
                <li class="active">Role Management</li>
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
                                <li class="completed">Active roles <b>{{roles.filter(role => {return role.active === true}).length}}</b></li>
                                <li class="pending">Inactive roles <b>{{roles.filter(role => {return role.active === false}).length}}</b></li>
</ul>

                            <create-role v-on:create-role="createRole"></create-role>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <role-list v-bind:roles="roles"></role-list>
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
import RoleList from '../../settings/roles/RoleList.vue'
import CreateRole from '../../settings/roles/CreateRole.vue'
export default {
  name: 'Role',
  components: {
    RoleList,
    CreateRole,
    Loading
  },
  data: function () {
    return {
      isLoading: false,
      roles: [{
        id: 1,
        role_name: 'superadmin',
        description: 'Super administrator',
        active: true
      }]
    }
  },
  mounted () {
    this.loadRoles()
  },
  computed: {
    ...mapGetters(['getUser', 'getToken', 'getApplication', 'getOrganisation'])
  },
  methods: {
    createRole: function (newRole) {
      this.isLoading = true
      this.$http.userapi.post('/roles', {
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
          this.loadRoles()
          sweetalert('Success!', 'Role created!', 'success')
        }
      }).catch(error => {
        this.isLoading = false
        console.log(error)
      })
    },
    loadRoles: function () {
      this.isLoading = true
      this.$http.userapi.get('/roles', {
        headers: {
          'token': this.getToken
        }
      }).then(response => {
        this.isLoading = false
        if (response.data.code === 200) {
          const myRoles = response.data.data
          if (myRoles !== null && myRoles.length > 0) {
            this.roles = []
            for (var i = 0; i < myRoles.length; i++) {
              this.roles.push(myRoles[i])
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