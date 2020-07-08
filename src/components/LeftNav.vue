<template>
  <div id="leftNav" class="left-nav">
    <ul>
      <router-link to="/" exact>
        <li>
          <i class="iconfont icon-goumai"></i>
          <div>
            收银
          </div>
        </li>
      </router-link>
      <router-link to="/shop">
        <li>
          <i class="iconfont icon-jinrudianpu"></i>
          <div>
            店铺
          </div>
        </li>
      </router-link>
      <li>
        <i class="iconfont icon-hanbao"></i>
        <div>商品</div>
      </li>
      <li>
        <i class="iconfont icon-31huiyuanqia"></i>
        <div>会员</div>
      </li>
      <li>
        <i class="iconfont icon-zuanshi"></i>
        <div>统计</div>
      </li>
      <li>
        <i class="iconfont icon-gongnengjianyi"></i>
        <div>设置</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "leftNav",
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.left-nav {
  color: #fff;
  font-size: 16px;
  height: 100%;
  background-color: rgba(50, 50, 41, 0.5);
  margin: 0;
  float: left;
  width: 5%;
  .iconfont {
    font-size: 20px;
    margin: 0 auto;
  }
  ul {
    padding: 0;
    margin: 0;
    li {
      list-style: none;
      text-align: center;
      /* padding: 10px; */
      padding: 20px 0;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.3);
        color: #e59f71;
        transition: 0.5s;
      }
    }
    .active {
      color: #e59f71;
    }
    a {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
