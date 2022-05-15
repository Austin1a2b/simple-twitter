module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/simple-twitter/'        //這邊是 repo 專案名稱
    : '/'
}
