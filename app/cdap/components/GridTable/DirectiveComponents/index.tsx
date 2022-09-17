import React from 'react';

const DirectiveContent: React.FC<any> = (props) => {
  const { directiveComponents, functionName: type } = props;
  console.log('directiveComponents, functionName: type', directiveComponents, type);
  const Component = directiveComponents.find((item) => item.type === type)?.component;

  return (
    <Component
      directiveComponentValues={props.directiveComponentValues}
      setDirectiveComponentsValue={props.setDirectiveComponentsValue}
      {...props}
    />
  );
};

export default DirectiveContent;
