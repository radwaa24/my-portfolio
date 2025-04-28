<template>
  <section
    id="contact"
    class="h-screen bg-gradient-to-b from-white to-red-50 p-5 border-t-2 border-red-50"
  >
    <div class="flex text-xl gap-1 font-medium mb-10" data-aos="fade-up">
      <h2 class="border-b-2 mx-auto border-red-50 text-2xl p-1 px-3 w-fit">
        Contact Me
      </h2>
    </div>
    <form
      action="https://formspree.io/f/mnndnjqg"
      method="POST"
      class="bg-red-50 bg-opacity-80 max-w-lg mx-auto p-6 rounded-lg shadow-md"
    >
      <!-- Name -->
      <div class="mb-4">
        <label for="user_name" class="block font-medium text-slate-700">
          Full Name
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          required
          class="mt-1 block w-full p-1.5 rounded-md border-gray-300 shadow-sm ring-slate-400 focus:ring-1 focus:outline-none"
        />
      </div>

      <!-- Company -->
      <div class="mb-4">
        <label for="user_company" class="block font-medium text-slate-700">
          Company
        </label>
        <input
          type="text"
          id="user_company"
          name="user_company"
          class="mt-1 block w-full p-1.5 rounded-md border-gray-300 shadow-sm ring-slate-400 focus:ring-1 focus:outline-none"
        />
      </div>

      <!-- Email -->
      <div class="mb-4">
        <label for="user_email" class="block font-medium text-slate-700">
          Email
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          required
          class="mt-1 block w-full p-1.5 rounded-md border-gray-300 shadow-sm ring-slate-400 focus:ring-1 focus:outline-none"
        />
      </div>

      <!-- Subject -->
      <div class="mb-4">
        <label for="subject" class="block font-medium text-slate-700">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          class="mt-1 block w-full p-1.5 rounded-md border-gray-300 shadow-sm ring-slate-400 focus:ring-1 focus:outline-none"
        />
      </div>

      <!-- Message -->
      <div class="mb-4">
        <label for="message" class="block font-medium text-slate-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows="4"
          class="mt-1 block w-full p-1.5 rounded-md border-gray-300 shadow-sm ring-slate-400 focus:ring-1 focus:outline-none"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
      >
        Send Message
      </button>
    </form>
  </section>
</template>

<script setup></script>

<style scoped></style>
