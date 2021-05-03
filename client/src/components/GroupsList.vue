<template>
    <button @click="handleClickCreateGroup" class="btn-green">Add new group</button>
    <input placeholder="Search student" @input="onSearchStudent" v-model="nameToSearch"/>
    <ul class="groups_list">
        <li v-show="showNewGroupForm" class="groups_list__item">
            <div>
                <input placeholder="Enter group name" @blur="onCreateNewGroup" v-model="groupInputRef"/>
            </div>
        </li>
        <li v-for="(group) in groups" :key="group._id" class="groups_list__item">
            <Group :group="group" :onDeleteGroup="handleDeleteGroup" :onAddStudent="handleAddStudent"
                   :onEditGroup="handleEditGroup"
                   :onDeleteStudent="handleDeleteStudent" :onEditStudent="handleEditStudent"/>
        </li>
    </ul>
</template>

<script>

    import axios from "../config";
    import {ref} from 'vue'
    import Group from './Group'

    export default {
        setup() {
            let groups = ref()
            const showNewGroupForm = ref(false)
            const groupInputRef = ref('')
            const nameToSearch = ref('')

            const handleClickCreateGroup = () => {
                showNewGroupForm.value = true;
            }

            const onCreateNewGroup = () => {
                showNewGroupForm.value = false;
                axios.post('/group', {name: groupInputRef.value}).then(({data}) => {
                    groups.value.unshift(data)
                })
            }

            const handleDeleteGroup = (id) => {
                groups.value = groups.value.filter(el => el._id !== id);
                axios.delete('group/' + id);
            }

            const handleAddStudent = (name, groupId) => {
                axios.post('student', {name, groupId}).then(({data}) => {
                    const groupIdx = groups.value.findIndex(el => el._id === groupId);
                    groups.value[groupIdx].students.unshift(data)
                });
            }

            const handleEditGroup = (newName, groupId) => {
                groups.value = groups.value.map(el => el._id === groupId ? {...el, name: newName} : el)
                axios.put('group/' + groupId, {name: newName})
            }

            const handleDeleteStudent = (id, groupId) => {
                const groupIdx = groups.value.findIndex(el => el._id === groupId);
                groups.value[groupIdx].students.splice(groups.value[groupIdx].students.findIndex(stud => stud._id === id), 1)
                axios.delete('student/' + id);
            }

            const handleEditStudent = (newName, id, groupId) => {
                const groupIdx = groups.value.findIndex(el => el._id === groupId);
                const indexOfChangedStudent = groups.value[groupIdx].students.findIndex(stud => stud._id === id)
                groups.value[groupIdx].students[indexOfChangedStudent].name = newName

                axios.put('student/' + id, {name: newName})
            }

            const onSearchStudent = () => {
                const name = nameToSearch.value;
                const url = name ? 'searchByName/' + name : 'group'
                axios.get(url).then(({data}) => {
                    if (name === nameToSearch.value) {
                        groups.value = data
                    }
                })
            }

            return {
                groups,
                handleClickCreateGroup,
                showNewGroupForm,
                groupInputRef,
                onCreateNewGroup,
                handleDeleteGroup,
                handleAddStudent,
                handleEditGroup,
                handleDeleteStudent,
                handleEditStudent,
                onSearchStudent,
                nameToSearch
            }
        },
        mounted() {
            axios.get('group').then(({data}) => {
                this.groups = data
            })
        },
        components: {
            Group
        },
    }
</script>

