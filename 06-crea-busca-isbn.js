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


        //4 click en afegir llibre
        let trLLibres = await this.driver.wait(until.elementLocated(By.xpath('//a[@href="/admin/biblio/llibre/add/"]')), 10000);
        trLLibres.click();


        //5 afegir per isbn
        await this.driver.wait(until.elementLocated(By.css("a.viewlink")),5000).click();
        let alert = await this.driver.wait(until.alertIsPresent(), 10000);
        await alert.sendKeys("9788497403573"); 
        await alert.accept();
        await this.driver.sleep(8000);

        //6 Desar
        
        await this.driver.findElement(By.xpath("//input[@value='Desar']")).click();

        console.log("TEST OK");
	}
}

// executem el test

(async function test_example() {
	const test = new MyTest();
	await test.run();
	console.log("END")
})();