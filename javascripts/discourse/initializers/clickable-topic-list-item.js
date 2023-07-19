import { withPluginApi } from "discourse/lib/plugin-api";
import { wantsNewWindow } from "discourse/lib/intercept-click";

export default {
  name: "clickable-topic-list-item",

  initialize() {
    withPluginApi("0.8", (api) => {
      api.modifyClass("component:topic-list-item", {
        pluginId: "clickable-topic",

        click(e) {
          const topic = this.topic;
          const target = e.target;
          const classList = target.classList;
          
          if (classList.contains("topic-list-data") || 
              classList.contains("link-bottom-line") || 
              classList.contains("topic-list-item")) 
          {
            if (wantsNewWindow(e)) {
              return true;
            }
            return this.navigateToTopic(topic, topic.lastUnreadUrl);
          }
          this._super(...arguments);
        }
        
      });
    });
  }
};
          
