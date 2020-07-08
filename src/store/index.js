import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posCount: 0,
    count: 0
  },
  mutations: {
    // 营业额
    posMoney(state, money) {
      state.posCount += money;
    },
    // 订单量
    count(state) {
      state.count++;
    }
  },
  actions: {},
  modules: {}
});
