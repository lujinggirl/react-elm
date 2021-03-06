import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {resetUserInfo} from '@/store/user/action'
// import {getStore} from '@/utils/commons'
import './add.scss'
// import API from '../../../api/api'


class Address extends Component {
  static propTypes = {
    resetUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object
  }
  state = {
    verify:false,			//姓名
    verifytwo:false,		//备注
    verifythree:false,		//地址
    verifyfour:false,		//电话
    verifyfive:false,
    vertifies: '',
    butopacity: '',
    message: '',
    addAddress: '',
    mesthree: '',
    sendaddress: '',
    standbytelenum: '',
    telenum: '',
    telephone: '',
    standbytele: '',
  }
  handleAdd = () => {
    let hasAddressList = this.props.userInfo.hasAddressList
    hasAddressList.push({
      mesthree: this.state.mesthree,
      telenum: this.state.telenum,
      address: this.props.userInfo.addressName,
      standbytelenum: this.state.standbytelenum,
      message: this.state.message,
    })
    this.props.resetUserInfo('hasAddressList', hasAddressList)
    this.props.history.push('/setuser/address')
  }
  componentWillMount () {
    console.log(this.props.location, 'fdf')
    if (this.props.match.params.type === 'fromadd') {
      this.props.resetUserInfo('addressName', '')
    }
    // if (this.props.location)
  }
  bindThing = () => {
    if (this.state.message && this.state.mesthree && !this.verifyfour) {
      this.setState({
        butopacity: 'butopacity'
      })
    } else {
      this.setState({
        butopacity: ''
      })
    }
  }
  messageVali = (value) => {
    this.setState({
      verify: value?false:true
    })
    this.bindThing()
  }
  mesthreeVali = (value) => {
    let sendaddress
    let verifythree = true
    if (value.length === 0) {
      sendaddress='请详细填写送餐地址'
    } else if (value.length > 0 && value.length <= 2) {
      sendaddress='送餐地址太短了，不能辨识'
    } else {
      sendaddress=''
      verifythree = false
    }
    this.setState({
      verifythree,
      sendaddress
    })
    this.bindThing()
  }
  teleVali = (value) => {
    let telephone
    let verifyfour = true
    if ((/^[1][358][0-9]{9}$/).test(value)) {
      verifyfour = false
    } else if (value === '') {
      telephone='手机号不能为空'
    } else {
      telephone='请输入正确的手机号'
    }
    this.setState({
      verifyfour,
      telephone
    })
    this.bindThing()
  }
  standbyVali = (value) => {
    let standbytele
    let verifyfive = true
    if ((/^[1][358][0-9]{9}$/).test(value) || value === '') {
      verifyfive = false
    } else {
      standbytele='请输入正确的手机号'
    }
    this.setState({
      verifyfive,
      standbytele
    })
    this.bindThing()
  }

  handleInput = (type, e) => {
    let newState = {}
    let value = e.target.value
    newState[type] = value
    switch (type) {
      case 'message': 
        this.messageVali(value)
        break
      case 'mesthree': 
        this.mesthreeVali(value)
        break
      case 'telenum': 
        this.teleVali(value)
        break
      case 'standbytelenum':
        this.standbyVali(value)
        break
      default:
        break
    }
    this.setState({
      ...newState
    })
    
  }
  render () {
    return (
      <div className='adddetail'>
          <form className='add-form'>
              <section className='ui-padding-block'>
                <div className='input-new'>
                  <input type="text" placeholder='请输入你的姓名' className={this.state.vertifies} value={this.state.message} onChange={this.handleInput.bind(this, 'message')}/>
                  {this.state.verify&&<p>请输入您的姓名</p>}
                </div>
                <Link to='/setuser/add_detail' className='add-detail'>
                  <div className='input-new'>
                    <input type="text" placeholder='小区/写字楼/学校等' readOnly='readonly' value={this.props.userInfo.addressName} />
                  </div>
                </Link>
                <div className='input-new'>
                  <input type="text" placeholder='请填写详细送餐地址' className={this.state.vertifies} value={this.state.mesthree} onChange={this.handleInput.bind(this, 'mesthree')}/>
                  {this.state.verifythree&&<p>{this.state.sendaddress}</p>}
                </div>
                <div className='input-new'>
                  <input type="text" placeholder='请填写能够联系到您的手机号' className={this.state.vertifies} value={this.state.telenum} onChange={this.handleInput.bind(this, 'telenum')}/>
                  {this.state.verifyfour&&<p>{this.state.telephone}</p>}
                </div>
                <div className='input-new'>
                  <input type="text" placeholder='备用联系电话（选填）' className={this.state.vertifies} value={this.state.standbytelenum} onChange={this.handleInput.bind(this, 'standbytelenum')}/>
                  {this.state.verifyfive&&<p>{this.state.standbytele}</p>}
                </div>
              </section>
              <section className='addbutton'>
                <button className={this.state.butopacity} onClick={this.handleAdd}>新增地址</button>
              </section>
          </form>
      </div>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {
  resetUserInfo
})(Address)