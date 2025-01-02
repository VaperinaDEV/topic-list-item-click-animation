import { apiInitializer } from "discourse/lib/api";
import discourseLater from "discourse-common/lib/later";

export default apiInitializer("1.8.0", (api) => {
  
  api.onPageChange((url, title) => {
    const tliClickedExist = document.body.classList.contains("tli-clicked");
    const removeTliClicked = document.body.classList.remove("tli-clicked");
    
    if (tliClickedExist) {
      return removeTliClicked;
    } 
  });
    
  api.onAppEvent("card:show", () => {
    discourseLater(() => {
      const tliClickedExist = document.body.classList.contains("tli-clicked");
      const removeTliClicked = document.body.classList.remove("tli-clicked");
              
      if (tliClickedExist) {
        return removeTliClicked;
      }
    }, 500);
  });
          
  api.onAppEvent("topic-entrance:show", () => {        
    discourseLater(() => {
      const tliClickedExist = document.body.classList.contains("tli-clicked");
      const removeTliClicked = document.body.classList.remove("tli-clicked");
              
      if (tliClickedExist) {
        return removeTliClicked;
      }
    }, 500);
  });
});
