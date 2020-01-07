<template>
  <div>
    <div class="code-range-down" style="width:320px;margin-top:-20px"> <!-- margin-left:-25px; -->
      <div class="container">
        <div id="captcha" style="position:relative;height:230px;width:320px">
           <img
            v-show="loading"
            src="/static/img/loading.gif"
            style="position:absolute;top:30%;left:43%;z-index:9999"
          >
          <img :src="urlBig" style="position:absolute;top:0;left:0">
          <img :src="urlSmall" class="block">
          <span class="refreshIcon" ref="refreshIcon" v-show="refresh"></span>
          <div class="sliderContainer" ref="sliderContainer">
            <div class="sliderMask" ref="sliderMask">
              <div class="slider" ref="slider">
                <span class="sliderIcon"></span>
              </div>
            </div>
            <span class="sliderText">向右滑动填充拼图</span>
          </div>
        </div>
        <!-- <div id="msg">{{message}}</div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { getSlider } from "@/api/login";
export default {
  data() {
    return {
      urlBig: "",
      urlSmall: "",
      coderangeDialog: null,
      l: 40, // 滑块边长
      r: 9, // 滑块半径
      w: 320, // canvas宽度
      h: 180, // canvas高度
      PI: Math.PI,
      show: false,
      loading: false,
      refresh: true,
      complete: 0,
      L: 40 // 滑块实际边长
    };
  },
  props: {
    callback: {
      type: Function,
      default() {
        return () => {
          console.log("enterback");
        };
      }
    },
    isfinish: 0
  },
  watch: {
    // coderangeDialogShow(val) {
    //   if (val == 2) {
    //     this.coderangeDialog.modal("show");
    //   } else if (val == 1) {
    //     this.coderangeDialog.modal("hide");
    //   }
    //   let iLen = $(".modal-backdrop").length;
    //   for (let i = 0; i < iLen; i++) {
    //     $(".modal-backdrop")[i].id = "modal" + i;
    //   }
    //   if (iLen > 1) {
    //     for (let i = 1; i < 2; i++) {
    //       $("#modal" + i).removeClass();
    //     }
    //   }
    // },
    isfinish(val) {
      console.dir(1111)
      this.complete = this.isfinish;
      if (val == 1) {
        document
          .getElementsByClassName("sliderContainer")[0]
          .classList.add("sliderContainer_success");
      } else if (val == 2) {
        document
          .getElementsByClassName("sliderContainer")[0]
          .classList.add("sliderContainer_fail");
      }
    }
  },
  mounted() {
    this.bindEvents();
    // this.coderangeDialog = $("#code-range-dialog");
    this.reset();
    // this.coderangeDialog.on("hidden.bs.modal", () => {
    //   //this.coderangeDialogShow = false;
    //   this.$emit("update:coderangeDialogShow", false);
    // });
  },
  components: {
  },
  methods: {
    //随机生成
    getRandomNumberByRange() {
      Math.round(Math.random() * (end - start) + start);
    },
    sum(x, y) {
      return x + y;
    },
    square(x) {
      return x * x;
    },
    addClass(tag, className) {
      tag.classList.add(className);
    },
    removeClass(tag, className) {
      tag.classList.remove(className);
    },
    //获取图片
    getSliderImg() {
      this.loading = true;
      this.refresh = false;
      getSlider().then(response=>{
        if (response.code == 0) {
          this.urlBig = response.data.image_data_big;
          this.urlSmall = response.data.image_data_small;
          this.$refs.slider.style.transform = "translate(0)";
          document.getElementsByClassName("block")[0].style.transform =
            "translate(0)";
          this.$refs.sliderMask.style.width = 0;
          document
            .getElementsByClassName("sliderContainer")[0]
            .classList.remove("sliderContainer_fail");
          document
            .getElementsByClassName("sliderContainer")[0]
            .classList.remove("sliderContainer_success");
          document
            .getElementsByClassName("sliderContainer")[0]
            .classList.remove("sliderContainer_active");
          // this.$emit("update:message", "");
          this.loading = false;
          this.refresh = true;
        }
      })
      
    },
    reset() {
      setTimeout(() => {
        this.getSliderImg();
      }, 800);
    },
    bindEvents() {
      document.getElementById("captcha").onselectstart = () => false;
      this.$refs.refreshIcon.onclick = () => {
        this.reset();
      };
      let originX,
        originY,
        trail = [],
        isMouseDown = false;

      const handleDragStart = function(e) {
        originX = e.clientX || e.touches[0].clientX;
        originY = e.clientY || e.touches[0].clientY;
        // 判断默认行为是否可以被禁用
        if (e.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!e.defaultPrevented) {
            e.preventDefault();
          }
        }
        isMouseDown = true;
      };

      const handleDragMove = e => {
        if (!isMouseDown) return false;
        const eventX = e.clientX || e.touches[0].clientX;
        const eventY = e.clientY || e.touches[0].clientY;
        const moveX = eventX - originX;
        const moveY = eventY - originY;
        // 判断默认行为是否可以被禁用
        if (e.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!e.defaultPrevented) {
            e.preventDefault();
          }
        }
        if (moveX < 0 || moveX + 38 >= this.w) return false;
        this.$refs.slider.style.transform = "translate(" + moveX + "px)";
        const blockLeft = moveX;
        document.getElementsByClassName("block")[0].style.transform =
          "translate(" + blockLeft + "px)";

        this.addClass(this.$refs.sliderContainer, "sliderContainer_active");
        this.$refs.sliderMask.style.width = moveX + "px";
        trail.push(moveY);
      };

      const handleDragEnd = e => {
        if (!isMouseDown) return false;
        isMouseDown = false;
        const eventX = e.clientX || e.changedTouches[0].clientX;
        if (eventX == originX) return false;
        this.removeClass(this.$refs.sliderContainer, "sliderContainer_active");
        this.trail = trail;
        // 判断默认行为是否可以被禁用
        if (e.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!e.defaultPrevented) {
            e.preventDefault();
          }
        }
        const { spliced, verified } = this.verify();
        let position = spliced + "," + 0;
        this.callback(position);
        this.reset();
        this.$emit("update:isfinish", 0);
      };
      this.$refs.slider.addEventListener("mousedown", handleDragStart, false);
      this.$refs.slider.addEventListener("touchstart", handleDragStart, false);
      document.addEventListener("mousemove", handleDragMove, false);
      document.addEventListener("touchmove", handleDragMove, false);
      document.addEventListener("mouseup", handleDragEnd, false);
      document.addEventListener("touchend", handleDragEnd, false);
    },
    verify() {
      const arr = this.trail; // 拖动时y轴的移动距离
      const average = arr.reduce(this.sum) / arr.length;
      const deviations = arr.map(x => x - average);
      const stddev = Math.sqrt(
        deviations.map(this.square).reduce(this.sum) / arr.length
      );

      let left = document.defaultView.getComputedStyle(
        document.getElementsByClassName("block")[0],
        null
      ).transform;
      left = parseFloat(left.substring(7).split(",")[4]);
      return {
        spliced: left,
        verified: stddev !== 0 // 简单验证下拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
      };
    },
    cleanMsg() {
      // document.getElementById("msg").innerHTML = "";
    }
  }
};
</script>
<style>
@media screen and (max-width: 420px) {
  .code-range-down {
    margin-left: 15px !important;
  }
}
@media screen and (max-width: 320px) {
.code-md{
    padding-left: 0 !important;
    width:320px !important;
  }
  .code-range-down {
    margin-left: 0px !important;
  }
}

</style>
<style scoped>

.container {
  width: 320px;
  margin: 100px auto;
  padding:0;
  margin-top: 26px;
  margin-bottom: 10px;
  overflow: hidden;
}

input {
  display: block;
  width: 290px;
  line-height: 40px;
  margin: 10px 0;
  padding: 0 10px;
  outline: none;
  border: 1px solid #c8cccf;
  border-radius: 4px;
  color: #6a6f77;
}
#msg {
  width: 100%;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  position: absolute;
  color: red;
}
/* a:link,
a:visited,
a:hover,
a:active {
  margin-left: 100px;
  color: #0366d6;
} */
.block {
  position: absolute;
  left: 0;
  top: 0;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.sliderContainer {
  position: absolute;
  text-align: center;
  width: 320px;
  height: 42px;
  line-height: 42px;
  bottom: 0;
  margin-top: 15px;
  background: #f7f9fa;
  color: #45494c;
  border: 1px solid #e4e7eb;
}

.sliderContainer_active .slider {
  height: 38px;
  top: -1px;
  border: 1px solid #1991fa;
}

.sliderContainer_active .sliderMask {
  height: 38px;
  border-width: 1px;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.sliderContainer_success .slider {
  height: 38px;
  top: -1px;
  border: 1px solid #52ccba;
  background-color: #52ccba !important;
}

.sliderContainer_success .sliderMask {
  height: 38px;
  border: 1px solid #52ccba;
  background-color: #d2f4ef;
}

.sliderContainer_success .sliderIcon {
  background-position: 0 0 !important;
}

.sliderContainer_fail .slider {
  height: 38px;
  top: -1px;
  border: 1px solid #f57a7a;
  background-color: #f57a7a !important;
}

.sliderContainer_fail .sliderMask {
  height: 38px;
  border: 1px solid #f57a7a;
  background-color: #fce1e1;
}

.sliderContainer_fail .sliderIcon {
  top: 14px;
  background-position: 0 -82px !important;
}
.sliderContainer_active .sliderText,
.sliderContainer_success .sliderText,
.sliderContainer_fail .sliderText {
  display: none;
}

.sliderMask {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  border: 0 solid #1991fa;
  background: #d1e9fe;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background 0.2s linear;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.slider:hover {
  background: #1991fa;
}

.slider:hover .sliderIcon {
  background-position: 0 -13px;
}

.sliderIcon {
  position: absolute;
  top: 15px;
  left: 13px;
  width: 14px;
  height: 12px;
  background: url("http://cstaticdun.126.net//2.6.3/images/icon_light.f13cff3.png")
    0 -26px;
  background-size: 34px 471px;
}

.refreshIcon {
  position: absolute;
  left: 287px;
  top: 0;
  width: 34px;
  height: 34px;
  cursor: pointer;
  background-size: 34px 471px;
  display: block;
  background: url("http://cstaticdun.126.net//2.6.3/images/icon_light.f13cff3.png")
    0 -437px;
}
.closeIcon {
  position: absolute;
  left: 0;
  top: -21px;
  width: 34px;
  height: 34px;
  cursor: pointer;
  background-size: 34px 471px;
}

</style>
