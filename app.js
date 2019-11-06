const express = require('express');
const bodyParser = require('body-parser');
const grqphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolver/index');


const app = express();

app.use(bodyParser.json());



app.use('/graphql', grqphqlHttp({
	schema: graphQlSchema,
	rootValue: graphQlResolvers,
	//user Interface
	graphiql: true

}));

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@node-restful-test-uum9v.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, {useNewUrlParser: true})
  .then(() => {
  	console.log("Connect success!");
  	app.listen(3000);
  })
  .catch(err => {
  	console.log(err);
  });


