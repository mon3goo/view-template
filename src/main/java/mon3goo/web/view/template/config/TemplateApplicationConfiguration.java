package mon3goo.web.view.template.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.env.Environment;

@Configuration
@PropertySources(value={
	    @PropertySource(value="file:${catalina.base}/shared/classes/mon3goo.properties")
	})
public class TemplateApplicationConfiguration {	

//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry
//          .addResourceHandler("/webjars/**")
//          .addResourceLocations("/webjars/");
//    }
	
	@Autowired
	public Environment env;	
	
	public String getConfigKey (String key)
	{
		return env.getProperty(key);
	}
	
}
