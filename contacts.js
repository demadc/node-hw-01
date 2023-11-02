const fs = require("node:fs/promises");
const path = require("node:path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContacts() {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(contacts);
}

/* readContacts().then((contacts) =>
  console.log(contacts, typeof contacts, contacts[0])
); */

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

// TODO: задокументувати кожну функцію
async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const contacts = await readContacts();

  return contacts;
}

async function getContactById(id) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.

  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact;
}

async function removeContact(id) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return undefined;
  }
  const removedContact = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];

  await writeContacts(removedContact);
  return contacts[index];
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const contacts = await readContacts();
  const newContact = {
    name,
    email,
    phone,
    id: contacts.length + 1,
  };
  contacts.push(newContact);
  await writeContacts(contacts);

  return newContact;
}

module.exports = { listContacts, getContactById, addContact, removeContact };
