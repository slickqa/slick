

class Registration {
  constructor() {
    this.URLMapping = {};
    this.SidebarMapping = {};
  }

  registerUrlMapping(url, component) {
    this.URLMapping[url] = component;
  }

  registerSidebarMapping(section, component) {
    this.SidebarMapping[section] = component;
  }
}

let DefaultRegistration = new Registration();

export default DefaultRegistration;