import { default as React } from 'react'
import { default as css } from 'minify-css-string'
import { default as Prefixer } from 'inline-style-prefixer'
const prefixer = new Prefixer()

const inCss = `
  @-webkit-keyframes react-fade-in {
    0%   { opacity: 0; }
    50%  { opacity: 0; }
    100% { opacity: 1; }
  }
  @-moz-keyframes react-fade-in {
    0%   { opacity: 0; }
    50%  { opacity: 0; }
    100% { opacity: 1; }
  }
  @-ms-keyframes react-fade-in {
    0%   { opacity: 0; }
    50%  { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes react-fade-in {
    0%   { opacity: 0; }
    50%  { opacity: 0; }
    100% { opacity: 1; }
  }
`

const outCss = `
  @-webkit-keyframes react-fade-out {
    0%   { opacity: 1; }
    50%  { opacity: 1; }
    100% { opacity: 0; }
  }
  @-moz-keyframes react-fade-out {
    0%   { opacity: 1; }
    50%  { opacity: 1; }
    100% { opacity: 0; }
  }
  @-ms-keyframes react-fade-out {
    0%   { opacity: 1; }
    50%  { opacity: 1; }
    100% { opacity: 0; }
  }
  @keyframes react-fade-out {
    0%   { opacity: 1; }
    50%  { opacity: 1; }
    100% { opacity: 0; }
  }
`

const Fade = ({ children, duration, out, ...props }) =>
  <span {...props}>
    <style children={css(out ? outCss : inCss)} />
    <div
      style={prefixer.prefix({
        animationDuration: `${duration}s`,
        animationIterationCount: 1,
        animationName: `react-fade-${(out ? 'out' : 'in')}`,
        animationTimingFunction: out ? 'ease-out' : 'ease-in'
      })}
    >
      {children}
    </div>
  </span>



export default Fade