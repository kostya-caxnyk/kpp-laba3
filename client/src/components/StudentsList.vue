<template>
    <button class="btn-green" @click="showNewStudentForm = true">Add student</button>

    <ol class="students-list">
        <li v-if="showNewStudentForm">
            <input placeholder="Enter student name" @blur="addStudent">
        </li>
        <li v-for="(student) in group.students" :key="student._id" class="students-list__item">
            <input v-if="editStudentId === student._id" :value="student.name" @blur="(e) => handleEdit(e, student._id)"/>
            <span v-else>{{student.name}}</span>
            <EditMenu class="student__edit-btn" :onDelete="handleDelete(student._id)" :onEdit="() => handleClickEdit(student._id)"/>
        </li>
    </ol>
</template>

<script>
    import {ref} from 'vue'
    import EditMenu from "./EditMenu";

    export default {
        setup(props) {
            const showNewStudentForm = ref(false)
            const editStudentId = ref(null)

            const addStudent = (e) => {
                props.onAddStudent(e.target.value, props.group._id)
                showNewStudentForm.value = false
            }

            const handleDelete = (id) => () => {
                props.onDeleteStudent(id, props.group._id)
            }

            const handleClickEdit = (id) => {
                editStudentId.value = id
            }

            const handleEdit = (e, id) => {
                console.log(id, e.target.value)
                editStudentId.value = false

               props.onEditStudent(e.target.value, id, props.group._id)
            }
            return {
                addStudent,
                showNewStudentForm,
                handleDelete,
                handleClickEdit,
                editStudentId,
                handleEdit,
                props
            }
        },
        props: {
            group: Object,
            onDeleteStudent: Function,
            onAddStudent: Function,
            onEditStudent: Function,
        },
        components: {
            EditMenu
        },
    }
</script>