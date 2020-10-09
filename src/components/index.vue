<template>
  <div class="index">
    <el-row :gutter="20" class="el-row" type="flex">
      <el-col :span="8" :offset="8">
        <el-input
          :rows="8"
          type="textarea"
          placeholder="请输入内容"
          v-model="text"
        >
          <!-- v-show="show" -->
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="el-row" type="flex">
      <el-col :span="8" :offset="8">
        <el-button @click="init" class="button">生成</el-button>
      </el-col>
    </el-row>
    <div
      v-drag
      class="card"
      v-for="(item, index) in teacher"
      :key="item.name + index"
    >
      <TreeChart :json="item"></TreeChart>
    </div>
  </div>
</template>

<script>
import TreeChart from "./tree";

export default {
  components: { TreeChart },
  name: "index",
  data() {
    return {
      text: "",
      lines: "",
      teacher: [],
    };
  },
  methods: {
    init() {
      this.teacher = [];//清除数据
      this.initData();//数据处理
      //console.log(this.teacher);
    },
    initData() {
      var nowTeacher = "";//当前教师
      this.lines = this.text.split("\n");//以行分割
      this.lines.forEach((item) => {//遍历每一行
        if (item.includes("导师：")) {//判断是导师
          var temp = item.split("：");
          nowTeacher = temp[1];//开始录入此导师的子节点的标志
          this.teacher.push({ name: temp[1], children: [], extend: false });
        } else if (item === "") {//导师后出现空行
          nowTeacher = "";//停止导师录入子节点
        } else if (nowTeacher !== "") {//导师的子节点
          var temp = item.split("：");
          var students = temp[1].split("、");
          this.teacher.filter((item) => {
            if (item.name === nowTeacher) {
              var children = [];
              students.forEach((s) => {
                children.push({ name: s });
              });
              item.children.push({
                name: temp[0],
                children: children,
                extend: false,
              });
            }
          });
        } else {//判断是学生的具体信息
          var temp = item.split("：");//temp[0]学生姓名，temp[1]学生详情

          this.teacher.forEach((teacher) => {
            teacher.children.forEach((grade) => {
              grade.children.forEach((item) => {
                item.image_url = require("../assets/head.jpg");//学生头像
                if (item.name === temp[0]) {
                  item.detail = temp[1];

                  return;
                }
              });
            });
          });
        }
      });
    },
  },
  directives: {
    //拖拽功能
    drag: {
      // 指令的定义
      bind: function (el) {
        let oDiv = el; // 获取当前元素
        oDiv.onmousedown = (e) => {
          // 算出鼠标相对元素的位置
          let disX = e.clientX - oDiv.offsetLeft;
          let disY = e.clientY - oDiv.offsetTop;

          document.onmousemove = (e) => {
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX;
            let top = e.clientY - disY;

            oDiv.style.left = left + "px";
            oDiv.style.top = top + "px";
          };

          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
