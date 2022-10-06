import React from 'react';

export const DirectiveContent: React.FC<any> = (props) => {
  const { directiveComponents, functionName: type } = props;
  const Component = directiveComponents.find((item) => item.type === type)?.component;

  return (
    <Component
      directiveComponentValues={props.directiveComponentValues}
      setDirectiveComponentsValue={props.setDirectiveComponentsValue}
      {...props}
    />
  );
};
