package mikeyinc.main;

//import org.junit.*;
//import org.hamcrest.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import mikeyinc.auxone.AuxClass1;

public class SampleTest {
	
	/*
	@Test
    public void testAssertFalse() {
      org.junit.Assert.assertFalse("failure - should be false", false);
    }*/

    public static void main(String[] args) {
        // declaration and instantiation of objects/variables
        //WebDriver driver = new FirefoxDriver();
	 WebDriver driver = new AuxClass1().getFirefoxDriver();
        String baseUrl = "http://newtours.demoaut.com";
        //String expectedTitle = "500 Internal Server Error";
	 String expectedTitle = "Welcome: Mercury Tours";
        String actualTitle = "";

        // launch Firefox and direct it to the Base URL
        driver.get(baseUrl);

        // get the actual value of the title
        actualTitle = driver.getTitle();
        

        /*
         * compare the actual title of the page with the expected one and print
         * the result as "Passed" or "Failed"
         */
        if (actualTitle.contentEquals(expectedTitle)){
            System.out.println("Test Passed!");
        } else {
            System.out.println("Test Failed");
        }
       
        //close Firefox
        driver.close();
        driver.quit();
        // exit the program explicitly
        System.exit(0);
    }

}