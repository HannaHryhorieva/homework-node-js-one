const chalk = require('chalk');
const { Command } = require('commander');
const program = new Command();
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case 'list':
        const contacts = await listContacts();
        console.table(contacts);

        break;

      case 'get':
        const contactById = await getContactById(id);
        if (contactById) {
          console.log(chalk.green('Contact found'));
          console.log(contactById);
        } else {
          console.log(chalk.yellow('Contact not found'));
        }

        break;

      case 'add':
        const contact = await addContact(name, email, phone);
        console.log(chalk.green('Add new contact'));
        console.log(contact);
        break;

      case 'remove':
        const contactsWithoutId = await removeContact(id);
        console.table(contactsWithoutId);
        break;

      default:
        console.warn(chalk.yellow('Unknown action type!'));
    }
  } catch (error) {}
};

invokeAction(argv);
