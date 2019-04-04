import React from 'react'
import { set } from 'lodash'
import CouponTemplate from '../components/coupon'
// import imageCoupon from './images/coupon.png'
// export default CouponTemplate
function cryle (object, target) {
  let props = Object.keys(object)
  for (let i = 0; i < props.length; i++) {
    let propsObject = object[props[i]] || {}
    let _props = Object.keys(propsObject)
    for (let j = 0; j < _props.length; j++) {
      let _propsObject = propsObject[_props[j]]
      if (typeof _propsObject === 'object') {
        let levep = {}
        if (target[props[i]]) {
          levep = target[props[i]]
        } else {
          levep = target[props[i]] = {}
        }
        levep[_props[j]] = {}
        cryle({ [_props[j]]: _propsObject }, levep)
      } else {
        target[props[i]] = object[props[i]].defaultValue
        break
      }
    }
  }
}

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      login: {
        title: '活动时间：2018年11月10日至2018年11月23日，数量有限，领完即止！',
        phone: '',
        code: '',
        read: true
      },
      coupon: {
        title: '恭喜您获得',
        data: [
          // imageCoupon,
          // imageCoupon
        ]
      },
      rule: {
        title: '活动规则',
        data: [
          '菁选福袋专属优惠券仅限会员领取， 每位会员仅可领取一次；',
          '您可在悠宝利微信公众号、宝能菁选APP中查询账户优惠券，查询方式：个人中心>我的优惠券；',
          '您可在全国悠宝利精选店，悠宝利微信小程序商城或宝能菁选APP上购物使用，具体使用规则以优惠券及相关活动页面规则为准；'
        ]
      },
      app: {
        title: '宝能菁选APP专享优惠券',
        btnTxt: '点击下载宝能菁选',
        data: [
          '仅限购买指定商品方可使用',
          '仅限购买正价商品',
          '每个用户仅限使用一张优惠券，不设找零',
          '仅限在宝能菁选APP使用',
          '本券不能兑换为现金，且不能与其他优惠同时享受',
          '限量500份，售完即止'
        ]
      }
    }
    this.receiveMessage = this.receiveMessage.bind(this)
  }

  receiveMessage (event) {
    var origin = event.origin
    if (origin === location.origin && event.data.type === 'editData') {
      let data = {}
      cryle(event.data.data, data)
      console.log('receiveMessage', event.data.data, data)
      this.setState({
        ...this.state,
        ...data
      })
    }
  }

  handleInputChange = ({ name, value }) => {
    console.log(name, value)
    this.setState((state, props) => {
      return set(state, name, value)
    })
  }

  componentDidMount () {
    window.addEventListener('message', this.receiveMessage, false)
  }

  render () {
    return <CouponTemplate
      {...this.state}
      onInputChange={this.handleInputChange}
    />
  }
}
