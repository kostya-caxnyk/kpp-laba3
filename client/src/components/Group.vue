<template>
    <div class="header">
        <span v-if="!editMode">{{group.name}}</span>
        <input v-else :value="group.name" @blur="handleEditGroup"/>
    </div>

    <EditMenu :on-edit="handleClickEditGroup" :on-delete="handleDeleteGroup"/>

    <StudentsList :onDeleteStudent="props.onDeleteStudent" :onEditStudent="props.onEditStudent"
                  :onAddStudent="props.onAddStudent" :group="props.group"/>
</template>

<script>
    import {ref} from 'vue'
    import EditMenu from "./EditMenu";
    import StudentsList from "./StudentsList";

    export default {
        setup(props) {
            const showNewStudentForm = ref(false)
            const editMode = ref(false)

            const handleDeleteGroup = () => {
                props.onDeleteGroup(props.group._id)
            }

            const handleClickEditGroup = () => {
                editMode.value = !editMode.value
            }

            const handleEditGroup = (e) => {
                props.onEditGroup(e.target.value, props.group._id)
                editMode.value = false
            }

            return {
                handleDeleteGroup,
                showNewStudentForm,
                props,
                editMode,
                handleClickEditGroup,
                handleEditGroup
            }
        },
        props: {
            group: Object,
            onDeleteGroup: Function,
            onAddStudent: Function,
            onEditGroup: Function,
            onDeleteStudent: Function,
            onEditStudent: Function
        },
        components: {
            EditMenu,
            StudentsList
        }
    }
</script>