<template>
  <div class="shop">
    <el-container>
      <!-- 顶部title -->
      <el-header>
        <div class="img" style="float:left;padding:20px;">
          <img
            src="@/assets/img/avatar.jpg"
            alt=""
            style="width:200px;height:200px;"
          />
        </div>
        <div class="text" style="float:left;padding:20px 0;">
          <li>
            <img
              src="@/assets/img/brand.png"
              alt=""
              style="vertical-align:middle"
            />
            <span style="font-size:20px;  font-weight: bolder;padding: 0 10px;"
              >靓粥缘</span
            >
          </li>
          <li>
            <h4 style="float:left;">{{ dpCon.description }}</h4>
          </li>
          <br />
          <li>
            <img
              src="@/assets/img/decrease.png"
              alt=""
              style="vertical-align:middle;width:30px;height:30px;float:left;"
            /><span
              style="font-size:16px; 
                  padding: 0 10px;"
              >在线支付满28减5</span
            >
          </li>
          <br />
          <li>
            <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </li>
        </div>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="12">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>营业额</span>
              </div>
              <div class="text item">
                <h1>合计：</h1>
                <span :class="posCount >= 500 ? 'span-text' : 'span'"
                  >￥{{ posCount }}元</span
                >
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>订单量</span>
              </div>
              <div class="text item">
                <h1>合计：</h1>
                <span :class="count >= 20 ? 'span-text' : 'span'"
                  >{{ count }}单</span
                >
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "dian",
  data() {
    return {
      dpCon: [],
      value: 4.3
    };
  },
  created() {
    axios
      .get("/mock/data.json")
      .then(res => {
        // this.dpCon = res.data;
        // console.log(res.data.seller);
        this.dpCon = res.data.seller;
        console.log(this.dpCon);
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    // posCount() {
    //   return this.$store.state.posCount;
    // },
    // count() {
    //   return this.$store.state.count;
    // }
    ...mapState(["posCount", "count"])
  }
};
</script>
<style lang="scss" scoped>
.shop {
  .el-header {
    color: #fff;
    height: 240px !important;
    li {
      list-style: none;
      padding: 10px;
      h4 {
        margin: 0;
        padding: 0;
      }
      .el-rate {
        float: left;
      }
    }
  }
  .el-main {
    color: #fff;
    .box-card {
      color: #fff;
      background-color: rgba(50, 50, 41, 0.5) !important;
      border: none;
      padding: 5px;
      margin: 5px;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 0px 5px 5px rgba(45, 45, 45, 0.6);
        transition: box-shadow 0.5s;
      }
      .clearfix:after {
        content: "";
        display: block;
        clear: both;
        height: 0;
        visibility: hidden;
      }
      span {
        font-size: 16px;
        font-weight: bold;
      }
      .span-text {
        font-size: 28px;
        font-weight: bolder;
        color: #58b7ff;
      }
      .span {
        font-size: 28px;
        font-weight: bolder;
        color: red;
      }
    }
  }
}
</style>
