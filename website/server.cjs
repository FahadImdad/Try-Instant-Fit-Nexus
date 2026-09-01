const http=require('http');
const fs=require('fs');
const path=require('path');
const root=__dirname;
http.createServer((req,res)=>{
  const raw=decodeURIComponent(req.url.split('?')[0]);
  let file=path.join(root,raw==='/'?'index.html':raw);
  fs.readFile(file,(err,data)=>{
    if(err&&raw.endsWith('.html')) file=path.join(root,raw.includes('product')?'product.html':'shop.html');
    fs.readFile(file,(err2,data2)=>{if(err2){res.writeHead(404);return res.end('Not found');}res.writeHead(200);res.end(data2);});
  });
}).listen(4173,'127.0.0.1',()=>console.log('http://localhost:4173'));
