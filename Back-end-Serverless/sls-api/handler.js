'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const { v4: uuidv4 } = require('uuid');
const { uuid } = require('uuidv4');
//const {"v4": uuidv4} = require('uuid');
//const { uuid } = require('uuidv4');
//const uuid = require("uuid/v4");
const postsTable = process.env.POSTS_TABLE;


//Create response
function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

function sortByDate(a,b){
  if(a.createdAt > b.createdAt){
    return -1;
  }else return 1;
}

//Create post
module.exports.createPost = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  // if(!reqBody.nombreOrganizador  || !reqBody.cantidadPersonas || reqBody.cantidadPersonas.trim() === ''){
  //   return callback(null,response(400,{error:'Algunos de los parametros no vienen completos'}))
  // }

  const post = {
    id: uuid(),
    fechaRegistro: new Date().toISOString(),
    userId: 1,
    nombreOrganizador: reqBody.nombreOrganizador,
    cantidadPersonas: reqBody.cantidadPersonas,
    nombreDestino: reqBody.nombreDestino,
    fechaInicial: reqBody.fechaInicial,
    descripcion: reqBody.descripcion
  };

  return db
    .put({
      TableName: postsTable,
      Item: post
    })
    .promise()
    .then(() => {
      callback(null, response(201, post));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};


//Get all posts
module.exports.getAllPosts = (event,context,callback)=>{
  return db.scan({
    TableName: postsTable
  }).promise().then(res => {
    callback(null,response(200, res.Items.sort((sortByDate))))
  }).catch(err => callback(null, response(err.statusCode, err)))
}

// Get number of post :X
module.exports.getPosts = (event, context,callback) => {
  const numberOfPosts = event.pathParameters.number;
  const params = {
    TableName: postsTable,
    Limit: numberOfPosts
  };
  return db.scan(params).promise.then(res => {
    callback(null,response(200, res.Items.sort((sortByDate))))
  }).catch(err => callback(null, response(err.statusCode, err)))
}


//Get a single post
module.exports.getPost = (event, context,callback) => {
  const id = event.pathParameters.id;
  const params = {
    Key: {
      id: id
    },
    TableName: postsTable
  }
  return db.get(params).promise()
    .then(res => {
      if(res.Item) callback(null, response(200, res.Item))
      else callback(null, response(404, {error: 'Post not found'}))
    })
    .catch(err => callback(null, response(err.statusCode, err)))
}

//Update a post
module.exports.updatePost = (event,context,callback) => {
  const  id = event.pathParameters.id;
  const body = JSON.parse(event.body);
  // const paramName = body.paramName;
  // const paramValue = body.paramValue;

  const paramOrganizador = body.nombreOrganizador;
  const paramCantidadPersonas = body.cantidadPersonas;
  const paramDestino = body.nombreDestino;
  const paramFecha = body.fechaInicial;
  const paramDescripcion = body.descripcion;

  const params = {
    TableName: postsTable,
    Key: {
      "id": id
    },
    ConditionExpression: 'attribute_exists(id)',
    //UpdateExpression: 'set' + paramName + '= :v',
    UpdateExpression: "set cantidadPersonas = :p, descripcion = :d, nombreDestino = :destino, nombreOrganizador = :org",
    ExpressionAttributeValues: {
      ":p": paramCantidadPersonas,
      ":d": paramDescripcion,
      ":destino": paramDestino,
      ":org": paramOrganizador

    },
    ReturnValue: 'ALL_NEW'
    
  }

  return db
  .update(params)
  .promise()
  .then((res) => {
  console.log(res);
  callback(null, response(200, res.Attributes));
  })
  .catch((err) => callback(null, response(err.statusCode, err)));
}

//Delete a post
module.exports.deletePost = ( event,context,callback) => {
  const id = event.pathParameters.id;
  const params = {
    Key: {
      id: id
    },
    TableName: postsTable
  };
  return db.delete(params)
    .promise()
    .then (() => callback(null,response(200, { message: 'Post deleted successfully'})))
    .catch(err => callback(null,response(err.statusCode,err)));
}
