<template>
  <div>
    <SlideShow />
    <StoreHot />
    <CategoryHot />
    <ProductDaily />
    <LastSeen />
  </div>
</template>

<script>
import SlideShow from '../components/home/SildeShow'
import StoreHot from '../components/home/StoreHot'
import CategoryHot from '../components/home/CategoryHot'
import ProductDaily from '../components/home/ProductDaily'
import LastSeen from '../components/home/LastSeen'

export default {
  name: 'IndexPage',
  components: { SlideShow, StoreHot, CategoryHot, ProductDaily, LastSeen }
}
</script>
