package mikeyinc.auxone;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class AuxClass1 {
	
	public WebDriver getFirefoxDriver(){
		WebDriver driver = new FirefoxDriver();
		return driver;
	}

}
