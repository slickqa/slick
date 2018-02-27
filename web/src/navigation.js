

class Registration {
  constructor() {
    this.URLMapping = {};
    this.SidebarMapping = {};
  }

  registerUrlMapping(url, component) {
    this.URLMapping[url] = component;
  }

  registerSidebarMapping(section, icon, component) {
    this.SidebarMapping[section] = [icon, component];
  }
}

let DefaultRegistration = new Registration();

export default DefaultRegistration;