<!-- BetterScroll的封装 -->
<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      // 0和1不侦测,2侦测手指位置，3滚动过程都侦测
      default: 1,
      // 如果是网页端，将mouseWheel改成true,移动端则保持默认false
      mouseWheel: false
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 是否支持上拉加载更多/加载更多信息（回调事件）
    pullUpLoad: {
      type: Boolean,
      default: false
    },

    pullDownRefresh: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    setTimeout(this.__initScroll, 20);
  },
  //import引入的组件需要注入到对象中才能使用
  methods: {
    __initScroll() {
      // 初始化BScroll对象
      if (!this.$refs.wrapper) return;
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        mouseWheel: true, //网页端为true,实现鼠标滚动
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        pullDownRefresh: this.pullDownRefresh,
      });

      // 将监听的位置回调
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position);
      });

      // 监听底部上拉;下拉到底部时调用
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
        });
      }

      // 监听顶部下拉;上拉到顶部时调用
      if (this.pullDownRefresh) {
        this.scroll.on("pullingDown", () => {
          this.$emit("pullingDown");
        });
      }
    },
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
      console.log('better-scroll刷新');      
    },
    getCurrentY(){
      return this.scroll.y;
    }
  },
};
</script>

<style scoped>
</style>