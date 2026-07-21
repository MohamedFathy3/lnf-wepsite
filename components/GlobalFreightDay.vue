<template>
  <div class="min-h-screen bg-slate-950 text-white">
    <section class="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-400 blur-3xl" />
        <div class="absolute right-0 top-20 h-80 w-80 rounded-full bg-blue-500 blur-3xl" />
        <div class="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-500 blur-3xl" />
      </div>

  <div class="relative mx-auto max-w-6xl px-2 py-12  md:py-13 lg:py:30">
  <div class="grid items-center gap-12 lg:grid-cols-2">

    <div>

      <!-- Logo + Title -->
      <div class="flex items-center gap-4 mb-6">
<img 
  alt="global freight day"
  :src="logo" 
  class="w-48 h-32 md:w-56 md:h-40 lg:w-64 lg:h-48 object-contain drop-shadow-lg"
/>
      <div class="flex flex-col">
    <p class="text-xl uppercase tracking-widest text-cyan-400" >
      April 26
    </p>
    <h2 class="text-xl mt-4 font-bold tracking-wide text-white md:text-3xl whitespace-nowrap">
      Global Freight Day
    </h2>
  </div>
      </div>

      <!-- Main Title -->
      <h1 class="text-5xl md:text-4xl font-md  leading-tight tracking-tight">
        70 Years of Containerization
        <span class="block  mt-5 md:text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          The Idea That Changed Global Trade Forever
        </span>
      </h1>

      <!-- Description -->
    <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
  Seventy years ago, a simple idea reshaped the way the world moves.
  On April 26, 1956, 
  <a 
    href="https://en.wikipedia.org/wiki/Malcom_McLean" 
    target="_blank" 
    rel="noopener noreferrer"
    class="relative inline-flex items-center gap-1 font-semibold text-cyan-400 transition-all duration-300 hover:text-cyan-300 hover:scale-105 group"
  >
    Malcolm McLean
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
    <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
  </a> 
  helped launch a new era in cargo transport through standardized containers.
</p>

      <!-- Buttons -->
      <div class="mt-10 flex flex-wrap gap-4">

        <NuxtLink
          to="#celebrate"
          class="rounded-2xl bg-cyan-400 px-7 py-3 text-base font-bold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:scale-105 hover:bg-cyan-300"
        >
          Celebrate Global Freight Day
        </NuxtLink>

        <a
          href="https://en.wikipedia.org/wiki/Malcom_McLean"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-2xl border border-white/20 bg-white/5 px-7 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10 hover:scale-105"
        >
          Read the Story
        </a>

      </div>
    </div>

    <!-- 🔹 RIGHT (IMAGE) -->
    <div class="relative group">

      <!-- Glow effect -->
      <div class="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition"></div>

      <!-- Image container -->
      <div class="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        
        <img 
          :src="containerImage" 
          alt="Container ship - SS Ideal X"
          class="w-full h-[310px] object-cover transition duration-700 group-hover:scale-110"
        />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        <!-- Caption -->
        <div class="absolute bottom-4 left-4 text-sm text-slate-300">
          🚢 SS Ideal X (1956)
        </div>

      </div>
    </div>

  </div>
</div>
    </section>

    <section id="story" class="mx-auto max-w-7xl px-6 py-20 md:px-10">
      <div class="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">The Story</p>
          <h2 class="mt-4 text-3xl font-bold md:text-4xl">One simple concept. </h2>
          <h2 class="mt-6 text-3xl font-bold md:text-4xl "> One massive global impact.</h2>
          <p class="mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Instead of handling cargo piece by piece, standardized containers
            made it possible for goods to move more smoothly between trucks,
            ships, and terminals. That operational shift helped unlock scale,
            speed, and consistency for international trade.
          </p>
          <p class="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Today, containerization stands as one of the most influential ideas
            in logistics history. It changed not only how cargo moves, but also
            how industries grow, how markets connect, and how economies expand.
          </p>
          <div class="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6 text-lg leading-8 text-cyan-100">
            “Innovation doesn’t always start big. Sometimes it begins with one
            clear idea that changes everything.”
          </div>
        </div>

        <div class="grid gap-4">
          <div
            v-for="item in pillars"
            :key="item.title"
            class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur"
          >
            <div class="mb-4 text-4xl">{{ item.icon }}</div>
            <h3 class="text-xl font-semibold">{{ item.title }}</h3>
            <p class="mt-3 leading-7 text-slate-300">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

   <section class="border-y border-white/10 bg-white/5">
  <div class="mx-auto max-w-7xl px-6 py-20 md:px-10">
    <!-- Grid: نص على الشمال وصورة على اليمين -->
    <div class="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
      
      <!-- الجانب الأيسر: النص -->
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          Why April 26 Matters
        </p>
        <h2 class="mt-4 text-3xl font-bold md:text-4xl">
          Global Freight Day honors
        </h2>
         <h2 class="mt-6 text-3xl font-bold md:text-3xl">
           the people behind the movement.
        </h2>
      
        
        <!-- النقاط -->
        <div class="mt-6 space-y-4">
          <div class="flex gap-3">
            <span class="text-cyan-400 text-xl flex-shrink-0">●</span>
            <p class="text-lg leading-8 text-slate-300">
              April 26 is more than just a historical date. It is a moment to recognize 
              the professionals and teams who keep trade moving every day—often without 
              the visibility you deserve.
            </p>
          </div>
          
          <div class="flex gap-3">
            <span class="text-cyan-400 text-xl flex-shrink-0">●</span>
            <p class="text-lg leading-8 text-slate-300">
              While many may not realize how essential this work is, recent global 
              disruptions have proven one thing: Your role is the backbone of the world.
            </p>
          </div>
          
          <div class="flex gap-3">
            <span class="text-cyan-400 text-xl flex-shrink-0">●</span>
            <p class="text-lg leading-8 text-slate-300">
              <span class="font-bold text-white">You Are the Heroes Behind the Scenes.</span>
            </p>
          </div>
          
          <div class="flex gap-3">
            <span class="text-cyan-400 text-xl flex-shrink-0">●</span>
            <p class="text-lg leading-8 text-slate-300">
              People see the cargo, but we see the people. Without you, the world would 
              literally stop. You don't just move freight; you move the industry, you 
              move the economy, and you move the world.
            </p>
          </div>
          
          <div class="flex gap-3">
            <span class="text-cyan-400 text-xl flex-shrink-0">●</span>
            <p class="text-lg leading-8 text-cyan-300 font-semibold">
              Happy Global Freight Day to the heroes behind the scenes.
            </p>
          </div>
        </div>
      </div>

      <!-- الجانب الأيمن: الصورة بحجم متوسط -->
      <div class="flex justify-center">
        <div class="relative w-full max-w-md mx-auto">
          <!-- Glow effect -->
          <div class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-30 blur-xl"></div>
          
          <!-- الصورة -->
          <img 
            :src="Global_Freight" 
            alt="Global Freight Day honors the heroes behind the scenes"
            class="relative w-full  max-h-[950px] object-contain rounded-2xl border border-white/20 shadow-2xl bg-slate-900/50 backdrop-blur-sm"
          />
          
          <!-- Overlay خفيف جداً -->
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>

    <!-- باقي الكاردات تحت -->
    <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="item in industryPeople"
        :key="item.role"
        class="rounded-3xl border border-white/10 bg-slate-900/80 p-6 transition hover:scale-105 hover:border-cyan-400/30 duration-300"
      >
        <div class="text-4xl">{{ item.icon }}</div>
        <h3 class="mt-4 text-xl font-semibold">{{ item.role }}</h3>
        <p class="mt-3 leading-7 text-slate-300">{{ item.text }}</p>
      </div>
    </div>
  </div>
</section>

    <section
      id="celebrate"
      class="mx-auto max-w-7xl px-6 py-20 md:px-10"
    >
      <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p
            class="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300"
          >
            Get Involved
          </p>
          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            Be part of Global
          </h2>
          <h2 class="mt-7 text-3xl font-bold md:text-4xl">
            Freight Day
          </h2>
          <p class="mt-6 text-lg leading-8 text-slate-300">
            Whether you work in freight forwarding, trucking, shipping, terminal
            operations, customs, or supply chain support, this is a day to
            celebrate your role in global trade.
          </p>

          <!-- Hashtags - LinkedIn Links (NuxtLink style) -->
          <div class="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/posts/remon-sarofeem-94563697_globalfreightday-gfd-globalfreightday-activity-7296066062272376832-rUGD/"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition-all duration-300 hover:scale-105 hover:border-cyan-400/60 hover:bg-cyan-400/20 hover:text-cyan-100"
            >
              #GlobalFreightDay
            </a>
            <a
              href="https://www.linkedin.com/company/global-freight-day/about/"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition-all duration-300 hover:scale-105 hover:border-cyan-400/60 hover:bg-cyan-400/20 hover:text-cyan-100"
            >
              #GFD
            </a>
            
          </div>
        </div>

        <div
          class="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 p-8 shadow-2xl"
        >
          <h3 class="text-2xl font-semibold">
            How you can join the movement
          </h3>
          <div class="mt-6 space-y-4">
            <div
              v-for="(action, idx) in actions"
              :key="action"
              class="flex items-start gap-4 rounded-2xl bg-slate-900/70 p-4"
            >
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400 font-bold text-slate-950"
              >
                {{ idx + 1 }}
              </div>
              <p class="pt-1 text-base leading-7 text-slate-200">
                {{ action }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section class="mx-auto max-w-7xl px-6 pb-20 md:px-10">
      <div class="rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-400/15 via-blue-500/10 to-indigo-500/15 p-8 md:p-12">
        <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">A Message for the Industry</p>
            <h2 class="mt-4 text-3xl font-bold md:text-4xl">Let’s celebrate the past, </h2>
            <h2 class="mt-6 text-3xl font-bold md:text-4xl">honor the people, and shape the future. </h2>
            <p class="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Seventy years after the first container voyage, the logistics
              industry continues to carry the world forward. Global Freight Day
              is a chance to recognize that contribution and keep the message
              growing worldwide.
            </p>
          </div>
          <div class="rounded-3xl border border-white/10 bg-slate-950/70 px-6 py-5 text-center shadow-xl">
            <div class="text-5xl">🚀</div>
            <p class="mt-3 text-lg font-semibold">Stay tuned…</p>
            <p class="mt-2 text-slate-300">This is just the beginning.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// استيراد الصورة من مجلد public
// الصورة موجودة في: public/images/Picture1.jpg
const containerImage = '/images/makloin.jpeg'
const logo = '/images/logocontenier.png'
const Global_Freight = '/images/Global_Freight.jpeg'

// البيانات
const pillars = [
  {
    title: 'Lower Costs',
    text: 'Containerization helped reduce cargo handling costs and made shipping more efficient across global routes.',
    icon: '📉',
  },
  {
    title: 'Faster Movement',
    text: 'Standardized containers made it easier to transfer cargo between trucks, ships, and terminals with less delay.',
    icon: '⚡',
  },
  {
    title: 'Safer Cargo',
    text: 'Moving cargo in sealed containers improved security, reliability, and consistency throughout the supply chain.',
    icon: '🔒',
  },
  {
    title: 'Global Connectivity',
    text: 'This one idea connected markets, industries, and economies in ways the world had never seen before.',
    icon: '🌍',
  },
]

const industryPeople = [
  {
    role: 'Freight Forwarders',
    text: 'Simplifying global trade and connecting shippers to opportunities worldwide.',
    icon: '📦',
  },
  {
    role: 'Truck Drivers',
    text: 'Keeping cargo moving on the ground and ensuring reliable first-mile and last-mile delivery.',
    icon: '🚛',
  },
  {
    role: 'Carriers',
    text: 'Ocean, air, and inland operators who keep supply chains active every day.',
    icon: '🚢',
  },
  {
    role: 'Port & Terminal Teams',
    text: 'Handling cargo efficiently and making global movement possible behind the scenes.',
    icon: '🏗️',
  },
]

const actions = [
  'Share your story in freight and logistics',
  'Highlight a team, partner, or professional making an impact',
  'Spread the message using #GlobalFreightDay and #GFD',
]
</script>