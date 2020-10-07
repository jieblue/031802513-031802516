<template>
  <div class="index">
   <el-row :gutter="20"  class="el-row" type="flex" >
    <el-col :span="8" :offset="8">
     <el-input :rows="8"
  type="textarea"
  placeholder="请输入内容"
  v-model="text">
  <!-- v-show="show" -->
  
</el-input>
    </el-col>
   </el-row>
      <el-row :gutter="20"  class="el-row" type="flex" >
   <el-col :span="8" :offset="8">
 
   <el-button @click="init" >生成</el-button>
     </el-col>
    </el-row>
        <div v-drag class="card">
    <TreeChart :json="item"  v-for="item in teacher" :key="item.name"   ></TreeChart>
    </div>
  </div>
</template>

<script>
import TreeChart from './tree'

export default {
  components: {TreeChart},
  name: 'index',
  data () {
    return {
      text:"",
      lines:"",
      teacher:[],
      students:[],
      show:true,
    }
  },
  methods:{
    
    init(){
      this.teacher=[];
      this.students=[];
      this.initData();
     this.show=false;
      console.log(this.teacher)
    },
      initData(){
      var nowTeacher="";
      this.lines=this.text.split('\n');
      this.lines.forEach(item=>{
      if(item.includes("导师：")){
        var temp=item.split("：")
        nowTeacher=temp[1];
         this.teacher.push({name:temp[1],children:[]})
      }else if(item===""){
        nowTeacher=""
      }else if(nowTeacher!==""){
        var temp=item.split("：");
        var students=temp[1].split("、");
        this.teacher.filter(item => {
      if (item.name===nowTeacher) {
        var children=[];
        students.forEach(s => {
          children.push({name:s});
          
        });
          item.children.push({name:temp[0],children:children});
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


  },
     directives: {
        drag: {
            // 指令的定义
            bind: function(el) {
                let oDiv = el;  // 获取当前元素
                oDiv.onmousedown = (e) => {
                    // 算出鼠标相对元素的位置
                    let disX = e.clientX - oDiv.offsetLeft;
                    let disY = e.clientY - oDiv.offsetTop;

                    document.onmousemove = (e) => {
                        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        let left = e.clientX - disX;
                        let top = e.clientY - disY;

                        oDiv.style.left = left + 'px';
                        oDiv.style.top = top + 'px';
                    };

                    document.onmouseup = (e) => {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    }
                }
            }
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
    .card {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

    }
</style>
