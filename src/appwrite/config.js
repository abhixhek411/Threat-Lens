import { Client, Functions } from 'appwrite';

const client = new Client();
client.setEndpoint('https://fra.cloud.appwrite.io/v1') // or your self-hosted endpoint
      .setProject('686823800034ce91a99d'); // from Appwrite console

const functions = new Functions(client);

export { client, functions };