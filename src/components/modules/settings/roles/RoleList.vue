<template>
  <div class="todo-list">
   <!-- <p >Completed Tasks: {{todos.filter(todo => {return todo.done === true}).length}}</p>
    <p >Pending Tasks: {{todos.filter(todo => {return todo.done === false}).length}}</p>-->
    <role v-on:delete-role="deleteRole" v-on:update-role="updateRole(role)" v-on:activate-role="activateRole(role)" v-for="role in roles" :role.sync="role"></role>
  </div>
</template>

<script>
import sweetalert from 'sweetalert'
import Role from './Role.vue'
import { mapGetters } from 'vuex'

export default {
  props: ['roles'],
  components: {
    Role
  },
  computed: {
    ...mapGetters(['getToken', 'getUser'])
  },
  methods: {
    deleteRole: function (role) {
      sweetalert({
        title: 'Are you sure?',
        text: 'This Role will be permanently deleted!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        closeOnConfirm: false
      },
      () => {
        this.$http.userapi.post('/roles', {
          headers: {
            'id': role.id,
            'action': 'deleteRole',
            'token': this.getToken
          }
        }).then(response => {
          if (response.data.code === 200) {
            const roleIndex = this.roles.indexOf(role)
            this.roles.splice(roleIndex, 1)
            sweetalert('Deleted!', 'Role has been deleted.', 'success')
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    activateRole: function (role) {
      var enabled = false
      if (role.active === false) {
        enabled = true
      }
      this.$http.userapi.post('/roles', {
        'active': enabled,
        'updated_by': this.getUser.username
      }, {
        headers: {
          'id': role.id,
          'action': 'updateRole',
          'token': this.getToken
        }
      }).then(response => {
        if (response.data.code === 200) {
          const roleIndex = this.roles.indexOf(role)
          this.roles[roleIndex].active = enabled
        }
      }).catch(error => {
        console.log(error)
      })
    },
    updateRole: function (role) {
      if (role.role_name.length > 0 && role.description.length > 0) {
        console.log('Updating...')
        this.$http.userapi.post('/roles', {
          'role_name': role.role_name,
          'description': role.description,
          'updated_by': this.getUser.username
        }, {
          headers: {
            'id': role.id,
            'action': 'updateRole',
            'token': this.getToken
          }
        }).then(response => {
          if (response.data.code === 200) {
            const roleIndex = this.roles.indexOf(role)
            this.roles[roleIndex] = response.data.data
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
}
</script>



