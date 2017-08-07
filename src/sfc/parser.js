/* @flow */

import deindent from 'de-indent'
import { parseHTML } from 'compiler/parser/html-parser'
import { makeMap } from 'shared/util'

// 换行正则表达式
const splitRE = /\r?\n/g

const replaceRE = /./g
// 判断是否是script,style,template标签
const isSpecialTag = makeMap('script,style,template', true)

//预先定义对象类型Attribute
type Attribute = {
  name: string,
  value: string
};

/**
 * Parse a single-file component (*.vue) file into an SFC Descriptor Object.
 * 将vue文件
 */
export function parseComponent (
  content: string,
  options?: Object = {}
  // 自定义类型SFCDescriptor，在flow/compiler中
 ): SFCDescriptor {
  const sfc: SFCDescriptor = {
    template: null,
    script: null,
    styles: [],
    customBlocks: []
  }
  let depth = 0
  // 当前处理的代码块
  let currentBlock: ?(SFCBlock | SFCCustomBlock) = null

  function start (
    tag: string,
    attrs: Array<Attribute>,
    unary: boolean,
    start: number,
    end: number
  ) {
    if (depth === 0) {
      currentBlock = {
        type: tag,
        content: '',
        start: end,
        // 将[{"name":'..',"value":".."}...] 换成 {name : value,...}形式
        attrs: attrs.reduce((cumulated, { name, value }) => {
          cumulated[name] = value || true
          return cumulated
        }, Object.create(null))
      }
      if (isSpecialTag(tag)) {
        checkAttrs(currentBlock, attrs)
        // 判断是否是style标签 （一个sfc中可以有多个style）
        if (tag === 'style') {
          sfc.styles.push(currentBlock)
        } else {
          sfc[tag] = currentBlock
        }
      } else { // custom blocks
        // 不是特殊字符表亲，按自定义标签处理
        sfc.customBlocks.push(currentBlock)
      }
    }
    if (!unary) {
      depth++
    }
  }

  function checkAttrs (block: SFCBlock, attrs: Array<Attribute>) {
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i]
      // css预处理语法设置
      if (attr.name === 'lang') {
        block.lang = attr.value
      }
      if (attr.name === 'scoped') {
        block.scoped = true
      }
      if (attr.name === 'module') {
        block.module = attr.value || true
      }
      if (attr.name === 'src') {
        block.src = attr.value
      }
    }
  }

  function end (tag: string, start: number, end: number) {
    if (depth === 1 && currentBlock) {
      currentBlock.end = start
      let text = deindent(content.slice(currentBlock.start, currentBlock.end))
      // pad content so that linters and pre-processors can output correct
      // line numbers in errors and warnings
      if (currentBlock.type !== 'template' && options.pad) {
        text = padContent(currentBlock, options.pad) + text
      }
      currentBlock.content = text
      currentBlock = null
    }
    depth--
  }

  function padContent (block: SFCBlock | SFCCustomBlock, pad: true | "line" | "space") {
    if (pad === 'space') {
      return content.slice(0, block.start).replace(replaceRE, ' ')
    } else {
      const offset = content.slice(0, block.start).split(splitRE).length
      const padChar = block.type === 'script' && !block.lang
        ? '//\n'
        : '\n'
      return Array(offset).join(padChar)
    }
  }

  parseHTML(content, {
    start,
    end
  })

  return sfc
}
