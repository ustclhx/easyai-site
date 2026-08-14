<template>
  <div class="ea-container">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.ea-container {
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: 1.25rem;

  @media (min-width: 40rem) {
    padding-inline: 2rem;
  }

  @media (min-width: 64rem) {
    padding-inline: 3rem;
  }

  @media (min-width: 80rem) {
    padding-inline: 4rem;
  }
}
</style>
