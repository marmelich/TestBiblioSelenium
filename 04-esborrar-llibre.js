// carreguem les llibreries
const { BaseTest } = require("./BaseTest.js")
const { By, until } = require("selenium-webdriver");
const assert = require('assert');
require("dotenv").config();
console.log(process.env); //printa totes les variable d'entorn

// heredem una classe amb un sol mètode test()
// emprem this.driver per utilitzar Selenium

class MyTest extends BaseTest
{
	async test() {
        // Login test
        //////////////////////////////////////////////////////
        var site = process.env.URL;
        await this.driver.get(site+"/admin/login");

        //1 cercar login box
        let usernameInput = await this.driver.wait(until.elementLocated(By.id('id_username')), 10000);
        let passwordInput = await this.driver.wait(until.elementLocated(By.id('id_password')), 10000);
       
        //2 posar usuari i pass
        usernameInput.sendKeys(process.env.usuari);
        passwordInput.sendKeys(process.env.contrasenya);

        
        //3 boto send .click()
        let sendButton = await this.driver.wait(until.elementLocated(By.css('input[value="Iniciar sessió"]')), 10000);
        sendButton.click();


        //4 entrar en Llibres
        let linkLlibres = await this.driver.wait(until.elementLocated(By.xpath('//a[@href="/admin/biblio/llibre/"]')), 10000);
        linkLlibres.click();

        
        //5 entrar al meu llibre i el link
        const row = await this.driver.wait(
            until.elementLocated(By.xpath("//tr[contains(., 'Mar Melich')]")),
            10000
        );

        const linkRow = await row.findElement(By.css('a'));
        await linkRow.click();



        //6 click en Esborrar
        let deleteButton = await this.driver.wait(
            until.elementLocated(By.css('a.deletelink')),
            15000
        );
        
        deleteButton.click();

        //7 click en estic segur
        let confirmButton = await this.driver.wait(
            until.elementLocated(By.xpath('//input[@type="submit" and @value="Sí, n\'estic segur"]')),
            15000
        );
        confirmButton.click();




        console.log("TEST OK");
	}
}

// executem el test

(async function test_example() {
	const test = new MyTest();
	await test.run();
	console.log("END")
})();