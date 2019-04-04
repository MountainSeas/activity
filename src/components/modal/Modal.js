import React from 'react'
import PropTypes from 'prop-types'
import style from './modal.scss'

export default class extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    show: PropTypes.bool
  }

  render () {
    return (
      <div className={style.wrapper} style={{ 'display': (this.props.show ? 'block' : 'none') }}>
        <div className={style.content}>{this.props.children}</div>
        <div className={style.mask} />
      </div>
    )
  }
}
