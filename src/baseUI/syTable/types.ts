type fixedType = 'right' | 'left' | boolean;
interface ICustomRender {
  (x: object): any;
}

export interface IColumnsConfig {
  title?: string; // 列头显示文字
  dataIndex?: string; // 列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法
  key?: string; // Vue 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
  align?: string; // 设置列内容的对齐方式
  slotName?: string; // 自定义slot name
  ellipsis?: boolean; // 超过宽度将自动省略
  fixed?: fixedType; // 列是否固定
  width?: string | number;
  slots?: object; // antd cloumns属性;具体请查看api文档
  customRender?: ICustomRender | string;
}

interface IScroll {
  x?: number;
  y?: number;
}
export interface ITableConfig<T = any> {
  url: string; // 接口url
  columns: T[]; // 表格配置
  showFooter?: boolean; // 是否显示底部分页组件
  filterSlotNameList?: string[]; // 需要过滤的slotName
  scroll?: IScroll; // 使用fixed时触发滚动的距离
}
