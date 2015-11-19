项目说明：

1、项目安装( 需要先安装一下nodejs )
  
  npm install -g gulp
  
  npm install   

  [ 安装后根目录下会出现一个node_modules，这个目录不需要提交到svn版本库，请确保把这个目录加入到 svn ignore list,  ]

2、启动文件监听 
  
  gulp watch

好，这样就可以开发啦 ！！！

目录结构：

  --html:
    -- header-footer.html 公用头和底

项目其它页面建立在html下对应文件夹内

  --css:
    -- lib  存放通用的样式
    -- pages 存放页面级样式 [ 大家在这里面建立自己的样式文件即可, 添加文件后需要到main.css 里面去import一下 ]
    -- main.min.css　最后得到的打包文件， 在页面里面引入这一个样式文件即可

  --images
    只需要在pages下建立自己对应的文件夹存放图片

  --js
    -- lib 存放我们用到的第三方插件
    -- pages 存放页面级的js文件， 文件名与页面名称相同即可

  --source 
    存放项目中使用的资源文件，比如声音文件，psd[ 制作css sprite的源文件 ]
