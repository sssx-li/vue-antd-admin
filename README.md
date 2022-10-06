# vue-admin-template

## 项目安装

```
pnpm install
```

### 开发环境

```
pnpm run dev
```

### mock 环境

```
pnpm run dev:lock
```

### 生产打包

```
pnpm run build
```

### 格式化

```
pnpm run lint
```

### antdIcon、svg 及 iconify 图标的使用使用

### antdIcon

```
  1. 引入图标(该项目在registers/registerIcon.ts中全局引入并注册)
  import { LoginOutlined } from '@ant-design/icons-vue';

  2. 使用
    <!-- 直接使用 -->
    <LoginOutlined :style="{color: '#f60'}" />

    <!-- 通过vue自带component组件使用 -->
    <component :is="`LoginOutlined`" />
```

#### svg

```
  1. 下载svg文件，并存放在src/assets/svgs目录下(该项目指定在此目录，可以在vue.config.js文件中进行修改)

  2. 使用: icon-custom-{{svgName}}
    <!-- icon 及 custom (前缀名)均可在vue.config.js进行修改，根据个人喜好设置 -->
    <icon-custom-logo />
```

#### iconify([访问地址](https://icon-sets.iconify.design/))

```
  项目中引入的图集webpack会自动进行安装，可直接使用

  1. 在官方网站找到想用的图标

  2. 复制图集及icon名, 例： clarity:accessibility-1-solid; 图集为clarity，图标名为accessibility-1-solid
  <icon-clarity-accessibility-1-solid/>
```

#### pageContent 组件 及 usePageSearch 使用实例

1. table 所需配置数据

```js
// ./config/config.content目录
// 1. 准备好组件所需配置信息, 并传入pageContent
import { ContentApis } from '@/service/api';
import { ITableConfig, IColumnsConfig } from '@/baseUI/syTable/types';

// contentTableConfig 具体参数说明详见接口定义
const contentTableConfig: ITableConfig<IColumnsConfig> = {
  url: ContentApis.DASHBOARD,
  columns: [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      slotName: 'sex',
      align: 'center'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      slotName: 'createTime',
      align: 'center',
      width: '170px'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      slotName: 'updateTime',
      align: 'center',
      width: '170px'
    },
    {
      title: '操作',
      dataIndex: 'handler',
      key: 'handler',
      slotName: 'handler',
      align: 'center'
    }
  ],
  showFooter: true,
  filterSlotNameList: ['createTime', 'updateTime']
};
```

2. js

```js
// 引入pageContent组件
import { defineComponent, reactive } from 'vue';

import PageContent from '@/components/pageContent/index.vue';
import { SyDrawer } from '@/baseUI';

import { usePageSearch } from '@/hooks/usePageSearch';

import contentTableConfig from './config/config.content';

const wrapperCol = { style: { 'margin-bottom': '10px' } };
export default defineComponent({
  name: 'homeView',
  components: {
    PageContent,
    SyDrawer
  },
  setup() {
    // --------------搜索表单---------------
    const formState = reactive({
      name: '',
      sex: ''
    });
    const { pageContentRef, handleQueryChange } = usePageSearch();
    // 搜索表单
    const handleFinish = () => {
      handleQueryChange(formState, true);
    };

    // --------------弹窗---------------
    const dialogParams = reactive({
      visiable: false,
      title: '编辑'
    });
    const dialogForm = reactive({
      name: '',
      id: ''
    });
    const dialogConfirm = async () => {
      await pageContentRef.value?.handleEdit(dialogForm);
      pageContentRef.value?.refresh();

      dialogParams.visiable = false;
    };
    const handleClickEdit = (row: any) => {
      const { name, id } = Object.assign({}, row);
      dialogForm.name = name;
      dialogForm.id = id;

      dialogParams.visiable = true;
      dialogParams.title = '编辑';
    };

    return {
      dialogParams,
      pageContentRef,
      wrapperCol,
      formState,
      contentTableConfig,
      dialogForm,
      handleQueryChange,
      handleFinish,
      dialogConfirm,
      handleClickEdit
    };
  }
});
```

3. html 部分代码

```html
<div class="home-container page-container">
  <a-form
    layout="inline"
    :model="formState"
    @finish="handleFinish"
    :wrapperCol="wrapperCol"
  >
    <a-form-item>
      <a-input
        style="width: 220px"
        v-model:value.trim="formState.name"
        placeholder="请输入姓名"
      />
    </a-form-item>
    <a-form-item>
      <a-select
        ref="select"
        v-model:value="formState.sex"
        style="width: 220px"
        allowClear
        @change="handleFinish"
      >
        <a-select-option :value="0">男</a-select-option>
        <a-select-option :value="1">女</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">
        <template #icon><SearchOutlined /></template>
        筛选
      </a-button>
    </a-form-item>
  </a-form>
  <PageContent
    :contentTableConfig="contentTableConfig"
    ref="pageContentRef"
    @edit="handleClickEdit"
  >
    <template #body-sex="scope">
      <span>{{ scope.row.sex === 1 ? '女' : '男' }}</span>
    </template>
  </PageContent>
  <SyDrawer
    v-model:visible="dialogParams.visiable"
    drawer-width="400px"
    :title="dialogParams.title"
    @onSubmit="dialogConfirm"
  >
    <a-form layout="inline" :model="dialogForm" :wrapperCol="wrapperCol">
      <a-form-item label="姓名">
        <a-input
          v-model:value.trim="dialogForm.name"
          placeholder="请输入姓名"
        />
      </a-form-item>
    </a-form>
  </SyDrawer>
  <br />
</div>
```

#### syForm 配置示例(具体使用请查看 components/drawerForm)

```js
import { IForm } from '@/baseUI/epsForm/types';
import { credTypes, followStatus, sexList } from './index';

const formConfig: IForm = {
  name: 'login',
  wrapperCol: {
    style: { 'margin-bottom': '10px', width: '300px' }
  },
  labelCol: { style: { width: '120px' } },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '姓名',
      placeholder: '请输入姓名',
      rules: [{ required: true, message: '请输入姓名！' }]
    },
    {
      field: 'gender',
      type: 'select',
      label: '性别',
      defaultValue: 1,
      placeholder: '请选择性别',
      rules: [{ required: true, message: '请选择性别！' }],
      options: sexList
    },
    {
      field: 'age',
      type: 'input',
      label: '年龄',
      placeholder: '请输入年龄',
      rules: [{ required: true, message: '请输入年龄！' }]
    }
  ]
};

export default formConfig;
```
