import Vue from 'vue'
import index from '@/components/index'
import ElementUI from 'element-ui';
import { shallowMount } from '@vue/test-utils'
Vue.use(ElementUI);
describe('index页面测试', () => {
  const wrapper = shallowMount(index, {
    data() {
      return {
        text: "",
        lines: "",
        teacher: [],
      }
    }
  })

  it('验证是否渲染了页面按钮', () => {
    expect(button.text()).toEqual('生成')
  })

  const button = wrapper.findAllComponents({ name: 'el-button' }).at(1)

  wrapper.vm.text = "导师：张三"
  button.trigger('click');
  it('测试按钮是否能点击', () => {
    expect(wrapper.vm.teacher[0].name).toEqual("张三")
  })



  wrapper.vm.text = `
导师：张三
2016级博士生：天一、王二、吴五
2015级硕士生：李四、王五、许六
2016级硕士生：刘一、李二、李三
2017级本科生：刘六、琪七、司四

刘六：JAVA、数学建模

李二：字节跳动、京东云 
      `

  button.trigger('click');
  var teacher = wrapper.vm.teacher[0]
  it('测试树生成算法', () => {
    expect(teacher.children[0].name).toEqual("2016级博士生")
    expect(teacher.children[1].children[2].name).toEqual("许六")
    expect(teacher.children[3].children[0].detail).toEqual("JAVA、数学建模")
  })






})
