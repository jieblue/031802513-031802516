<template>
  <div class="index">
   <el-row :gutter="20"  class="el-row" type="flex" >
    <el-col :span="8" :offset="8">
     <el-input
  type="textarea"
  autosize
  placeholder="请输入内容"
  v-model="text">
</el-input>
    </el-col>
   </el-row>
      <el-row :gutter="20"  class="el-row" type="flex" >
   <el-col :span="8" :offset="8">
 
   <el-button @click="init">生成</el-button>
     </el-col>
    </el-row>
    <tree  v-for="item in teacher" :key="item.name" :teacherdata="item" >aaa</tree>
  </div>
</template>

<script>
import tree from './tree'

export default {
  components: {tree},
  name: 'index',
  data () {
    return {
      text:"",
      lines:"",
      teacher:[],
      students:[],
      msg:""
    }
  },
  methods:{
    
    init(){
      this.initData();
      this.msg="haha"
      console.log(this.teacher)
    },
    initData(){
      var nowTeacher="";
      this.lines=this.text.split('\n');
      this.lines.forEach(item=>{
      if(item.includes("导师：")){
        var temp=item.split("：")
        nowTeacher=temp[1];
         this.teacher.push({label:temp[1],children:[]})
      }else if(item===""){
        nowTeacher=""
      }else if(nowTeacher!==""){
        var temp=item.split("：");
        var students=temp[1].split("、");
        this.teacher.filter(item => {
      if (item.label===nowTeacher) {
        var children=[];
        students.forEach(s => {
          children.push({label:s});
          
        });
          item.children.push({label:temp[0],children:children});
      }
      })
       
       //this.teacher[nowTeacher].push(temp[0],students);
        students.forEach(item=>{
          this.students[item]="";
        });
      }else{
        var temp=item.split("：");
        this.students[temp[0]]=temp[1];
      }


});

    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
</style>
