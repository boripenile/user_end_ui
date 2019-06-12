<template>
    <div class="todo-content">
        <div v-show="!isEditing">
            <h2>{{ role.role_name }}</h2>
            <p> {{ role.description }} </p>
            <div class="task-action"> <span v-on:click="showForm">
          <i class='ti-pencil'></i>
        </span> <span v-on:click="deleteRole(role)">
          <i class='ti-trash'></i>
        </span> </div>
        </div>
        <div class="content-todo-devin" v-show="isEditing">
            <div>
                <div>
                    <label>Role</label>
                    <p>
                        <el-input placeholder="Role name" v-model="role.role_name" type='text'></el-input>
                    </p>
                </div>
                <div class='field'>
                    <label>Description</label>
                    <p>
                        <el-input v-model="role.description" type='textarea' :rows="4" placeholder="Description"> </el-input>
                        <input type="hidden" v-model="role.active">
                    </p>
                </div>
                <div>
                    <el-button v-on:click="hideForm" type="danger">Close</el-button>
                    <el-button v-on:click="updateRole(role)" type="success">Update</el-button>
                </div>
            </div>
        </div>
        <div class="todo-completed" v-on:click="activateRole(role)" v-show="!isEditing && role.active"> Enabled </div>
        <div class="todo-pending" v-on:click="activateRole(role)" v-show="!isEditing && !role.active"> Disabled </div>
    </div>
</template>
<script>
  export default {
    props: ['role'],
    data: function () {
      return {
        isEditing: false
      }
    },
    methods: {
      activateRole: function (role) {
        this.$emit('activate-role', role)
      },
      deleteRole: function (role) {
        this.$emit('delete-role', role)
      },
      updateRole: function (role) {
        this.$emit('update-role', role)
        this.hideForm()
      },
      showForm: function () {
        this.isEditing = true
      },
      hideForm: function () {
        this.isEditing = false
      }
    }
  }
</script>