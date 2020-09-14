package mon3goo.web.view.template.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

@Configuration
@PropertySource(ignoreResourceNotFound=true, value = {"file:${mon3goo.properties.file}" })
//@EnableWebMvc
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
