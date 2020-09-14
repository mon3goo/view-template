package mon3goo.web.view.template.jpa.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import mon3goo.web.view.template.jpa.entities.MenuOption;

public interface MenuOptionsRepo extends CrudRepository<MenuOption, Long> {

	List<MenuOption> findByDirection(String direction);
}
