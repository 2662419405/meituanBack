const mongoose = require('mongoose');
const dbName = require('../config/db');

//数据库的地址
const DB_URL = `mongodb://localhost:27017/${dbName.dbName}`;
mongoose.connect(DB_URL);

const models = {
  meituan: {
    // 注册时间
    createTime: { type: String, require: true },
    // 手机号
    phone: { type: String, require: true },
    // 密码
    password: { type: String, require: true },
    // 性别
    sex: { type: String },
    // 昵称
    name: { type: String },
    // 地区
    address: { type: String },
    // 密码的盐
    salt: { type: String, require: true },
    // 第一次注册密码是否被修改
    firstPas: { type: Boolean },
    // 美团会员等级
    level: { type: Number },
    // 收藏列表
    collections: { type: Array },
    // 抵用券列表
    quans: { type: Array },
    // 抽奖券
    chous: { type: Array },
    // 用户头像设置
    avatar: { type: String },
  },
  back: {
    // 销售数量
    xiao: { type: Number },
    // 名称
    name: { type: String },
    // 原先价格
    old: { type: Number },
    // 新价格
    new: { type: Number },
    // 地址
    address: { type: String },
    // 副标题
    sub: { type: String },
    // 页面标题
    sup: { type: String },
    // 是否支持随时退款
    sui: { type: String },
    // 是否支持过期自动退款
    guo: { type: String },
    // 90天内消费数量
    num: { type: Number },
    // 页面地址
    quanAddress: { type: String },
  },
};

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getNames: function(name) {
    return mongoose.model(name);
  },
};
