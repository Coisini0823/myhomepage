const mysql = require('mysql')
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())

const bodyParser = require('body-parser')
const multiparty = require('connect-multiparty')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(multiparty())
app.use(bodyParser.json())

const db = mysql.createPool({
  host: '0.0.0.0',
  user: 'root',
  password: 'z20050584658',
  database: 'homepage'
})

// 验证登录信息
app.post('/getuser', (req, res) => {
  console.log(req.body)
  db.query('SELECT * FROM user WHERE username=?', req.body.name, (err, results) => {
    if (err) {
      res.send(err.message)
      console.log(1)
    } else if (results.length > 0) {
      if (results[0].userpsw === req.body.psw) {
        console.log(2)
        const payload = {
          name: results[0].username,
          telephone: results[0].userphone
        }
        const secret = 'successlogin'
        const token = jwt.sign(payload, secret, {
          expiresIn: '4h'
        })
        res.json({
          success: true,
          message: '用户验证成功',
          token: token
        })
      } else {
        console.log(3)
        const payload = {
          erroe: '密码错误'
        }
        const secret = 'falselogin'
        const token = jwt.sign(payload, secret, {
          expiresIn: '4h'
        })
        res.json({
          success: false,
          message: '用户验证失败',
          token: token
        })
      }
    } else {
      console.log(4)
      const payload = {
        erroe: '用户不存在'
      }
      const secret = 'falselogin'
      const token = jwt.sign(payload, secret, {
        expiresIn: '4h'
      })
      res.json({
        success: false,
        message: '用户验证失败',
        token: token
      })
    }
  })
})

// 添加用户名单
app.post('/adduser', (req, res) => {
  console.log(req.body)
  db.query('SELECT * FROM user WHERE username=?', req.body.name, (err, results) => {
    if (err) {
      res.send('err')
    } else if (results.length === 0) {
      // if (results[0].username === req.body.name) {
      //     res.send('fail')
      // }
      // else {
      // }
      db.query('INSERT INTO user(username, userpsw, userphone) values(?, ?, ?)', [req.body.name, req.body.psw, req.body.phone], (err, results) => {
        if (err) {
          console.log(err)
          res.send('err else')
        } else res.send('success')
      })
    } else {
      res.send('fail')
    }
  })
})

// 获取笔记列表
app.get('/getnote', (req, res) => {
  db.query('SELECT * FROM note', (err, results) => {
    if (err) {
      res.send(err.message)
    } else {
      res.send(results)
    }
  })
  // console.log('数据库操作')
})
// 添加笔记列表
app.post('/addnote', (req, res) => {
  const time = new Date()
  const year = time.getFullYear()
  const month = time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
  const day = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()
  const notetime = `${year}-${month}-${day}`
  db.query('INSERT INTO note(notetitle, notetime, notecont) values(?, ?, ?)', [req.body.notetitle, notetime, req.body.notecont], (err, results) => {
    if (err) {
      res.send(err.message)
    } else res.send('success')
  })
})
// 修改笔记
app.post('/rewritenote', (req, res) => {
  const time = new Date()
  const year = time.getFullYear()
  const month = time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
  const day = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()
  const notetime = `${year}-${month}-${day}`
  db.query('UPDATE note SET notetitle=?, notetime=?, notecont=? WHERE idnote=?', [req.body.notetitle, notetime, req.body.notecont, req.body.idnote], (err, results) => {
    if (err) {
      res.send(err.message)
    } else res.send('success')
  })
})
// 删除笔记
app.post('/deletenote', (req, res) => {
  db.query('DELETE FROM note WHERE idnote=?', req.body.idnote, (err, results) => {
    if (err) {
      res.send(err.message)
    } else res.send('success')
  })
})

// 获取留言列表
app.get('/getmessage', (req, res) => {
  db.query('SELECT * FROM message', (err, results) => {
    if (err) {
      res.send(err.message)
      // return err.message
    } else {
      res.send(results)
      // return results
    }
  })
})
// 添加留言
app.post('/addmessage', (req, res) => {
  const time = new Date()
  const year = time.getFullYear()
  const month = time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
  const day = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()
  const messagetime = `${year}-${month}-${day}`
  db.query('INSERT INTO message(messagename, messagephone, messagetime, messagecont, isreply) values(?, ?, ?, ?, ?)', [req.body.messagename, req.body.messagephone, messagetime, req.body.messagecont, 0], (err, results) => {
    if (err) {
      res.send(err.message)
    } else res.send('success')
  })
})
// 回复留言
app.post('/replymessage', (req, res) => {
  db.query('UPDATE message SET isreply=?, reply=? WHERE idmessage=?', [1, req.body.reply, req.body.idmessage], (err, results) => {
    if (err) {
      res.send(err.message)
    } else res.send('success')
  })
})

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000')
})
