const Contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <action>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);

const options = program.opts();

console.log(options);

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();
      return console.log(contacts);

    case "get":
      const contact = await Contacts.getContactById(id);
      return console.log(contact);

    case "create":
      const createdContact = await Contacts.addContact(name, email, phone);
      return console.log(createdContact);

    case "remove":
      const removedContact = await Contacts.removeContact(id);
      return console.log(removedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
