const app = getApp()

Page({
  data: {

  },

  doLogin: function(e) {
      var me = this;
      var formObject = e.detail.value;
      var username = formObject.username;
      var password = formObject.password;

      //判断用户名和密码是否为空
      if(username.length == 0||password.length == 0){
        wx.showToast({
          title: '用户名和密码不能为空',
          icon: 'none',
          duration: 3000
        })
      }else{
        var serverUrl = app.serverUrl;
        wx.showLoading({
          title: '请等待..',
        });
        wx.request({
          url: serverUrl+'/login',
          method: 'POST',
          data: {
            username: username,
            password: password
          },
          header: {
            'content-type': 'application/json'//默认值
          },
          success: function(res){
            console.log(res.data);
            wx.hideLoading();
            if(res.data.status == 200){
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000
              });
              //app.userInfo = res.data.data;
              //fixme 修改原有的全局对象为本地缓存
              console.log(res.data);
              app.setGlobalUserInfo(res.data.data);
              var redirectUrl = me.redirectUrl
              if (redirectUrl != null && redirectUrl != undefined && redirectUrl != ''){
                wx.redirectTo({
                  url: redirectUrl,
                })
              }else{
                wx.redirectTo({
                  url: '../mine/mine',
                })
              }
            }else if(res.data.status == 500){
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 3000
              })
            }
          }
        })
      }
  },

  goRegistPage: function() {
    wx.navigateTo({
      url: '../userRegist/regist',
    })
  }
})