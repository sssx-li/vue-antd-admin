import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

import { Modal } from 'ant-design-vue';
import { createVNode } from 'vue';

type ButtonType =
  | 'link'
  | 'default'
  | 'primary'
  | 'ghost'
  | 'dashed'
  | 'text'
  | 'danger';

interface IModalConfirm {
  title?: string;
  content?: string;
  okText?: string;
  cancelText?: string;
  okType?: ButtonType;
}

export function useModalConfirm() {
  const modalConfirm = (
    params: IModalConfirm = {
      title: '提示',
      content: '提示信息',
      okText: '确认',
      cancelText: '取消',
      okType: 'default'
    }
  ) => {
    return new Promise((resolve, reject) => {
      const { title, content, okText, cancelText, okType } = params;
      Modal.confirm({
        title,
        icon: createVNode(ExclamationCircleOutlined),
        content,
        okText,
        cancelText,
        okType,
        onOk: () => {
          resolve(true);
        },
        onCancel: () => {
          reject(false);
        }
      });
    });
  };
  return modalConfirm;
}
