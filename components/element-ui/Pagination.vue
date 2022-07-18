<template>
  <div class="pagination_common">
    <ul class="pagination flex">
      <li :class="['page-item', currentPage === 1 ? 'disable' : '']">
        <span class="icon-next button_prev" @click="prePage"></span>
      </li>
      <li
        v-for="(item, index) in lastPage" :key="index"
        :class="['page-item', item === currentPage ? 'active' : '']" @click="changePage(item)">
        <span class="page-link" href="#">{{ item }}</span>
      </li>
      <li :class="['page-item', currentPage === lastPage ? 'disable' : '']">
        <span class="icon-next" @click="nextPage"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PaginationCommon',
  props: ['currentPage', 'lastPage'],
  methods: {
    changePage(page) {
      this.$emit('change', page)
    },
    prePage() {
      if (this.currentPage >= 2) {
        this.changePage(this.currentPage - 1)
      }
    },
    nextPage() {
      if (this.currentPage <= this.lastPage - 1) {
        this.changePage(this.currentPage + 1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
