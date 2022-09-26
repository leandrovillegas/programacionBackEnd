const { normalize, denormalize, schema } = require("normalizr");
const fs = require("fs");
const mensajesSinNormalizar = require("./data/mensajesSinNormalizar.json")

const messages = mensajesSinNormalizar;

const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });
const commentSchema = new schema.Entity('mensaje');
const messageSchema = [
	{
		author: authorSchema,
		mensaje: commentSchema
	}
];

const normalizedMessages = normalize(messages, messageSchema);


fs.writeFileSync(
	"./data/mensajes.json",
	JSON.stringify(normalizedMessages.result)
);

///No supe como exportarlo