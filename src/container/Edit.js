import React from 'react'
import {
  Form, Icon, Input, Button, Switch, Upload, message, Layout
} from 'antd'
import Eidtor from '../components/editor'

const FormItem = Form.Item

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

function cryle (object, cb, key = '') {
  let props = Object.keys(object)
  for (let i = 0; i < props.length; i++) {
    let propsObject = object[props[i]] || {}
    let _props = Object.keys(propsObject)
    for (let j = 0; j < _props.length; j++) {
      let _propsObject = propsObject[_props[j]]
      let keyString = ''
      if (key) {
        keyString = key + '.' + props[i]
      } else {
        keyString = props[i]
      }
      if (typeof _propsObject === 'object') {
        cryle({ [_props[j]]: _propsObject }, cb, keyString)
      } else {
        cb(propsObject, keyString)
        break
      }
    }
  }
}

class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dataConfig: [],
      template: {
        postMessage () {}
      },
      img: null,
      fileList: []
    }
  }

  componentDidMount () {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
      this.state.template.postMessage({
        type: 'editData',
        data: values
      })
      console.log(err, values)
    })
  }

  handleReady = ({ template }) => {
    const coupon = require('../../public/coupon.json')
    let arr = []
    cryle(coupon, (item, keyString) => {
      arr.push({
        key: keyString,
        value: item
      })
      console.log(item, keyString)
    })
    this.setState({
      dataConfig: arr,
      template
    })
    // coupon.login.title = 'sss'
    // setTimeout(() => {
    // template.postMessage({
    //   type: 'editData',
    //   data: coupon
    // }, location.origin)
    // }, 1000)
  }

  transform = (config) => {
    let render = []
    const { getFieldDecorator } = this.props.form
    switch (config.value.type) {
      case 'string':
        render = getFieldDecorator(config.key + '.defaultValue', {
          initialValue: config.value.defaultValue,
          rules: [{ required: true, message: 'Please input your username!' }]
        })(
          <Input type='text' placeholder={config.value.label} />
        )
        break
      case 'boolean':
        render = getFieldDecorator(config.key + '.defaultValue', {
          valuePropName: 'checked',
          initialValue: config.value.defaultValue,
          rules: [{ required: true }]
        })(
          <Switch />
        )
        break
      case 'file':
        const props = {
          beforeUpload: (file) => {
            this.setState(state => ({
              fileList: {
                [config.key]: [file]
              }
            }))
            return false
          },
          fileList: this.state.fileList[config.key] || []
        }
        render = getFieldDecorator(config.key + '.defaultValue', {
          // valuePropName: 'fileList',
          initialValue: config.value.defaultValue,
          rules: [{ required: true }],
          getValueFromEvent ({ file }) {
            const url = window.URL.createObjectURL(file)
            return url
          }
        })(
          <Upload.Dragger {...props}>
            <p className='ant-upload-drag-icon'>
              <Icon type='inbox' />
            </p>
            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
            <p className='ant-upload-hint'>Support for a single or bulk upload.</p>
          </Upload.Dragger>
        )
        break
      default:
        render = getFieldDecorator(config.key + '.defaultValue', {
          initialValue: config.value.defaultValue,
          rules: [{ required: true, message: 'Please input your username!' }]
        })(
          <Input type='text' placeholder={config.value.label} />
        )
        break
    }
    return render
  }

  handleFileChange = (e) => {
    console.log(e)
    const file = e.target.files[0]
    const url = window.URL.createObjectURL(file)
    console.log(url)
    this.setState({
      img: url
    })
  }

  render () {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName')
    const passwordError = isFieldTouched('password') && getFieldError('password')
    return (
      <Eidtor
        onReady={this.handleReady}>
        <div style={{ width: '500px', margin: '20px auto' }}>
          <Form layout='vertical'>
            {
              this.state.dataConfig.map((item, index) => (
                <FormItem
                  key={index}
                  label={item.value.label}
                >
                  {this.transform(item)}
                </FormItem>
              ))
            }
            <FormItem>
              <Button
                type='primary'
                htmlType='submit'
                onClick={this.handleSubmit}
              >
                提交
              </Button>
            </FormItem>
          </Form>
          <img src={this.state.img} />
        </div>
      </Eidtor>
    )
  }
}

const WrappedEdit = Form.create({
  onValuesChange (props, changedValues, allValues) {
    console.log(props, changedValues, allValues)
  }
})(Edit)

export default WrappedEdit
