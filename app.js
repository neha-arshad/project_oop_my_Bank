import { faker } from "@faker-js/faker";
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));
const wellcome = chalkAnimation.rainbow("Wellcome To My Bank");
await sleep();
wellcome.stop();
class Customer {
    firstName;
    lastName;
    age;
    gender;
    mobNum;
    Accnum;
    constructor(firstName, lastName, age, gender, mobNum, Accnum) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.mobNum = mobNum;
        this.Accnum = Accnum;
    }
    ;
}
;
;
//CLASS BANK//
class Bank {
    customer = [];
    account = [];
    addCustomer(obj) {
        this.customer.push(obj);
    }
    addAccount(obj) {
        this.account.push(obj);
    }
    transaction(accObj) {
        let updateAcc = this.account.filter((acc) => acc.accountNum !== accObj.accountNum);
        this.account = [...updateAcc, accObj];
    }
}
let myBank = new Bank();
//CUSToMER CREATE//
for (let i = 1; i <= 2; i++) {
    let fName = faker.person.firstName("male");
    let lastName = faker.person.lastName();
    let mobNum = parseInt(faker.string.numeric("3##########"));
    const custumer = new Customer(fName, lastName, 20 * i, "male", mobNum, 1000 + i);
    myBank.addCustomer(custumer);
    myBank.addAccount({ accountNum: custumer.Accnum, balance: 1000 * i });
}
;
//BANK FUCNTION//
async function bankServices(bank) {
    do {
        let service = await inquirer.prompt({
            type: "list",
            name: "select",
            message: chalk.bold.italic.magentaBright("Please select the Service"),
            choices: ["View Balance", "Cash Withdraw", "Cash Deposit", "Exit"]
        });
        if (service.select === "View Balance") {
            let response = await inquirer.prompt({
                type: "input",
                name: "num",
                message: chalk.blue("Please Enter Your Account Number.."),
            });
            let account = myBank.account.find((acc) => acc.accountNum == response.num);
            if (!account) {
                console.log(chalk.bold.redBright("Invalid Account Number"));
            }
            ;
            if (account) {
                let name = myBank.customer.find((item) => item.Accnum == account.accountNum);
                console.log(`DEAR ${chalk.bold.redBright(name?.firstName)} ${chalk.bold.redBright(name?.lastName)} Your Account Balance is ${account.balance}💰💵`);
            }
            ;
        }
        ;
        if (service.select === "Cash Withdraw") {
            let response = await inquirer.prompt({
                type: "input",
                name: "number",
                message: chalk.blue("Please Enter Your Account Number..")
            });
            let account = myBank.account.find((acc) => acc.accountNum == response.number);
            if (!account) {
                console.log(chalk.bold.redBright("Invalid Account Number"));
            }
            ;
            if (account) {
                let amount = await inquirer.prompt({
                    name: "rupees",
                    type: "number",
                    message: "Enter Your Amount💰💵 ",
                });
                if (amount.rupees > account.balance) {
                    console.log(chalk.bold.redBright("Insuficient Balance"));
                }
                let newBalance = account.balance - amount.rupees;
                //TRANSACTION METHOD//
                bank.transaction({ accountNum: account.accountNum, balance: newBalance });
            }
        }
        if (service.select === "Cash Deposit") {
            let response = await inquirer.prompt({
                type: "input",
                name: "number",
                message: chalk.blue("Please Enter Your Account Number..")
            });
            let account = myBank.account.find((acc) => acc.accountNum = response.number);
            if (!account) {
                console.log(chalk.bold.redBright("Invalid Account Number"));
            }
            ;
            if (account) {
                let amount = await inquirer.prompt({
                    name: "rupees",
                    type: "number",
                    message: "Enter Your Amount💰💵 "
                });
                let newBalance = account.balance + amount.rupees;
                //TRANSACTION METHOD//
                bank.transaction({ accountNum: account.accountNum, balance: newBalance });
            }
            ;
        }
        ;
        if (service.select === "Exit") {
            return;
        }
        ;
    } while (true);
}
bankServices(myBank);
