import React from 'react'
// 导入antd
import { List, Button, Input } from 'antd'
// 导入样式
import './index.css'
// 引入自写获取本地数据函数
import { getListData } from '../componets/Listdata'

const data = getListData()

export default class list extends React.Component {
  state = {
    item_readonly: true,
    value: '',
    item_value: '',
    list: []
  }
  // 方法   获取本地列表数据
  getList() {
    const list = data
    this.setState({
      list: list
    })
  }
  // 方法   将数据存到本地
  saveList() {
    localStorage.setItem('listData', JSON.stringify(this.state.list))
  }

  // 组件   渲染添加列表
  renderAdd() {
    return <div>
      {/* 输入框 */}
      <Input placeholder="请输入待办事项"
        value={this.state.value}
        onChange={(e) => this.setState({ value: e.target.value })}
      ></Input>
      {/* 添加按钮 */}
      <Button type="primary"
        style={{ marginLeft: '5px' }}
        onClick={() => {
          const val = this.state.value
          const list1 = this.state.list
          if (!val) {
            return alert('待办事项不能为空')
          }
          list1.push(val)
          this.setState({
            value: '',
            list: list1
          })
        }}
      >添加</Button>
      {/* 修改按钮 */}
      <Button type="primary"
        style={{ marginLeft: '5px' }}
        onClick={() => {
          this.setState({
            item_readonly: false
          })
          alert('现在可以修改代办事项啦')
        }}
      >修改</Button>
    </div>
  }

  // 组件   渲染列表
  renderList() {
    return <List
      header={this.renderAdd()}
      bordered
      dataSource={this.state.list}
      rowKey={((item) => this.state.list.indexOf(item))}
      locale={{ emptyText: '当前暂无待办事项' }}
      renderItem={item => (
        <List.Item>
          <div className='schedule'>
            <span style={{ marginRight: '4px' }}>{`[事项${this.state.list.indexOf(item) + 1}]`}</span>
            <Input
              bordered={false}
              value={item}
              readOnly={this.state.item_readonly}
              onBlur={()=>{
                if(!this.state.item_readonly) this.setState({item_readonly:true})
              }}
              onChange={(e) => {
                const list = this.state.list
                const index = list.indexOf(item)
                list.splice(index, 1, e.target.value)
                this.setState({
                  list: list
                })
              }}
            />
          </div>
          <div>
            <Button onClick={() => {
              const list = this.state.list
              const index = list.indexOf(item)
              list.splice(index, 1)
              this.setState({
                list: list
              })
            }}>删除</Button>
          </div>
        </List.Item>
      )}
    />
  }

  componentDidMount() {
    // 渲染列表数据
    this.getList()
  }

  componentDidUpdate() {
    //在页面更新时将数据存储起来
    this.saveList()
  }
  render() {
    return <div>
      {this.renderList()}
    </div>
  }
}
