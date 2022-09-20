<template>
  <div class="chart-container">
    <div class="nav_div">
      <img src="~/assets/images/icons/tree/zoomout.png" @click="controlScale('smaller')"/>
      <img src="~/assets/images/icons/tree/zoomin.png" @click="controlScale('bigger')"/>
      <img src="~/assets/images/icons/tree/reset.png" @click="controlScale('restore')"/>
    </div>
    <vue-tree
      ref="scaleTree"
      style="width: 100%; height: 1000px"
      :dataset="dataTreeRoot"
      :config="treeConfig"
      :collapse-enabled="true"
      link-style="straight"
    >
      <template #node>
        <tree-component :data-prop="getData"/>
      </template>
    </vue-tree>
  </div>
</template>

<script>
import TreeComponent from './tree'

export default {
  name: 'ChartComponent',
  components: { TreeComponent },
  props: ['dataTree'],

  data() {
    return {
      dataTreeRoot: { id: 1 },
      treeConfig: { nodeWidth: 300, nodeHeight: 184, levelHeight: 300 },
      user: this.$auth.user
    }
  },
  computed: {
    getData() {
      return (this.dataTree.value !== null && this.dataTree.value !== undefined) || (this.dataTree.children !== null && this.dataTree.children !== undefined && this.dataTree.children.length > 0)
        ? this.dataTree
        : this.user
    }
  },
  mounted() {
    setTimeout(() => {
      // if (this.$device.isTablet) {
      // this.$refs.scaleTree.zoomOut()
      // }
      this.backToRoot()
    }, 0)
  },
  methods: {
    controlScale(command) {
      switch (command) {
        case 'bigger':
          this.$refs.scaleTree.zoomIn()
          break
        case 'smaller':
          this.$refs.scaleTree.zoomOut()
          break
        case 'restore':
          this.$refs.scaleTree.restoreScale()
          this.backToRoot()
          break
      }
    },
    backToRoot() {
      const root = document.getElementsByClassName('org-tree-node-label')[0]
      // const root = document.getElementsByClassName('org-tree-container')[0]
      root.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    }
  }
}
</script>

<style lang="scss">
@import "assets/scss/variables";

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .nav_div {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin: 20px 20px auto auto;

    img {
      cursor: pointer;
    }
  }

  .tree-container {
    width: 100%;
    min-height: 1000px;

    .link {
      stroke: $color-red-primary !important;
    }
  }
}

.node-slot {
  .rich-media-node {
    background-color: $color-bg-node !important;
    height: 200px;
    padding: 9px 15px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: left;
    color: white;
    border: 1px solid $color-red-primary;
    border-radius: 4px;
    font-family: 'Montserrat';
    width: fit-content;
    min-width: 200px;
    display: grid;
    grid-template-columns: auto;
    gap: 15px;

    .row_info {
      display: grid;
      grid-template-columns: auto;
      gap: 10px;
      text-align: left;

      .title {
        font-weight: 400;
        font-size: 11px;
        line-height: 11px;
        color: $color-text-6;

      }

      .value {
        font-weight: 600;
        font-size: 12px;
        line-height: 12px;
        align-items: center;
      }
    }
  }
}
</style>
