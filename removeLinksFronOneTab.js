// 复制到控制台

// 首页类
const matchUrls = [
  'https://duckduckgo.com/',
  'https://www.bing.com/',
  'https://weread.qq.com/',
  'https://www.zhihu.com/follow',
  'https://www.zhihu.com/collections/mine',
  'https://www.google.com/',
  'https://twitter.com/home',
  'https://developer.mozilla.org/zh-CN/',
  'https://weibo.com/',
  'https://stackoverflow.com/',
  'https://github.com/',
  'https://codepen.io/your-work',
  'https://codepen.io/',
  'https://www.v2ex.com/',
  'https://www.nowcoder.com/',
  'https://www.youtube.com/',
  'https://www.zhihu.com/org/niu-ke-wang-53',
  'https://www.bilibili.com/',
];

// 文档类、工具类、全部清除
const containUrls = [
  'https://www.processon.com',
  'https://keep.google.com/',
  'https://fanyi.sogou.com/',
  'https://www.amazon.com/',
  'https://www.baidu.com/',
  'https://item.jd.com/',
  'https://www.jd.com/',
  'https://post.smzdm.com/',
  'https://www.smzdm.com/',
  'https://detail.tmall.com/',
  'https://account.aliyun.com/',
  'https://ecs-workbench.aliyun.com',
  'https://bulma.io/',
  'https://tailwindcss.com/',
  'chrome://bookmarks/',
  'https://leetcode-cn.com/',
  'https://papaly.com/',
  'https://vue3js.cn',
  'http://germ.run/',
  'https://www.freecodecamp.org/',
  'https://fastapi.tiangolo.com/',
  'https://www.deepl.com/',
  'https://translate.google.com/',
  'https://vuejs.org',
  'https://www.notion.so/',
  'https://docs.google.com/',
  'https://www.evernote.com/',
  'https://mail.google.com/mail/u/0/',
];

const searchElementMatched = urls => {
  const matchedElement = [];
  urls.forEach(url => {
    const linkElements = document.querySelectorAll(`[href="${url}"]`);
    console.log(`完全匹配${url}的链接有${linkElements.length}个`);
    matchedElement.push(...linkElements);
  });
  console.log(matchedElement.length);
  return matchedElement;
};
const searchElementContained = urls => {
  const containedElement = [];
  urls.forEach(url => {
    const linkElements = document.querySelectorAll(`[href*="${url}"]`);
    console.log(`包含${url}的链接有${linkElements.length}个`);
    containedElement.push(...linkElements);
  });
  console.log(containedElement.length);
  return containedElement;
};

const deleteAll = elements => {
  elements.forEach(e => {
    e.nextElementSibling.dispatchEvent(new Event('mousedown'));
  });
  console.log('清除完毕');
};

const main = (matchUrls, containUrls) => {
  const matchedElement = searchElementMatched(matchUrls);
  const containedElement = searchElementContained(containUrls);

  const allElements = [...matchedElement, ...containedElement];
  console.log(`共计${allElements.length}`);
  deleteAll(allElements);
};
main(matchUrls, containUrls);
