<template>
  <article v-html="agreement.replace(/\n/g, '</br>')" class="content"></article>
</template>

<script>
import agreement from '@/constants/agreement'

export default {
  name: 'Agreement',
  data() {
    return {
      agreement
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 30px 24px;
  font-size: 16px;
}
</style>
