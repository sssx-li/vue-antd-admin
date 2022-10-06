import { User } from '@/service/api';
import { ILoginResult, IMenuData } from '@/service/api/user/types';
const loginData: ILoginResult = {
  id: 1,
  username: 'sy',
  token:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzeSIsImlhdCI6MTY2NTAyOTU0MiwiZXhwIjoxNjY1MTE1OTQyfQ.OQsDsVnLk2Un31-6gJUr4p4rMkjtdleH95CZatlvybZqgq5CToN-L8Uih4FGCn7KjQSkMQIMY5ViGBFz3UrTuZR9P7a2blV5rKQRjVxrSuHbgF8ULOnzmEn25mA_usU5jynNmd4j09n1oO59oSTifl8-2WIykjtZiYnJnd4Q_z0'
};

const useMenuData: IMenuData[] = [
  {
    id: 1,
    path: '/main/about'
  },
  {
    id: 2,
    path: '/main/about/first'
  },
  {
    id: 3,
    path: '/main/about/secound'
  },
  {
    id: 4,
    path: '/main/config'
  }
];

const loginDataMoke = {
  [`onPost::${User.LOGIN}`]: () => {
    return {
      message: '成功',
      code: 0,
      data: {
        ...loginData
      }
    };
  },
  [`onGet::${User.USEMENU}`]: () => {
    return {
      message: '成功',
      code: 0,
      data: useMenuData
    };
  },
  [`onGet::${User.USER}`]: () => {
    return {
      message: '成功',
      code: 0,
      data: { username: 'sy', avatar: '' }
    };
  }
};

export default loginDataMoke;
