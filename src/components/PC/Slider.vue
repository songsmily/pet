<template>
    <div class="slider" ref="slider">
        <div class="process" :style="{width}"></div>
        <div class="thunk" ref="trunk" :style="{left}">
            <div class="block"></div>
            <div class="tips">
                <span>{{scale*100}}</span>
                <i class="fas fa-caret-down"></i>
            </div>
        </div>
    </div>
</template>
<script>
    /*
    * min 进度条最小值
    * max 进度条最大值
    * v-model 对当前值进行双向绑定实时显示拖拽进度
    * */
    export default {
        name: "Slider",
        // props: ['min', 'max', 'value','per'],
        props:{
            min:{
                default:0
            },
            max:{
                default: 100
            },
            value:{
                default:0
            },
            per:{
                default:0
            }
        },
        data() {
            return {
                slider: null,        //滚动条DOM元素
                thunk: null,         //拖拽DOM元素
            }
        },
        //渲染到页面的时候
        mounted() {
            this.slider = this.$refs.slider
            this.thunk = this.$refs.trunk
            const that = this
            this.thunk.onmousedown = function (e) {
                let width = parseInt(that.width)
                let disX = e.clientX
                document.onmousemove = function (e) {
                    // value, left, width
                    // 当value变化的时候，会通过计算属性修改left，width

                    // 拖拽的时候获取的新width
                    let newWidth = e.clientX - disX + width
                    // 拖拽的时候得到新的百分比
                    let scale = newWidth / that.slider.offsetWidth
                    let percent = Math.ceil((that.max - that.min) * scale + that.min)
                    percent = Math.max(percent, that.min)
                    percent = Math.min(percent, that.max)
                    that.$parent.changePercent(percent)
                }
                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null
                }
                return false
            }
        },
        computed: {
            // 设置一个百分比，提供计算slider进度宽度和trunk的left值
            // 对应公式为  当前值-最小值/最大值-最小值 = slider进度width / slider总width
            // trunk left =  slider进度width + trunk宽度/2
            scale() {
                return (this.per - this.min) / (this.max - this.min)
            },
            width() {
                if (this.slider) {
                    return this.slider.offsetWidth * this.scale + 'px'
                } else {
                    return 0 + 'px'
                }
            },
            left() {
                if (this.slider) {
                    return this.slider.offsetWidth * this.scale - this.thunk.offsetWidth / 2 + 'px'
                } else {
                    return 0 + 'px'
                }
            }
        },
    }
</script>
<style>
    .box {
        margin: 100px auto 0;
        width: 80%
    }

    .clear:after {
        content: '';
        display: block;
        clear: both
    }

    .slider {
        position: relative;
        margin: 20px 0;
        width: 100%;
        height: 10px;
        background: #e4e7ed;
        border-radius: 5px;
        cursor: pointer
    }

    .slider .process {
        position: absolute;
        left: 0;
        top: 0;
        width: 112px;
        height: 10px;
        border-radius: 5px;
        background: #409eff
    }

    .slider .thunk {
        position: absolute;
        left: 100px;
        top: -7px;
        width: 20px;
        height: 20px
    }

    .slider .block {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 1);
        transition: .2s all
    }

    .slider .tips {
        position: absolute;
        left: -7px;
        bottom: 30px;
        min-width: 15px;
        text-align: center;
        padding: 4px 8px;
        background: #000;
        border-radius: 5px;
        height: 24px;
        color: #fff
    }

    .slider .tips i {
        position: absolute;
        margin-left: -5px;
        left: 50%;
        bottom: -9px;
        font-size: 16px;
        color: #000
    }

    .slider .block:hover {
        transform: scale(1.2);
        transition-delay: revert;
        background: rgba(122, 255, 255, 1);

        /*transform: scale3d(1.3,1.3,1.3)*/
        opacity: .6
    }
</style>
