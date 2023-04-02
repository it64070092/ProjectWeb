<template>
    <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-lg font-bold mb-4">Log in first</h2>
            <p class="text-gray-700 mb-4">Please log in to access this feature.</p>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="$emit('login')">Log
                in</button>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'LoginPopUp'
}
</script>
  
<style scoped>
/* add your styles here */
</style>