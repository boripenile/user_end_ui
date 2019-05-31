<template>
    <div class="create-todo">
        <el-button type="info" v-on:click="openForm" v-show="!isCreating"><i class='ti-pencil-alt'></i>&nbsp;&nbsp;Add New Role</el-button>
        <div v-show="isCreating">
            <div class='content-todo-devin'>
                <div>
                    <label>Role</label>
                    <p>
                        <el-input placeholder="Role name" v-model="roleNameText" type='text'></el-input>
                    </p>
                </div>
                <div>
                    <label>Description</label>
                    <p>
                        <el-input v-model="descriptionText" type='textarea' :rows="4" placeholder="Description"> </el-input>
                    </p>
                </div>
                <div>
                    <el-button v-on:click="sendForm()" type="success">Create</el-button>
                    <el-button v-on:click="closeForm" type="info">Cancel</el-button>                 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data: function () {
    return {
      roleNameText: '',
      descriptionText: '',
      isCreating: false
    }
  },
  methods: {
    openForm: function () {
      this.isCreating = true
    },
    closeForm: function () {
      this.isCreating = false
    },
    sendForm: function () {
      if (this.roleNameText.length > 0 && this.descriptionText.length > 0) {
        const roleName = this.roleNameText
        const description = this.descriptionText
        this.$emit('create-role', {
          id: 0,
          roleName,
          description,
          active: false
        })
        this.roleNameText = ''
        this.descriptionText = ''
        this.isCreating = false
      }
    }
  }
}
</script>
