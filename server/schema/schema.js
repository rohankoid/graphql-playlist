const graphql=require('graphql');
const _= require('lodash');
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;


var books = [
	{ name: 'book1', genre: 'genre2', id: '1' },
	{ name: 'book2', genre: 'genre1', id: '2' },
	{ name: 'book3', genre: 'genre3', id: '3' }
]; // some random dummy data to use


const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		genre: {type: GraphQLString}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: ()=> ({
		book: {
			type: BookType, 
			args: {id: {type: GraphQLString}},
			resolve(parent, args){
				// code to get data from db/other source
				return _.find(books, {id: args.id});
			}
		}

	})
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
