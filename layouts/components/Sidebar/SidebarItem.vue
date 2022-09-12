<template>
  <div
    v-if="!item.hidden" @mouseover="isHover = true"
    @mouseleave="isHover = false">

    <!--    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">-->
    <!--      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">-->
    <!--        <el-menu-item v-if="onlyOneChild.meta.badge" :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">-->
    <!--          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.title" :badge="$store.state[onlyOneChild.meta.stateBadge[0]][onlyOneChild.meta.stateBadge[1]]"/>-->
    <!--        </el-menu-item>-->
    <!--        <el-menu-item v-else :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">-->
    <!--          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.title" />-->
    <!--        </el-menu-item>-->
    <!--      </app-link>-->
    <!--    </template>-->

    <template>
      <el-menu-item
        :class="{'submenu-title-noDropdown':!isNest, 'submenu-title':true, 'submenu-title-active':$route.path===item.path }"
        @click="$router.push(item.path)">
        <div class="hr_active" :class="{'oc-0':$route.path!==item.path}"></div>

        <template v-if="isHover">
          <img :src="renderImg(item.icon_active)" alt="">
          <span v-if="$store.state.sidebar.opened" class="title_menu title_menu_hover">{{ item.title }}</span>
        </template>
        <template v-else>
          <img v-if="$route.path===item.path" :src="renderImg(item.icon_active)" alt="">
          <img v-else :src="renderImg(item.icon)" alt="">
          <span v-if="$store.state.sidebar.opened" class="title_menu">{{ item.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!--    neu co submenu-->
    <!--    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>-->
    <!--      <template slot="title">-->
    <!--        <item style="font-weight: 600" v-if="item.meta" :icon="item.meta && item.meta.icon" :title="(item.title)" />-->
    <!--      </template>-->
    <!--      <sidebar-item-->
    <!--        v-for="child in item.children"-->
    <!--        :key="child.path"-->
    <!--        :is-nest="true"-->
    <!--        :item="child"-->
    <!--        :base-path="resolvePath(child.path)"-->
    <!--        class="nest-menu"-->
    <!--      />-->
    <!--    </el-submenu>-->
  </div>
</template>

<script>
import path from 'path'
// import Item from './Item'
// import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
import { isExternal } from '@/utils/validate'

export default {
  name: 'SidebarItem',
  // components: { Item },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null
    return {
      isHover: false
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    renderImg(img) {
      return require('~/assets/images/icons/menu/' + img.toString())
    }

  }
}
</script>
<style lang="scss">
.badge-menu-item {
  .el-badge__content {
    top: 30px !important;
  }
}
</style>
