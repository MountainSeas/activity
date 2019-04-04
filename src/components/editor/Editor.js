import React from 'react'
import PropTypes from 'prop-types'
import style from './Editor.scss'

export default class Edit extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    onReady: PropTypes.func
  }

  static defaultProps = {
    children: []
  }

  componentDidMount () {
    const template = window.frames['template']
    template.onload = () => {
      this.props.onReady({ template })
    }
  }

  render () {
    return (
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.contentinner}>
            <iframe name='template' src={location.origin} className={style.iframe} />
          </div>
        </div>
        <div className={style.edit}>{
          this.props.children
        }</div>
      </div>
    )
  }
}
