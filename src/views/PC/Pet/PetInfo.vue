<template>
    <div class="col center-part">
        <header class="bg-light lter wrapper-md">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>宠物管理</el-breadcrumb-item>
                <el-breadcrumb-item>宠物信息管理</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!--内容页-->
        <div class="wrapper-md" id="post-panel">
            <div class="ui link cards">
                <div class="card">
                    <div class="image">
                        <img src="">
                    </div>
                    <div class="content">
                        <div class="header">Matt Giampietro</div>
                        <div class="meta">
                            <a>Friends</a>
                        </div>
                        <div class="description">
                            Matthew is an interior designer living in New York.
                        </div>
                    </div>
                    <div class="extra content">
      <span class="right floated">
        Joined in 2013
      </span>
                        <span>
        <i class="user icon"></i>
        75 Friends
      </span>
                    </div>
                </div>
                <div class="card">
                    <div class="image">
                        <img src="">
                    </div>
                    <div class="content">
                        <div class="header">Molly</div>
                        <div class="meta">
                            <span class="date">Coworker</span>
                        </div>
                        <div class="description">
                            Molly is a personal assistant living in Paris.
                        </div>
                    </div>
                    <div class="extra content">
      <span class="right floated">
        Joined in 2011
      </span>
                        <span>
        <i class="user icon"></i>
        35 Friends
      </span>
                    </div>
                </div>
                <div class="card">
                    <div class="image">
                        <img src="">
                    </div>
                    <div class="content">
                        <div class="header">Elyse</div>
                        <div class="meta">
                            <a>Coworker</a>
                        </div>
                        <div class="description">
                            Elyse is a copywriter working in New York.
                        </div>
                    </div>
                    <div class="extra content">
      <span class="right floated">
        Joined in 2014
      </span>
                        <span>
        <i class="user icon"></i>
        151 Friends
      </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PetInfo"
    }
</script>

<style scoped>

</style>
