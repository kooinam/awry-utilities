import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Upload, Button, Icon } from 'antd';

import { getBaseUrl, getHeadersSetter } from '../utils/NetworkManager';
import { formatImageUrl } from '../utils/UIManager';

class CustomReactQuill extends React.Component {
  constructor(props) {
    super(props)

    this.state = {};

    if (document) {
      this.quill = require('react-quill');
      const imageResize = require('quill-image-resize-module');
      this.quill.Quill.register('modules/ImageResize', imageResize.default);
    }

    this.imageHandler = this.imageHandler.bind(this);
    this.attachQuillRefs = this.attachQuillRefs.bind(this);
  }

  componentDidMount () {
    this.attachQuillRefs()
  }

  componentDidUpdate () {
    this.attachQuillRefs()
  }

  attachQuillRefs = () => {
    // Ensure React-Quill reference is available:
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    // Skip if Quill reference is defined:
    if (this.quillRef != null) return;

    const quillRef = this.reactQuillRef.getEditor();
    if (quillRef != null) this.quillRef = quillRef;
  }

  imageHandler = (image) => {
    document.getElementById('attachment').click();
  }

  render() {
    const ReactQuill = this.quill;

    const modules = {
      ImageResize: {
          // See optional "config" below
      },
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          'image': this.imageHandler
        },
      }
    }

    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image',
    ]

    const uploadProps = {
      name: 'file',
      action: `${getBaseUrl(this.props.axiosName)}/attachments`,
      headers: getHeadersSetter(this.props.axiosName)(),
      accept: 'image/*',
      onChange: (info) => {
        if (info.file.status === 'done') {
          // this.setState({
          //   attachmentUrl: info.file.response.attachment.url
          // })
          var range = this.quillRef.getSelection();
          let position = range ? range.index : 0;
          this.quillRef.clipboard.dangerouslyPasteHTML(position, `<img src='${formatImageUrl(info.file.response.attachment.url)}' />`);
        }
      }
    };

    return (
      <div>
        <ReactQuill
          ref={
            (el) => {
              this.reactQuillRef = el;
            }
          }
          defaultValue={this.props.defaultValue}
          onChange={this.props.onChange}
          theme="snow"
          modules={modules}
          formates={formats}
        />
        <Upload { ...uploadProps } style={{display: 'none'}}>
          <Button id="attachment">
            <Icon type="upload" />
          </Button>
        </Upload>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(CustomReactQuill);
