import React from 'react';
import Drawer from './Drawer';
import DropFileInput from './Dragdrop';

const header = <h1>Header</h1>;
const body = <DropFileInput />;
const footer = <h1>Footer</h1>;

function index() {
  return <Drawer header={header} body={body} footer={footer} />;
}

export default index;
