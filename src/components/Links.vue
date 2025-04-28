<template>
  <header id="header" class="bg-red-50 hidden lg:inline-block">
    <i class="header-toggle d-xl-none bi bi-list"></i>

    <div
      class="rounded-full bg-sky-50 w-[200px] h-[200px] mx-auto flex items-center mt-4"
    >
      <img
        src="../assets/two.jpg"
        alt=""
        class="w-[180px] h-[180px] mx-auto rounded-full"
      />
    </div>

    <a href="#" class="flex justify-center mb-1">
      <h1 class="libre-baskerville font-[600] text-2xl mt-2">Radwa Khalaf</h1>
    </a>

    <div class="mx-auto flex justify-center gap-4 mb-4">
      <a href="https://github.com/radwaa24" target="_blank">
        <img
          src="../assets/github.png"
          alt="github"
          class="max-h-[22px] hover:max-h-[25px]"
        />
      </a>
      <a href="https://www.linkedin.com/in/radwa-khalaf/" target="_blank">
        <img
          src="../assets/linkedin.png"
          alt="linkedin"
          class="max-h-[22px] hover:max-h-[25px]"
      /></a>
      <a href="https://www.threads.net/@rudii.24?hl=en" target="_blank">
        <img
          src="../assets/threads.png"
          alt="threads"
          class="max-h-[22px] hover:max-h-[25px]"
      /></a>
      <a href="https://www.instagram.com/rudii.24/" target="_blank">
        <img
          src="../assets/instagram.png"
          alt="instagram"
          class="max-h-[22px] hover:max-h-[25px]"
      /></a>
    </div>

    <nav id="">
      <ul class="flex flex-col gap-2.5 ml-4 mt-16 h-full">
        <li>
          <a
            href="#hero"
            class="flex gap-2 font-medium text-lg p-2 hover:bg-red-100 hover:bg-opacity-30"
            ><i class="fi fi-rr-home text-slate-700"></i>Home</a
          >
        </li>
        <li>
          <a
            href="#about"
            class="flex gap-2 font-medium text-lg p-2 hover:bg-red-100 hover:bg-opacity-30"
          >
            <i class="fi fi-rr-user text-slate-700"></i> About</a
          >
        </li>
        <li>
          <a
            href="#skills"
            class="flex gap-2 font-medium text-lg p-2 hover:bg-red-100 hover:bg-opacity-30"
            ><i class="fi fi-rr-skill-alt text-slate-700"></i>Skills</a
          >
        </li>
        <li>
          <a
            href="#projects"
            class="flex gap-2 font-medium text-lg p-2 hover:bg-red-100 hover:bg-opacity-30"
            ><i class="fi fi-rr-laptop-code text-slate-700"></i>Projects</a
          >
        </li>
        <li>
          <a
            href="#certificates"
            class="flex gap-2 font-medium text-lg p-2 hover:bg-red-100 hover:bg-opacity-30"
            ><i class="fi fi-rr-student-alt text-slate-700"></i>Certificates</a
          >
        </li>
        <li>
          <a
            href="#contact"
            class="flex gap-2 font-medium text-lg p-2 hover:bg-red-100 hover:bg-opacity-30"
            ><i class="fi fi-rr-envelope-dot text-slate-700"></i> Contact</a
          >
        </li>
      </ul>
    </nav>
  </header>
</template>
<style scoped>
.libre-baskerville {
  font-family: "Libre Baskerville", serif;
  font-style: normal;
}
</style>
