import Vue from 'vue'
import index from '@/components/index'
import ElementUI from 'element-ui';
import { shallowMount } from '@vue/test-utils'
Vue.use(ElementUI);
describe('index.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(index, {
      data() {
        return {
          text: "",
          lines: "",
          teacher: [],
        }
      }
    })

    // 确认是否渲染了页面组件
    const button=wrapper.findComponent({name:'el-button'})
    expect(button.text()).toEqual('生成')
    wrapper.vm.text="导师：张三"
    
    wrapper.vm.init()
    expect(wrapper.vm.teacher[0].name).toEqual("张三")
    


})
})
