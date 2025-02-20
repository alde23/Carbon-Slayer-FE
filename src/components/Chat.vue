<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import socket from "../socket";

const messages = ref([]);
const message = ref("");

// Listen for incoming messages from the backend
onMounted(() => {
  socket.on("message", (msg) => {
    messages.value.push(msg);
  });
});

// Clean up listeners when component unmounts
onUnmounted(() => {
  socket.off("message");
});

const sendMessage = () => {
  if (message.value.trim()) {
    // Emit the message to the backend
    socket.emit("message", message.value);
    // Add the message to the local list (mark it as sent by self)
    messages.value.push({ text: message.value, self: true });
    message.value = "";
  }
};
</script>

<template>
  <div class="max-w-lg mx-auto p-4 bg-gray-100 shadow-lg rounded-lg">
    <!-- Chat Messages -->
    <div class="h-80 overflow-y-auto p-2 bg-white rounded-lg">
      <div v-for="(msg, index) in messages" :key="index" class="mb-2">
        <span :class="msg.self ? 'text-blue-500 font-medium' : 'text-gray-700'">
          {{ msg.text }}
        </span>
      </div>
    </div>
    <!-- Input Section -->
    <div class="mt-4 flex">
      <input
        v-model="message"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
        class="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="sendMessage"
        class="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Send
      </button>
    </div>
  </div>
</template>
