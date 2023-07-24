import { withPluginApi } from "discourse/lib/plugin-api";
import { wantsNewWindow } from "discourse/lib/intercept-click";

export default {
  name: "clickable-topic-list-item",

  initialize(owner) {
    
    const capabilities = owner.lookup("service:capabilities");
    if ((settings.no_touch_click_style == "none" && !capabilities.touch) ||
        (settings.touch_click_style == "none" && capabilities.touch)) {
      return;
    }
    
    withPluginApi("0.8", (api) => {
      api.modifyClass("component:topic-list-item", {
        pluginId: "clickable-topic",

        click(e) {
          const topic = this.topic;
          const target = e.target;
          const classList = target.classList;
          const topicListItemClicked = document.body.classList.add("tli-clicked");
          const result = this.showEntrance(e);
          
          if (result === false) return result;
          
          if (classList.contains("topic-list-data") || 
              classList.contains("link-bottom-line") || 
              classList.contains("topic-list-item")) 
          {            
            if (wantsNewWindow(e)) {
              return true;
            }
            
            return topicListItemClicked, this.navigateToTopic(topic, topic.lastUnreadUrl);
          }

          this._super(...arguments);
        }
        
      });
      
      api.onAppEvent("card:hide", () => {
        const topicListItemClickedExist = document.body.classList.contains("tli-clicked");
        const removeTopicListItemClicked = document.body.classList.remove("tli-clicked");

        if (topicListItemClickedExist) {
          return removeTopicListItemClicked;
        }
      });      

      api.onPageChange((url, title) => {
        const topicListItemClickedExist = document.body.classList.contains("tli-clicked");
        const removeTopicListItemClicked = document.body.classList.remove("tli-clicked");

        if (topicListItemClickedExist) {
          return removeTopicListItemClicked;
        }
        
      });
    });
  }
};
