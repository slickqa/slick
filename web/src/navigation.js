

export class SideBarRegistration {
  constructor(name, order, icon, comp) {
    this.name = name;
    this.order = order;
    this.icon = icon;
    this.comp = comp;
  }
}

class Registration {
  constructor() {
    this.URLMapping = {};
    this.SidebarMapping = {};
    this.SidebarMappings = [];
  }

  registerUrlMapping(url, component) {
    this.URLMapping[url] = component;
  }

  registerSidebarMapping(section, order, icon, component) {
    this.SidebarMapping[section] = [icon, component];
    this.SidebarMappings.push(new SideBarRegistration(section, order, icon, component));
  }
}

let DefaultRegistration = new Registration();

export default DefaultRegistration;