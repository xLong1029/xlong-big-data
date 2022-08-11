<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in" name="fade-transform">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
