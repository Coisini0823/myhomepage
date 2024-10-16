import request from './index'

const getuser = (data) => {
  request.post('/getuser', data).then(res => {
    localStorage.setItem('usermessage', JSON.stringify(res))
  })
}

const adduser = (newmessage) => {
  const data = newmessage
  request.post('/adduser', data).then(res => {
    localStorage.setItem('register', JSON.stringify(res))
  })
}

const getnote = (data) => request.get('/getnote', { params: data })

const addnote = (newnote) => {
  const data = newnote
  request.post('/addnote', data)
}

const rewritenote = (rewnote) => {
  const data = rewnote
  request.post('/rewritenote', data)
}

const deletenote = (delnote) => {
  const data = delnote
  request.post('/deletenote', data)
}

const getmessage = (data) => request.get('/getmessage', { params: data })

const addmessage = (newmessage) => {
  const data = newmessage
  request.post('/addmessage', data)
}

const replymessage = (rewmessage) => {
  const data = rewmessage
  request.post('/replymessage', data)
}

export { getuser, adduser, getnote, addnote, rewritenote, deletenote, getmessage, addmessage, replymessage }
