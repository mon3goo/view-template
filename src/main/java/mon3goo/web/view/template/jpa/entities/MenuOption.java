package mon3goo.web.view.template.jpa.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "menu_option")
public class MenuOption implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected MenuOption() {
	}

	public MenuOption(Long _id, String _label, String _icon, String _uri, int _position, 
			String _align, String _colorType, String _direction) {
		this.id = _id;
		this.label = _label;
		this.icon = _icon;
		this.uri = _uri;
		this.position = _position;
		this.align = _align;
		this.colorType = _colorType;
		this.direction=_direction;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String label;
	private String icon;
	private String uri;
	private int position;
	private String align;

	@Column(name = "color_type", nullable = true, updatable = true)
	private String colorType;

	private String direction;

//	@OneToMany(fetch = FetchType.EAGER, mappedBy = "id_event_bpm", cascade = CascadeType.ALL)
//	private List<BpmEventVar> eventVars;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
	}

	public String getAlign() {
		return align;
	}

	public void setAlign(String align) {
		this.align = align;
	}

	public String getColorType() {
		return colorType;
	}

	public void setColorType(String colorType) {
		this.colorType = colorType;
	}

	public String getDirection() {
		return direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}