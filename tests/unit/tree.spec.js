import Vue from 'vue'
import tree from '@/components/tree'
import ElementUI from 'element-ui';
import { mount} from '@vue/test-utils'
//import { forEach } from 'core-js/fn/array';
Vue.use(ElementUI);
describe('index页面测试', () => {
  const wrapper = mount(tree, {
    data() {
      return {
        dialogVisible: false,
        treeData: {name:"张三",children:[{name:"2018级研究生", extend:true,children:[{name:"李四",detail:"haha"},{name:"王五",}]},{name:"2019级研究生",children:[{name:"赵六"},{name:"陈7"}]}],extend:true},
        name: "",
        detail: "",
      }
    }
  })
    
    it('验证树根组件是否正确渲染', () => {
      expect(wrapper.find('.name').text()).toEqual('张三')
    })
    it('验证树结点数量', () => {
      expect(wrapper.findAllComponents(tree).length).toBe(7)
    })

    it('验证子节点组件是否正确渲染', () => {
      expect(wrapper.findAllComponents(tree).at(1).findAllComponents(tree).at(1).find(".name").text()).toEqual('李四')
    })
    const button=wrapper.findComponent({name:'el-button'})
    it('验证学生查看详情按钮', () => {
      expect(button.text()).toEqual('查看详情')
      
      wrapper.vm.showDetail({name:"李四",detail:"haha"})
      expect(wrapper.vm.detail).toEqual("haha");
    })




})
