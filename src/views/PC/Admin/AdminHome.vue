<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <h1 class="m-n font-thin text-black l-h">宠物之家</h1>
            <small class="text-muted letterspacing indexWords"></small>
        </header>
        <!--内容页-->
        <div class="wrapper-md pet-manage-content" style="height: 85vh">
            <div id="mapContainer"></div>

            <ul id="my-list"></ul>
        </div>

    </div>
</template>

<script>
    export default {
        name: "AdminHome",
        mounted() {
            // this.$store.dispatch("test");
            // this.test()
        },
        methods: {
            test: function () {
                //创建地图
                var map = new AMap.Map('mapContainer', {
                    zoom: 1
                })

                AMapUI.loadUI(['misc/MarkerList'], function (MarkerList) {

                    var markerList = new MarkerList({
                        //关联的map对象
                        map: map,

                        //列表的dom容器的id
                        listContainer: 'my-list',

                        //选中状态（通过点击列表或者marker）时在Marker和列表节点上添加的class，可以借此编写css控制选中时的展示效果
                        selectedClassNames: 'selected',

                        //返回数据项的Id
                        getDataId: function (dataItem, index) {
                            //index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
                            return dataItem.id
                        },
                        //返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.789806, 39.904989]
                        getPosition: function (dataItem) {
                            return dataItem.position
                        },
                        //返回数据项对应的Marker
                        getMarker: function (dataItem, context, recycledMarker) {

                            //marker的标注内容
                            var content = dataItem.markerLabel

                            var label = {
                                offset: new AMap.Pixel(16, 18), //修改label相对于marker的位置
                                content: content
                            }

                            //存在可回收利用的marker
                            if (recycledMarker) {
                                //直接更新内容返回
                                recycledMarker.setLabel(label)
                                return recycledMarker
                            }

                            //返回一个新的Marker
                            return new AMap.Marker({
                                label: label
                            })
                        },
                        //返回数据项对应的infoWindow
                        getInfoWindow: function (dataItem, context, recycledInfoWindow) {

                            var tpl = '<p><%- dataItem.id %>：<%- dataItem.infoWinContent %><p>'

                            //MarkerList.utils.template支持underscore语法的模板
                            var content = MarkerList.utils.template(tpl, {
                                dataItem: dataItem,
                                dataIndex: context.index
                            })

                            if (recycledInfoWindow) {
                                //存在可回收利用的infoWindow, 直接更新内容返回
                                recycledInfoWindow.setContent(content)
                                return recycledInfoWindow
                            }

                            //返回一个新的InfoWindow
                            return new AMap.InfoWindow({
                                offset: new AMap.Pixel(0, -23),
                                content: content
                            })
                        },
                        //返回数据项对应的列表节点
                        getListElement: function (dataItem, context, recycledListElement) {

                            var tpl = '<p><%- dataItem.id %>：<%- dataItem.listDesc %><p>'

                            var content = MarkerList.utils.template(tpl, {
                                dataItem: dataItem,
                                dataIndex: context.index
                            })

                            if (recycledListElement) {
                                //存在可回收利用的listElement, 直接更新内容返回
                                recycledListElement.innerHTML = content
                                return recycledListElement
                            }

                            //返回一段html，MarkerList将利用此html构建一个新的dom节点
                            return '<li>' + content + '</li>'
                        }

                    })

                    //监听选中改变
                    markerList.on('selectedChanged', function (event, info) {
                        //console.log(event, info);
                    })

                    //监听Marker和ListElement上的点击
                    markerList.on('markerClick listElementClick', function (event, record) {
                        //console.log(event, record);
                    })

                    //构建一个数据项数组，数据项本身没有格式要求，但需要支持getDataId和getPosition
                    var data = [{
                        id: 'A',
                        position: [116.020764, 39.904989],
                        markerLabel: 'X_A',
                        infoWinContent: 'Hello! A',
                        listDesc: '店铺 A'
                    }, {
                        id: 'B',
                        position: [116.405285, 39.904989],
                        markerLabel: 'X_B',
                        infoWinContent: 'Hello! B',
                        listDesc: '店铺 B'
                    }, {
                        id: 'C',
                        position: [116.789806, 39.904989],
                        markerLabel: 'X_C',
                        infoWinContent: 'Hello! C',
                        listDesc: '店铺 C'
                    }]

                    //展示该数据
                    markerList.render(data)
                })
                // TMap().then(qq => {
                //     var center = new qq.maps.LatLng(39.916527,116.397128);
                //     var map = new qq.maps.Map(document.getElementById('mapContainer'),{
                //         center: center,
                //         zoom: 13
                //     });
                //
                //     var anchor = new qq.maps.Point(100, 100),
                //         size = new qq.maps.Size(80, 80),
                //         origin = new qq.maps.Point(0, 0),
                //         icon = new qq.maps.MarkerImage('http://jijianblog.com/usr/themes/handsome/usr/img/sj2/9.jpg', size, origin, anchor);
                //     var marker = new qq.maps.Marker({
                //         icon: icon,
                //         map: map,
                //         position:map.getCenter()});
                //
                //
                //
                // })
            }

        }
    }
</script>

<style scoped>

</style>
