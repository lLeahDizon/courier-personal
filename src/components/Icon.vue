<template>
  <svg class="icon" @click="$emit('click', $event)">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: ['name'],
  computed: {
    iconName () {
      return `#icon-${this.name}`
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
