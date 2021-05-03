<template>
    <div class="edit-btn" :class="[className]">
        <button  @click.stop="showEditMenu = !showEditMenu"><i class="fas fa-ellipsis-v"></i></button>
        <ul v-show="showEditMenu" class="edit-menu">
            <li @click="onEdit" class="edit-menu__item">Edit</li>
            <li @click="onDelete" class="edit-menu__item">Delete</li>
        </ul>
    </div>
</template>

<script>
    import {ref} from 'vue'

    export default {
        setup(props) {
            const showEditMenu = ref(false)
            const closeMenu = () => {
                showEditMenu.value = false
            }
            return {
                showEditMenu,
                closeMenu,
                class: props.class || ''
            }
        },
        props: {
            onEdit: Function,
            onDelete: Function,
            className: String
        },
        mounted: function() {
            window.addEventListener('click', this.closeMenu);
        },
        unmounted: function() {
            window.removeEventListener('click',this.closeMenu);
        }
    }

</script>