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
          const topicListItemClicked = document.body.classList.add("topic-list-item-clicked");
          
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

      api.onPageChange((url, title) => {
        const topicListItemClickedExist = document.body.classList.contains("topic-list-item-clicked");
        const removeTopicListItemClicked = document.body.classList.remove("topic-list-item-clicked");

        if (topicListItemClickedExist) {
          return removeTopicListItemClicked;
        }
        
      });
    });
  }
};
