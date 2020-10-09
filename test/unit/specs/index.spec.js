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

    // 确认是否渲染了 `message`
    expect(wrapper.find('.button').text()).toEqual('生成')


})
})
