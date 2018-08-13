var { graphql, buildSchema } = require('graphql');

let schema = buildSchema(`
	type Book {
		title: String,
		author: String
	}

	type User {
		name(pre: String): String,
		book: Book
	}

	type Query {
		hello(to: String): String,
		user(text: String): User
	}
`);


class Book {
	constructor(title, author){
		this.title = title;
		this.author = author;
	}

	title () {
		return this.title
	}

	author () {
		return this.author
	}
}


class User {
	constructor(root, name, book){
		this.root = root;
		this.name = name;
		this.book = book;
		console.log("books=>", book)
	}

	async name({pre}) {
		return new Promise(async (resolve, reject) => {
			setTimeout(() => {
				resolve(`${pre}${this.root.text}`);
			}, 10)
		})
	}

	book () {
		return {
			title: "adf",
			author: "author"
		};
		return new Book("title", "author")
	}
}


var root = {
	hello: (root, args, context, info) => {
		return root.to;
	},

	user: (root, args, context, info) => {
		return new User(root, "test", new Book("title", "author"))
	}
};

let query = `
	query {
		hello(to: "zhaoyong")
		user(text: "zhaoyong") {
			name(pre: "yang ")
			book {
				title
			}
		}
	}
`;


graphql(schema, query, root).then((response) => {
	console.log(response);
});
