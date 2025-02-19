import Component from "@glimmer/component";
import { service } from "@ember/service";
import { action } from "@ember/object";
import { navigateToTopic } from "discourse/components/topic-list-item";
import { wantsNewWindow } from "discourse/lib/intercept-click";
import { bind } from "discourse-common/utils/decorators";
import didInsert from "@ember/render-modifiers/modifiers/did-insert";
import willDestroy from "@ember/render-modifiers/modifiers/will-destroy";

export default class ClickableTopic extends Component {
  @service capabilities;

  get shouldNotShow() {
    return (
      (settings.no_touch_click_style === "none" && !this.capabilities.touch) ||
      (settings.touch_click_style === "none" && this.capabilities.touch) ||
      (settings.disable_on_pm && this.args.outletArgs.topic.isPrivateMessage)
    );
  }

  @bind
  clickHandler(event) {
    const targetElement = event.target;
    const topic = this.args.outletArgs.topic;

    if (this.shouldNotShow) {
      return;
    }

    const clickTargets = [
      "topic-list-item",
      "topic-list-data",
      "link-bottom-line",
    ];

    const tliClicked = document.body.classList.add("tli-clicked");

    if (clickTargets.some((t) => targetElement.classList.contains(t))) {
      if (wantsNewWindow(event)) {
        return true;
      }
      return tliClicked, navigateToTopic.call(this, topic, topic.lastUnreadUrl);
    }
  }

  @action
  registerClickHandler(element) {
    element.parentElement.addEventListener("click", this.clickHandler);
  }

  @action
  removeClickHandler(element) {
    element.parentElement.removeEventListener("click", this.clickHandler);
  }

  <template>
    {{#unless this.shouldNotShow}}
      <div
        class="hidden"
        {{didInsert this.registerClickHandler}}
        {{willDestroy this.removeClickHandler}}
      ></div>
    {{/unless}}
  </template>
}
