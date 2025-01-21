// carreguem les llibreries
const { BaseTest } = require("./BaseTest.js")
const { By, until } = require("selenium-webdriver");
const assert = require('assert');
require("dotenv").config();

// heredem una classe amb un sol mètode test()
// emprem this.driver per utilitzar Selenium

class MyTest extends BaseTest
{
	async test() {
        // Login test
        //////////////////////////////////////////////////////
        await this.driver.get("https://emieza.ieti.site/admin/login/");

        //1 cercar login box
        var loginBox = await this.driver.findElement(By.tagName("form"));
       
        //2 posar usuari i pass
        
        //3 boto send .click()

        var currentText = await this.driver.findElement(By.tagName("h1")).getText();
        var expectedText = "Administració de Django";
        assert( currentText==expectedText, "Títol H1 de la pàgina principal incorrecte");

        console.log("TEST OK");
	}
}

// executem el test

(async function test_example() {
	const test = new MyTest();
	await test.run();
	console.log("END")
})();