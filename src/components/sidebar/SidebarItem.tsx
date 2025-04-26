import * as React from "react";
import { BoxItemContent, BoxOptionsCS } from "./sidebar.styled";
import { IoMdArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";

type Option = {
  url: string;
  value: string;
}

interface propsSidebar {
  icon: React.ReactElement;
  title: string;
  options: Option[];
}

const SidebarItem: React.FC<propsSidebar> = (props: propsSidebar): React.ReactElement => {
  const [showOptions, setShowOptions] = React.useState<boolean>(false);

  return (
    <>
      <BoxItemContent keySide={showOptions} onClick={() => { setShowOptions(!showOptions) }}>
        {props.icon}
        <p>{props.title}</p>
        {<IoMdArrowDropright />}
      </BoxItemContent>

      {showOptions && props.options.map((item, index) => (
        <BoxOptionsCS key={index} keySide={showOptions}>
          <Link to={item.url} key={index}>{item.value}</Link>
        </BoxOptionsCS>
      ))}
    </>
  );
}

export default SidebarItem;
