const express = require('express');
const bodyParser = require('body-parser');
const grqphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', grqphqlHttp({
	schema: buildSchema(`
		type RootQuery{
			events: [String!]!
		}

		type RootMutation{
			createEvent(name: String): String
		}

		schema {
			query: RootQuery
			mutation: RootMutation
		}
	`),
	rootValue: {
		events: () =>{
			return ['Romatic', 'sailing', 'All night Coding'];
		},
		createEvent: (args)=>{
			const eventName = args.name;
			return eventName;
		}

	},
	graphiql: true

}));

app.listen(3000);