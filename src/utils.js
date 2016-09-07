import {camel, cap} from 'naming-transform';

export function capCamelCase(str) {
  return cap(camel(str));
}

export {
  camel as camelCase,
  cap as capCase,
  kebab as kebabCase,
  snake as snakeCase,
  default as namingTransform
} from 'naming-transform';

/**
 * 转义正则的字符串
 * @param  {String} str
 * @return {String}
 */
export function escapeRegexp(str) {
  return str.replace(/[-.*+?^${}()|[\]\/\\]/g, '\\$&');
}


/**
 * 加载符合某一正则表达式下的所有文件
 * @param  {Object} requireContext require.context 返回的对象
 *
 * 参考：http://webpack.github.io/docs/context.html
 */
export function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}


/**
 * 与 requireAll 类似，只是这个支持参数，即 require 的对象可以是一个函数
 * @param  {Object} requireContext require.context 返回的对象
 */
export function requireAllWithArgs(requireContext, ...args) {
  return requireContext.keys().map(key => {
    let fn = requireContext(key);
    return typeof fn === 'function' ? fn(...args) : fn;
  });
}


/**
 * angular 模板加载器
 * @param  {Object} requireContext require.context 返回的对象
 * @return {Function}              返回一个函数，此函数直接接受一个模板名为参数，即可返回此模板的内容
 */
export function tplRequirer(requireContext) {
  let keys = requireContext.keys();
  return function (tpl) {
    let re = new RegExp(escapeRegexp((tpl[0] !== '/' ? '/' : '') + tpl + '-tpl.html') + '$')
    for (let i = 0; i < keys.length; i++) {
      if (re.test(keys[i])) return requireContext(keys[i])
    }
    throw new Error('Can not find template ' + tpl)
  }
}


/**
 * html 转义
 * @param  {String} str
 * @return {String}
 */
export function escapeHTML (str) {
   let div = document.createElement('div');
   let text = document.createTextNode(str);
   div.appendChild(text);
   return div.innerHTML;
}

/**
 * 下载资源
 */
export function downloadResource(name, url){
  let isSuport = /.(pdf|html|css|js|gif|jpg|jpeg|png)$/i.test(name);
  window.open(url, isSuport ? "" : "download");
}

/**
 * 上传资源
 */
export function uploadResource(uploadPath, file) {
  let url = uploadPath;
  let fd, xhr;
  fd = new FormData();
  xhr = new XMLHttpRequest();

  fd.append('file', file);

  xhr.open('POST', url, true);
  xhr.onload = function() {
    if (this.status === 200) {
      var data = JSON.parse(this.response);
    }
  };
  xhr.send(fd);
}

/**
 * 生成随机字符串
 */
export function randomString(length){
    let s = "";
    while(s.length<length && length>0){
        let r = Math.random();
        s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
    }
    return s;
}

/**
 * 处理语音文本
 */
export function formatReadableText(str) {
  return str
    // 去除字符串中html标签
    .replace(/(<([^>]+)>)/ig, '')

    .replace(/&nbsp;/g, '')

    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')

    // SBC => DBC
    .replace(/[\u3000\uff01-\uff5f]/g, function(code) {
      return code == "\u3000" ? " " : String.fromCharCode(code.charCodeAt(0) - 0xfee0);
    })

    .replace(/[^.,?!'"\s\w]/ig, '')
}

/**
 * [isJson description]
 */
export function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}
