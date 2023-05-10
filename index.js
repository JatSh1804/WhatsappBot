// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const dotEnv = require('dotenv').config();

const venom = require('venom-bot');
const { Configuration, OpenAIApi } = require("openai");

var messageReceived;


venom
    .create({
        session: "Jatin's web Session", //name of session
    })
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });
var messageReceived;

async function start(client) {
    // const chats = client.getAllChats;
    // console.log(chats)

    client.onMessage((message) => {
        console.log(message.content)

        messageReceived = message.content;
        console.log(APIcalling());

        console.log(response.data.choices[0].text)
        client
            .sendText(message.from, response.data.choices[0].text)
            .then((result) => { console.log(result) })
            .catch((error) => { console.log("Error when Sending:", error) })


        // console.log(response.data.choices[0].text)


        // if (message.body === 'Hi' && message.isGroupMsg === false) {
        //     client
        //         .sendText(message.from, 'Welcome Venom 🕷')
        //         .then((result) => {
        //             console.log('Result: ', result); //return object success
        //         })
        //         .catch((erro) => 
        //             console.error('Error when sending: ', erro); //return object error
        //         });
        // }
    })
};

var response;
const configuration = new Configuration({
    apiKey: dotEnv.parsed.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const APIcalling = async function GPTresponse() {
    console.log("Api is also working...")

    response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${messageReceived}`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    }
    )
        .then((e) => {
            return e;

        });


}
