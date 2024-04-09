import React from "react"
import Header from "./components/Header";
import { useRoutes } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import SearchResult from "./components/SearchResult";
import Browser from "./components/Browser";
import Admin from "./components/Admin";
import Manage from "./components/Admin/Manage";
import Upload from "./components/Admin/Upload";
import SHeader from "./components/Admin/Header";
import Success from "./components/Admin/Success";
import Batch from "./components/Admin/Batch";
import Review from "./components/Admin/Review";
import Pay from "./components/Admin/Pay";
import { Navigate } from "react-router-dom";
import User from "./components/Admin/User";
import axios from "axios";
import "./App.scss";
import Cookies from "js-cookie";

function App() {
  const [isLogin, setIsLogin] = React.useState(getCookie('isLogin'));

  const gotoFirstPage = () => {
    return <Navigate to='/firstpage' />
  }
  const routes = [
    {
      path: '/',
      element: <Navigate to='/firstpage' />
    },
    {
      path: '/firstpage',
      element: <FirstPage />
    },
    {
      path: '/result',
      element: <SearchResult searchData={{}} />
    },
    {
      path: '/browser',
      element: <Browser />
    },
    {
      path: '/admin',
      element: isLogin ? <Admin /> : gotoFirstPage(),
      children: [
        {
          path: '',
          element: isLogin ? <Navigate to='manage' /> : gotoFirstPage(),
        },
        {
          path: 'manage',
          element: isLogin ? <Manage /> : gotoFirstPage()
        },
        {
          path: 'upload',
          element: isLogin ?
            <>
              <div className='head'>
                <SHeader title={'upload'} />
              </div>
              <div className='space'>
                <Upload />
              </div>
            </> : gotoFirstPage()
        },
        {
          path: 'batch',
          element:
            isLogin ?
              <>
                <div className='head'>
                  <SHeader title={'batch'} />
                </div>
                <div className='space'>
                  <div className="batch">
                    <Batch />
                  </div>
                </div>
              </>
              : gotoFirstPage()
        },
        {
          path: 'success',
          element:
            isLogin ?
              <>
                <div className='head'>
                  <SHeader title={'success'} />
                </div>
                <div className='space'>
                  <Success />
                </div>
              </>
              : gotoFirstPage()
        },
        {
          path: 'review',
          element:
            <Review />
        },
        {
          path: 'user',
          element:
            isLogin ? <User /> : gotoFirstPage()
        },
        {
          path: 'settings',
          element: <Navigate to='/firstpage' />
        },
        {
          path: 'help',
          element: <Navigate to='/firstpage' />
        },
        {
          path: 'pay',
          element: <Pay />
        },
      ]
    },
    {
      path: '*',
      element: <Navigate to='/firstpage' />
    }
  ]
  function getCookie(key) {
    if (document.cookie.length > 0) {
      // 字符串按照分号分割，得到数组
      let arr = document.cookie.split(";");
      for (let i = 0; i < arr.length; i++) {
        // trim:删除空格，按照等号分割，得到[键，名]的数组
        let t = arr[i].trim().split("=");
        // 判断键是否相等，返回相应的值
        if (t[0] === key) {
          return t[1];
        }
      }
    }
    return "";
  }
  axios.defaults.headers.common['UserId'] = `${getCookie('UserId')}`;
  React.useEffect(() => {
    if (isLogin === 'true') {
      setIsLogin(true);
    } else {
      Cookies.set('UserId', 1);
      setIsLogin(false);
    }
    if (!getCookie('AnswerLanguage')) {
      Cookies.set('AnswerLanguage', 'Chinese');
    }
    axios.get('https://www.izeqi.top/article/translate/switch').then((res) => {
      if (res.data.data === true) {

      } else {
        axios.get('https://www.izeqi.top/article/translate/switch')
      }
    })
  }, [])

  const element = useRoutes(routes)
  return (
    <>
      <div className="app">
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />
        {element}
      </div>
    </>
  );
}
export default App;  