<template>
  <div class="pos">
    <el-row>
      <!-- 订单展示 -->
      <el-col :span="7" class="pos-order" id="order-list">
        <el-tabs v-model="activeName">
          <el-tab-pane label="点餐" name="first">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="name" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="price" label="金额"></el-table-column>
              <el-table-column label="操作" width="100%" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    @click="addOrderList(scope.row)"
                    type="text"
                    size="small"
                    >增加</el-button
                  >
                  <el-button
                    @click="delSingleGoods(scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="total-div">
              <span class="num-sum"> <small>数量：</small>{{ allCount }} </span>
              <span> <small>总额：</small>{{ allMoney }}&nbsp;元 </span>
            </div>
            <div class="btn-div">
              <el-button type="warning" @click="guaDan()">挂单</el-button>
              <el-button type="danger" @click="delTab()">删除</el-button>
              <el-button type="success" @click="posMoney(money)"
                >结账</el-button
              >
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单" name="second">
            <el-table :data="tableData_1" border style="width: 100%">
              <el-table-column prop="name" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="price" label="金额"></el-table-column>
            </el-table>
            <div class="total-div">
              <span class="num-sum">
                <small>数量：</small>{{ allCount_1 }}
              </span>
              <span> <small>总额：</small>{{ allMoney_1 }}&nbsp;元 </span>
            </div>
            <div class="btn-div">
              <el-button type="danger" @click="delAll()">删除</el-button>
              <el-button type="success" @click="checkOut(money)"
                >结账</el-button
              >
            </div>
          </el-tab-pane>
          <el-tab-pane label="外卖" name="third">
            <h4>正在开发中。。。</h4>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <!-- 商品展示 -->
      <el-col :span="17" class="goods-order" id="goodList">
        <!-- 常用商品 -->
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li
                v-for="(item, index) in oftenGoods"
                :key="index"
                @click="addOrderList(item)"
              >
                <span>{{ item.name }}</span>
                <span class="o-price">￥{{ item.price }}元</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 商品类别 -->
        <div class="goods-type">
          <el-tabs class="goodstype">
            <el-tab-pane
              v-for="(goods, index) in type0Goods"
              :key="index"
              :label="goods.name"
            >
              <ul class="cookList">
                <li
                  v-for="(item, key) in goods.foods"
                  :key="key"
                  @click="addOrderList(item)"
                >
                  <span class="foodImg"
                    ><img :src="item.image" width="100%"
                  /></span>
                  <span class="foodName">{{ item.name }}</span
                  ><br />
                  <span class="foodPrice">￥{{ item.price }}元</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "pos",
  data: () => ({
    activeName: "first",
    tableData: [],
    oftenGoods: [],
    type0Goods: [],
    typeName: [],
    // 总价格
    allMoney: 0,
    allCount: 0,
    guaGoods: [],
    money: 0,
    multipleSelection: [],
    tableData_1: [],
    allMoney_1: 0,
    allCount_1: 0
  }),
  created() {
    // 获取数据
    axios
      // .get("/mock/data.json")
      .get("http://localhost:7300/mock/5f05b8dda58a8b5c747c0c0a/pos/mock")
      .then(res => {
        // console.log(res.data);
        // 食品
        this.oftenGoods = res.data.foods;
        // 食品分类
        this.type0Goods = res.data.goods;
        // console.log(this.oftenGoods);
        // console.log(this.type0Goods);
        for (let index in this.type0Goods) {
          // console.log(this.type0Goods[index].name);
          this.typeName.push(this.type0Goods[index]);
        }
        // console.log(this.typeName);
      })
      .catch(error => {
        console.log(error);
      });
  },
  mounted() {
    //do something after mounting vue instance
    var orderHeight = document.body.clientHeight;
    document.getElementById("order-list").style.height = orderHeight + "px";
    document.getElementById("goodList").style.height = orderHeight + "px";
  },
  methods: {
    // 添加单个商品
    addOrderList(item) {
      //先判断是否存在订单中
      // 据判断结果编写逻辑
      // 总数量和总金额清零
      this.allMoney = 0;
      this.allCount = 0;
      let isHave = false;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].name == item.name) {
          isHave = true;
        }
      }
      if (isHave) {
        // 改变列表中商品数量
        let arr = this.tableData.filter(o => o.name == item.name);
        arr[0].count++;
      } else {
        // 新添加商品信息,把新信息push进 商品数组内
        let newList = {
          name: item.name,
          price: item.price,
          count: 1
        };
        this.tableData.push(newList);
      }
      this.getAll();
    },
    // 删除单个商品
    delSingleGoods(item) {
      this.tableData = this.tableData.filter(o => o.name != item.name);
      this.getAll();
    },
    getAll() {
      // 总数量和总金额清零
      this.allMoney = 0;
      this.allCount = 0;
      if (this.tableData) {
        // 计算总金额和数量
        this.tableData.forEach(el => {
          this.allCount += el.count;
          this.allMoney = this.allMoney + el.price * el.count;
        });
      }
    },
    // 删除商品（底部按钮）
    delTab() {
      if (this.tableData) {
        this.tableData = [];
        this.getAll();
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success"
        });
      }
    },
    // 结账功能
    posMoney(money) {
      if (this.allMoney != 0) {
        this.$confirm("结账金额：￥" + this.allMoney + "元", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "结账成功!"
            });
            money += this.allMoney;
            this.$store.commit("posMoney", money);
            this.$store.commit("count");
            this.tableData = [];
            this.allMoney = 0;
            this.allCount = 0;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消结账"
            });
          });
      } else {
        this.$message({
          type: "warning",
          message: "亲，你还没有点商品哦!"
        });
      }
    },
    // 挂单功能
    guaDan() {
      this.tableData_1 = this.tableData;
      this.getAll_1();
      this.tableData = [];
      this.allMoney = 0;
      this.allCount = 0;
      this.$notify({
        title: "成功",
        message: "挂单成功",
        type: "success"
      });
    },
    // 挂单页面的数量及总额
    getAll_1() {
      // 总数量和总金额
      this.allMoney_1 = this.allMoney;
      this.allCount_1 = this.allCount;
    },
    // 删除所有商品
    delAll() {
      if (this.tableData_1) {
        this.tableData_1 = [];
        this.allMoney_1 = 0;
        this.allCount_1 = 0;
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success"
        });
      }
    },
    // 挂单页面结账
    checkOut(money) {
      if (this.allMoney_1 != 0) {
        this.$confirm("结账金额：￥" + this.allMoney_1 + "元", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "结账成功!"
            });
            money += this.allMoney_1;
            this.$store.commit("posMoney", money);
            this.$store.commit("count");
            this.tableData_1 = [];
            this.allMoney_1 = 0;
            this.allCount_1 = 0;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消结账"
            });
          });
      } else {
        this.$message({
          type: "warning",
          message: "亲，你还没有点商品哦!"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pos {
  /* 订单展示 */
  .pos-order {
    padding-left: 10px;
    border-right: 1px solid #d3dce6;
    .el-table {
      overflow: scroll;
      & >>> .cell {
        text-align: center; /* 样式穿透 */
      }
    }
    .total-div {
      font-size: 18px;
      color: #fff;
      text-align: center;
      padding: 10px;
      border-bottom: 1px solid #d3dce6;
      .num-sum {
        margin-right: 70px;
      }
    }
    .btn-div {
      margin-top: 10px;
      text-align: center;
    }
    h4 {
      color: #fff;
    }
  }
  /* 商品展示 */
  .goods-order {
    color: #fff;
    height: 100%;
    background-color: rgba(30, 32, 41, 0.2);
    /* 常用商品 */
    .often-goods {
      height: 49%;
      .title {
        height: 18px;
        border-bottom: 2px solid #d3dce6;
        border-left: 1px solid #d3dce6;
        padding: 10px;
        text-align: left;
        font-size: 20px;
        /* font-weight: bold; */
        cursor: pointer;
      }
      .often-goods-list ul {
        padding: 10px;
        margin: 0;
        li {
          list-style: none;
          float: left;
          font-weight: bolder;
          padding: 10px;
          margin: 5px;
          background-color: lightyellow;
          border-radius: 3px;
          color: #555555;
          cursor: pointer;
          .o-price {
            color: #58b7ff;
          }
        }
      }
    }
    /* 商品类别 */
    .goods-type {
      padding: 5px;
      .cookList li {
        list-style: none;
        width: 23%;
        border: 1px solid #e5e9f2;
        height: auot;
        overflow: hidden;
        background-color: #fff;
        padding: 2px;
        float: left;
        margin: 2px;
        cursor: pointer;
        span {
          display: block;
          float: left;
        }
        .foodImg {
          width: 30%;
        }
        .foodName {
          font-size: 10px;
          font-weight: bold;
          padding-left: 20px;
          color: brown;
        }
        .foodPrice {
          color: #58b7ff;
          font-size: 14px;
          font-weight: bolder;
          padding-left: 10px;
          padding-top: 10px;
        }
      }
    }
  }
}
</style>
