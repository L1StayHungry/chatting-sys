<!-- 默认的信息框 -->
<template>
  <div class="defaultDetail hInherit">
    <top-name>
      <div slot="left">
        <h4>详细信息</h4>
      </div>
    </top-name>
    <div>
      <img src="@/assets/imgs/people_fill.svg" alt="" style="width: 150px;">
    </div>
  </div>
</template>

<script>
  import TopName from "@/components/commen/right_part/TopName"
  
  export default {
    name:'DefaultMessage',
    props:{

    },
    components: {
      TopName,
    },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {},
  }
</script>

<style scoped>
  .defaultDetail{
    background-color: rgb(245, 245, 245);
  }
  .detail{
    height: 50px;
    justify-content:center;
    align-items:center;
    display:-webkit-flex;
    border-bottom:1px solid rgb(181, 204, 204);
  }
</style>