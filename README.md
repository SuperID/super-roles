# super-roles
基于Node.js的权限管理组件


## 原理

定义角色的访问权限，其中：

+ 用户特定配置优于角色配置
+ 访问列表的两种模式：
  + 普通模式：没有明确指定权限时默认全部允许（默认）
  + 严格模式：没有明确指定权限时默认全部禁止
+ 冲突：禁止优先于允许


## 使用方法

定义角色：

```javascript
var roles = require('super-roles').create({
  strict: true
});

// 定义角色权限
roles.role('admin').define({
  'list user': true,    // 权限，true表示允许，false表示禁止
  'edit user': true,
  'delete user': true
});
// 继承并定义角色
roles.role('user').extend('admin').define({
  'list user': true,
  'edit user': false,
  'delete user': false
});
```

判断用户角色权限：

```javascript
// 创建一个用户角色实例
var user = roles.user().role('admin').define({
  'add user': true
});

// 检查角色是否有权限
if (user.can('list user')) {
  console.log('can list user');
}
// 检查角色是否没有权限
if (user.cant('add user')) {
  console.log('cannot list user');
}
// 检查用户是否为指定角色
if (user.is('admin')) {
  console.log('is admin');
}
```

connect中间件，用于简单控制某个URL的访问权限：

```javascript
app.use(roles.middleware({

  // 收到请求时，创建用户角色实例
  request: function (req, res, callback) {
    // req, res 为当前请求的request和response对象
    // 根据这些信息创建一个用户角色实例，通过callback返回
    // 此对象会保存到req.userRole
    callback(null, roles.user().role('admin').define({
      'POST /user': false,  // 定义访问页面： [请求方法] [URL]
      'GET /user': true
    }));
  },

  // 当角色被允许访问当前页面时执行，可选
  allow: function (req, res, next) {
    next();
  },

  // 当角色不被允许访问当前页面时执行，可选
  forbid: function (req, res, next) {
    next('Forbidden');
  }

}));
```





## License

```
The MIT License (MIT)

Copyright (c) 2015 SuperID | 一切只为简单登录

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
