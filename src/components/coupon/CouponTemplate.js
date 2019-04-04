import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Modal from '../modal'
import style from './couponTemplate.scss'

import imageCoupon from './images/coupon.png'
import iconClose from './images/icon_close_popup.png'
import bg from './images/hangzhou_jxdlb_bg.png'

export default class CouponTemplate extends React.Component {

  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (e) {
    const el = e.target
    const value = el.type === 'checkbox' ? el.checked : el.value
    const name = el.name
    this.props.onInputChange({
      name,
      value
    })
  }

  static propTypes = {
    login: PropTypes.object,
    coupon: PropTypes.object,
    rule: PropTypes.object,
    app: PropTypes.object,
    onInputChange: PropTypes.func
  }

  static defaultProps = {
    login: {
      title: '活动时间：2018年11月10日至2018年11月23日，数量有限，领完即止！',
      phone: '',
      code: '',
      read: true,
      bgi: './images/hangzhou_jxdlb_bg.png'
    },
    coupon: {
      show: false,
      title: '恭喜您获得',
      data: [
        imageCoupon,
        imageCoupon
      ]
    },
    rule: {
      show: false,
      title: '活动规则',
      data: [
        '菁选福袋专属优惠券仅限会员领取， 每位会员仅可领取一次；',
        '您可在悠宝利微信公众号、宝能菁选APP中查询账户优惠券，查询方式：个人中心>我的优惠券；',
        '您可在全国悠宝利精选店，悠宝利微信小程序商城或宝能菁选APP上购物使用，具体使用规则以优惠券及相关活动页面规则为准；'
      ]
    },
    app: {
      show: false,
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

  render () {
    const { login, coupon, rule, app } = this.props
    console.log('login.read', login.read)
    let defaultImage = login.bgi || bg
    return (
      <div className={style.wrapper} style={{ 'backgroundImage': 'url(' + defaultImage + ')' }}>
        <div className={style['active']}>活动规则</div>
        <div className={style['login']}>
          <div className={style['title']}>{login.title}</div>
          <div className={classnames(style['form-item'], style['text-inner'])}>
            <input type='text' name='login.phone' value={login.phone} onChange={this.handleInputChange} placeholder='请输入手机号' />
          </div>
          <div className={classnames(style['form-item'], style['text-inner'])}>
            <input type='text' name='login.code' onChange={this.handleInputChange} value={login.code} placeholder='请输入验证码' />
            <span className={style['btn-code']}>获取验证码</span>
          </div>
          <div className={classnames(style['form-item'], style['agreement'])}>
            <input name='login.read' checked={login.read} onChange={this.handleInputChange} type='checkbox' id='code' /><label htmlFor='code'>我已阅读并同意《用户服务协议》</label>
          </div>
          <div className={style['form-item']}>
            <button className={classnames(style['submit'], style['btn'])}>立即领取</button>
          </div>
        </div>
        <div className={classnames(style['coupons'], style['hide'])}>
          <div className={style['coupons-inner']}>
            <div className={style['title']}>{coupon.title}</div>
            <div className={style['list']}>
              {
                coupon.data.map((item, index) => <img key={index} src={item} />)
              }
            </div>
          </div>
          <div>
            <button className={classnames(style['btn'], style['use'])}>去使用</button>
            <button className={classnames(style['btn'], style['share'])}>分享至</button>
          </div>
        </div>
        <Modal show={rule.show}>
          <div className={style['warm']}>
            <div className={style['title']}>{rule.title}</div>
            <ul className={style['list']}>
              {
                rule.data.map((item, index) => <li key={index}>{index + '. ' + item}</li>)
              }
            </ul>
          </div>
          <div>
            <img src={iconClose} />
          </div>
        </Modal>
        <Modal show={app.show}>
          <div className={style['app-coupon-desc']}>
            <div className={style['title']}>{app.title}</div>
            <div className={style.downBtn}>{app.btnTxt}</div>
            <hr style={{ 'background': '#e5e5e5' }} />
            <dl className={style.rule}>
              <dt>使用规则</dt>
              {
                app.data.map((item, index) => <dd key={index}>{index + '. ' + item}</dd>)
              }
            </dl>
          </div>
          <div className={style.closeBtn}>
            <img src={iconClose} />
          </div>
        </Modal>
        <Modal>
          <div className={style.alertTip}>
            <div className={style.content}>该活动仅限新客领取哦</div>
            <div className={style.close}>知道了</div>
          </div>
        </Modal>
      </div>
    )
  }
}
