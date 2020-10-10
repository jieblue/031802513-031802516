<template>
  <div class="index">
    <el-card class="inputfield" >
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
            <el-col :span="4" :offset="8">
       <el-upload
       action=""
  class="upload"
   :on-change="loadFile"
   :auto-upload="false"
   :list-type="text"
  :file-list="fileList">
  <el-button size="small" type="primary">上传文本</el-button>
</el-upload>
      </el-col>
      <el-col :span="4" >
        <el-button @click.native="init" class="button">生成</el-button>
      </el-col>
    </el-row>
    </el-card>
       <el-card class="treefield" >
    <div
      v-drag
      class="card"
      v-for="(item, index) in teacher"
      :key="item.name + index"
    >
      <TreeChart :json="item"></TreeChart>
    </div>
  </el-card>
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
      fileList:[],
    };
  },
  methods: {
    //上传文本文件
    loadFile(file) {
      let reader = new FileReader()
        reader.readAsText(file.raw, "utf-8")
        var _this = this;
      reader.onload = function (e) {
      console.log(e.target.result)
        _this.text=e.target.result
      }
      },
    init() {
      this.teacher = [];//清除数据
      this.initData();//数据处理
      this.combineTree();//合并树
      //console.log(this.teacher);
    },
    combineTree(){
      this.teacher.forEach((teacher) => {
            teacher.children.forEach((grade) => {
              grade.children.forEach((item) => {
                  this.teacher.forEach((teacher,index)=>{
                    if(teacher.name && teacher.name===item.name){
                      console.log(teacher);
                      item.children=teacher.children;//此导师的子节点移动
                      this.teacher.splice(index,1);//从根节点移除此导师
                    }
                  })


              })
            })
      })
    },
    initData() {
      var nowTeacher = "";//当前教师
      this.lines = this.text.split("\n");//以行分割
      this.lines.forEach((item) => {//遍历每一行
        if (item.includes("导师：")) {//判断是导师
          var temp = item.split("：");
          nowTeacher = temp[1];//开始录入此导师的子节点的标志
          this.teacher.push({ name: temp[1], children: [], extend: false ,image_url : require("../assets/head.jpg")});
        } else if (item === "") {//导师后出现空行
          nowTeacher = "";//停止导师录入子节点
        } else if (nowTeacher !== "") {//导师的子节点
          var temp1 = item.split("：");
          var students = temp1[1].split("、");
          this.teacher.filter((item) => {
            if (item.name === nowTeacher) {
              var children = [];
              students.forEach((s) => {
                children.push({ name: s ,    image_url : require("../assets/head.jpg")});
              });
              item.children.push({
                name: temp1[0],
                children: children,
                extend: false,
            
              });
            }
          });
        } else {//判断是学生的具体信息
          var temp2 = item.split("：");//temp[0]学生姓名，temp[1]学生详情

          this.teacher.forEach((teacher) => {

             if (teacher.name === temp2[0]) {
                  teacher.detail = temp2[1];

                }
            teacher.children.forEach((grade) => {
              grade.children.forEach((item) => {
                if (item.name === temp2[0]) {
                  item.detail = temp2[1];

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

          document.onmouseup = () => {
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
.inputfield {
  height: 300px;
  background:	#FFFFE0
}
.treefield {
  height: 640px;
 background: #66CDAA
}
</style>
