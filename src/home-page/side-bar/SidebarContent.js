import { useHistory } from "react-router-dom";
import { context } from "../../link/Links";
import { useContext } from "react";

export function SidebarContent({ Data }) {
  const { setTitle } = useContext(context);

  const history = useHistory();
  return (
    <section
      onClick={() => {
        setTitle(Data.fieldName);
        if (Data.onclick) {
          history.push(Data.onclick);
        }
      }}
      className="sidebarContent"
    >
      {Data.icon ? <p>{Data.icon}</p> : ""}
      {Data.icon ? <article>
        <p>{Data.fieldName}</p>
        {Data.addSymbols ? <p>{Data.addSymbols}</p> : ""}
      </article> : ""}
    </section>
  );
}
