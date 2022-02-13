<template>
  <article v-html="useGuide.replace(/\n/g, '</br>')" class="content"></article>
</template>

<script>
import useGuide from '@/constants/useGuide'

export default {
  name: 'Agreement',
  data() {
    return {
      useGuide
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 30px 24px;
  font-size: 32px;
}
</style>
