import * as React from "react";
import { List, SimpleList, Datagrid, TextField, ReferenceField, EditButton, Edit, Create, SimpleForm, ReferenceInput, TextInput } from "react-admin";
import { useRecordContext } from "react-admin";
import { useMediaQuery } from "@mui/material";

const PostTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

const postFilters = [<TextInput source="q" label="Search" alwaysOn />, <ReferenceInput source="userId" label="User" reference="users" />];

export const PostList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  // return isSmall ? (
  //   <List>
  //     <SimpleList primaryText={(record) => record.title} secondaryText={(record) => <ReferenceField label="User" source="userId" reference="users" />} />
  //   </List>
  // ) : (
  //   <List filters={postFilters}>
  //     <Datagrid rowClick="edit">
  //       <TextField source="id" />
  //       <ReferenceField source="userId" reference="users" />
  //       <TextField source="title" />
  //       <EditButton />
  //     </Datagrid>
  //   </List>
  // );

  return (
    <List filters={postFilters}>
      {isSmall ? (
        <SimpleList primaryText={(record) => record.title} secondaryText={(record) => <ReferenceField label="User" source="userId" reference="users" />} />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <ReferenceField label="User" source="userId" reference="users" />
          <TextField source="title" />
          <TextField source="body" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

export const PostEdit = () => (
  <Edit title={PostTitle}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput source="userId" reference="users" />
      <TextInput source="title" />
      <TextInput multiline source="body" />
    </SimpleForm>
  </Edit>
);

export const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="userId" reference="users" />
      <TextInput source="title" />
      <TextInput multiline source="body" />
    </SimpleForm>
  </Create>
);
