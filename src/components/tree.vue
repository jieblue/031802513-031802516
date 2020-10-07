<template>
    <div class="card" v-drag id="card">
<el-tree :data="data" :props="defaultProps"    draggable></el-tree>
    </div>
    
</template>
<script>
export default {
  name: 'tree',
   props:["teacherdata"],
  data () {
    return {
           data:[],
            defaultProps: {
                    label: 'label',
          children: 'children'
      
        },
        count: 1
    }
  },
   components: {
             
                   
                },
 mounted(){

      
      this.data.push(this.teacherdata)

      console.log(this.data);
      this.datas=JSON.stringify(this.data)
  },
  methods:{
     
      
      

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
<style>
    .card {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        background-color: #3ab5a0;
    }
</style>