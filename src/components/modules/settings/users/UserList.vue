<template>
  <div class="todo-list">
   <!-- <p >Completed Tasks: {{todos.filter(todo => {return todo.done === true}).length}}</p>
    <p >Pending Tasks: {{todos.filter(todo => {return todo.done === false}).length}}</p>-->
    <user v-on:delete-user="deleteRole" v-on:update-user="updateUser(user)" v-on:activate-user="activateUser(user)" v-for="user in users" :user.sync="user"></user>
  </div>
</template>

<script>
import sweetalert from 'sweetalert'
import User from './User.vue'
import { mapGetters } from 'vuex'

export default {
  props: ['users'],
  components: {
    User
  },
  computed: {
    ...mapGetters(['getToken', 'getUser'])
  },
  methods: {
    deleteRole: function (user) {
      sweetalert({
        title: 'Are you sure?',
        text: 'This User will be permanently deleted!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        closeOnConfirm: false
      },
      () => {
        this.$http.userapi.post('/users', null, {
          headers: {
            'id': user.id,
            'action': 'deleteRole',
            'token': this.getToken
          }
        }).then(response => {
          if (response.data.code === 200) {
            const userIndex = this.users.indexOf(user)
            this.users.splice(userIndex, 1)
            sweetalert('Deleted!', 'User has been deleted.', 'success')
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    activateRole: function (user) {
      var enabled = true
      if (user.active) {
        enabled = false
      }
      this.$http.userapi.post('/users', {
        'active': enabled,
        'updated_by': this.getUser.username
      }, {
        headers: {
          'id': user.id,
          'action': 'updateUser',
          'token': this.getToken
        }
      }).then(response => {
        if (response.data.code === 200) {
          var userIndex = this.users.indexOf(user)
          this.users[userIndex].active = enabled
          user = this.users[userIndex]
        }
      }).catch(error => {
        console.log(error)
      })
    },
    updateRole: function (user) {
      if (user.role_name.length > 0 && user.description.length > 0) {
        this.$http.userapi.post('/users', {
          'first_name': user.first_name,
          'last_name': user.last_name,
          'other_name': user.last_name,
          'active': user.active,
          'updated_by': this.getUser.username
        }, {
          headers: {
            'id': user.id,
            'action': 'updateUser',
            'token': this.getToken
          }
        }).then(response => {
          if (response.data.code === 200) {
            for (var i = 0; i < this.users.length; i++) {
              if (this.users[i].id === user.id) {
                this.users[i].active = response.data.data.active
              }
            }
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
}
</script>



